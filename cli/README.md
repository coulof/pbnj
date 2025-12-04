# @pbnjs/cli

CLI for [pbnj.sh](https://pbnj.sh) - A minimal pastebin for code snippets.

## Installation

```bash
npm install -g @pbnjs/cli
```

Or use without installing:

```bash
npx @pbnjs/cli myfile.py
```

## Setup

Configure your pbnj instance:

```bash
pbnj --init
```

This will prompt you for:
- **Host URL**: Your pbnj instance URL
- **Auth Key**: Your secret key for creating pastes

Configuration is saved to `~/.pbnj`.

Alternatively, use environment variables:

```bash
export PBNJ_HOST=https://your-instance.workers.dev
export PBNJ_AUTH_KEY=your-secret-key
```

## Usage

### Upload a file

```bash
pbnj script.py
# https://pbnj.sh/crunchy-peanut-butter-toast
# (copied to clipboard)
```

### Pipe content

```bash
cat error.log | pbnj
# https://pbnj.sh/smooth-jelly-grape-sandwich

echo "console.log('hello')" | pbnj -L javascript
# https://pbnj.sh/golden-honey-oat-bagel
```

### Read from stdin

```bash
pbnj - < code.txt
```

### Override language detection

```bash
pbnj -L typescript myfile.ts
```

### Set custom filename

```bash
pbnj -f "app.js" - < code.txt
```

### List recent pastes

```bash
pbnj -l
```

### Delete a paste

```bash
pbnj -d crunchy-peanut-butter
```

## Options

| Option | Description |
|--------|-------------|
| `-L, --language <lang>` | Override automatic language detection |
| `-f, --filename <name>` | Set filename for the paste |
| `-l, --list` | List recent pastes |
| `-d, --delete <id>` | Delete a paste by ID |
| `-h, --help` | Show help |
| `-v, --version` | Show version |
| `--init` | Configure your pbnj instance |

## Supported Languages

The CLI automatically detects language from file extensions:

- JavaScript (`.js`)
- TypeScript (`.ts`)
- Python (`.py`)
- Rust (`.rs`)
- Go (`.go`)
- Ruby (`.rb`)
- And 30+ more...

## License

MIT
