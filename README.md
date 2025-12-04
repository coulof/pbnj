# pbnj

A minimal, fast pastebin for code snippets. Built with Astro and deployed on Cloudflare Workers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bhavnicksm/pbnj)

## Features

- Syntax highlighting for 100+ languages
- Clean, distraction-free interface
- Easy sharing with memorable URLs
- Download and copy buttons
- Social media preview cards
- CLI tool for terminal workflows

## CLI

Install the CLI globally:

```bash
npm install -g @pbnjs/cli
```

Then use it:

```bash
# Upload a file
pbnj script.py

# Pipe content
cat logs.txt | pbnj

# Configure your instance
pbnj --init
```

See [cli/README.md](./cli/README.md) for full documentation.

## Deploy Your Own

Click the deploy button above, or follow these steps:

### Prerequisites

- Node.js 18+
- A Cloudflare account

### Setup

1. Clone and install:
   ```bash
   git clone https://github.com/bhavnicksm/pbnj
   cd pbnj
   npm install
   ```

2. Create a D1 database:
   ```bash
   npx wrangler d1 create pbnj-db
   ```

3. Update `wrangler.toml` with your database ID from the output above.

4. Run the schema migration:
   ```bash
   npx wrangler d1 execute pbnj-db --remote --file=schema/schema.sql
   ```

5. Set your AUTH_KEY secret:
   ```bash
   npx wrangler secret put AUTH_KEY
   ```

6. Deploy:
   ```bash
   npm run build
   npx wrangler deploy
   ```

### Local Development

1. Copy `.dev.vars.example` to `.dev.vars` and set your AUTH_KEY
2. Run `npm run dev`

## API

### Create Paste

```bash
curl -X POST https://your-worker.workers.dev/api \
  -H "Authorization: Bearer YOUR_AUTH_KEY" \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"hello\")", "language": "javascript", "filename": "hello.js"}'
```

### View Paste

- Web: `https://your-worker.workers.dev/{paste-id}`
- Raw: `https://your-worker.workers.dev/r/{paste-id}`

## License

MIT
