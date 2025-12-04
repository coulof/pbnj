#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { basename, extname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Configuration
const CONFIG_FILE = `${process.env.HOME}/.pbnj`;
const DEFAULT_HOST = 'https://pbnj.sh';

// Language detection from file extension
const LANG_MAP = {
  '.js': 'javascript',
  '.ts': 'typescript',
  '.py': 'python',
  '.rb': 'ruby',
  '.go': 'go',
  '.rs': 'rust',
  '.java': 'java',
  '.cpp': 'cpp',
  '.c': 'c',
  '.cs': 'csharp',
  '.php': 'php',
  '.sh': 'bash',
  '.bash': 'bash',
  '.zsh': 'bash',
  '.html': 'html',
  '.css': 'css',
  '.json': 'json',
  '.xml': 'xml',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.md': 'markdown',
  '.sql': 'sql',
  '.swift': 'swift',
  '.kt': 'kotlin',
  '.scala': 'scala',
  '.r': 'r',
  '.R': 'r',
  '.lua': 'lua',
  '.pl': 'perl',
  '.ex': 'elixir',
  '.exs': 'elixir',
  '.erl': 'erlang',
  '.hs': 'haskell',
  '.ml': 'ocaml',
  '.clj': 'clojure',
  '.vim': 'vim',
  '.dockerfile': 'dockerfile',
  '.toml': 'toml',
  '.ini': 'ini',
  '.txt': 'plaintext',
};

function getConfig() {
  if (existsSync(CONFIG_FILE)) {
    const content = readFileSync(CONFIG_FILE, 'utf-8');
    const config = {};
    for (const line of content.split('\n')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        config[key.trim()] = valueParts.join('=').trim();
      }
    }
    return config;
  }
  return {};
}

function detectLanguage(filename) {
  if (!filename) return 'plaintext';
  const ext = extname(filename).toLowerCase();
  return LANG_MAP[ext] || 'plaintext';
}

async function copyToClipboard(text) {
  const platform = process.platform;
  try {
    if (platform === 'darwin') {
      await execAsync(`echo "${text}" | pbcopy`);
    } else if (platform === 'linux') {
      // Try xclip first, then xsel
      try {
        await execAsync(`echo "${text}" | xclip -selection clipboard`);
      } catch {
        await execAsync(`echo "${text}" | xsel --clipboard --input`);
      }
    } else if (platform === 'win32') {
      await execAsync(`echo ${text} | clip`);
    }
    return true;
  } catch {
    return false;
  }
}

async function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        data += chunk;
      }
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
  });
}

function showHelp() {
  console.log(`
pbnj - CLI for pbnj.sh pastebin

Usage:
  pbnj <file>              Upload a file
  pbnj -                   Read from stdin
  cat file | pbnj          Pipe content
  pbnj --init              Configure your pbnj instance

Options:
  -l, --language <lang>    Override language detection
  -f, --filename <name>    Set filename for the paste
  -h, --help               Show this help
  -v, --version            Show version
  --init                   Set up configuration

Configuration (~/.pbnj):
  PBNJ_HOST=https://your-instance.workers.dev
  PBNJ_AUTH_KEY=your-secret-key

Examples:
  pbnj script.py                    # Upload Python file
  cat logs.txt | pbnj -l plaintext  # Pipe with language
  pbnj -f "app.js" - < code.txt     # Custom filename from stdin
`);
}

async function initConfig() {
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q) => new Promise((resolve) => rl.question(q, resolve));

  console.log('\nConfiguring pbnj CLI\n');

  const host = await question(`Host URL (default: ${DEFAULT_HOST}): `);
  const authKey = await question('Auth Key: ');

  rl.close();

  const config = `PBNJ_HOST=${host || DEFAULT_HOST}\nPBNJ_AUTH_KEY=${authKey}\n`;

  const { writeFileSync } = await import('fs');
  writeFileSync(CONFIG_FILE, config, { mode: 0o600 });

  console.log(`\nConfiguration saved to ${CONFIG_FILE}`);
}

async function uploadPaste(code, language, filename, config) {
  const host = config.PBNJ_HOST || process.env.PBNJ_HOST || DEFAULT_HOST;
  const authKey = config.PBNJ_AUTH_KEY || process.env.PBNJ_AUTH_KEY;

  if (!authKey) {
    console.error('Error: No auth key configured.');
    console.error('Run `pbnj --init` or set PBNJ_AUTH_KEY environment variable.');
    process.exit(1);
  }

  const body = { code, language };
  if (filename) body.filename = filename;

  try {
    const response = await fetch(`${host}/api`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error(`Error: ${error.error || response.statusText}`);
      process.exit(1);
    }

    const result = await response.json();
    return result.url;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);

  // Parse flags
  let language = null;
  let filename = null;
  let inputFile = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help') {
      showHelp();
      process.exit(0);
    }

    if (arg === '-v' || arg === '--version') {
      const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
      console.log(pkg.version);
      process.exit(0);
    }

    if (arg === '--init') {
      await initConfig();
      process.exit(0);
    }

    if (arg === '-l' || arg === '--language') {
      language = args[++i];
      continue;
    }

    if (arg === '-f' || arg === '--filename') {
      filename = args[++i];
      continue;
    }

    // Non-flag argument is the file
    if (!arg.startsWith('-') || arg === '-') {
      inputFile = arg;
    }
  }

  const config = getConfig();
  let code;

  // Check if stdin has data (piped input)
  const stdinIsTTY = process.stdin.isTTY;

  if (inputFile === '-' || (!inputFile && !stdinIsTTY)) {
    // Read from stdin
    code = await readStdin();
    if (!language) language = 'plaintext';
  } else if (inputFile) {
    // Read from file
    if (!existsSync(inputFile)) {
      console.error(`Error: File not found: ${inputFile}`);
      process.exit(1);
    }
    code = readFileSync(inputFile, 'utf-8');
    if (!filename) filename = basename(inputFile);
    if (!language) language = detectLanguage(inputFile);
  } else {
    showHelp();
    process.exit(1);
  }

  if (!code || code.trim() === '') {
    console.error('Error: No content to upload');
    process.exit(1);
  }

  const url = await uploadPaste(code, language, filename, config);

  console.log(url);

  // Try to copy to clipboard
  const copied = await copyToClipboard(url);
  if (copied) {
    console.log('(copied to clipboard)');
  }
}

main();
