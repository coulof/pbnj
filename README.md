<div align="center">

![pbnj logo](./assets/pbnj_logo.png)

# 🥪 pbnj 📄

[![npm version](https://img.shields.io/npm/v/@pbnjs/cli?label=cli&color=cb3837)](https://www.npmjs.com/package/@pbnjs/cli)
[![GitHub stars](https://img.shields.io/github/stars/bhavnicksm/pbnj?style=flat&color=yellow)](https://github.com/bhavnicksm/pbnj/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/bhavnicksm/pbnj?style=flat&color=blue)](https://github.com/bhavnicksm/pbnj/network/members)
[![Docs](https://img.shields.io/badge/docs-pbnj-green)](./docs)
[![License](https://img.shields.io/github/license/bhavnicksm/pbnj)](./LICENSE)

_pbnj is a simple, minimal self-hosted pastebin solution, focused on getting you started quickly and easily_

[Features](#-features) · [Why?](#-why) · [Cost](#-cost) · [Speedrun](#-speedrun-get-started-under-a-minute)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bhavnicksm/pbnj)

</div>

## ✨ Features

- Syntax highlighting for 100+ languages
- Clean, distraction-free interface
- Easy sharing with memorable URLs
- Download and copy buttons
- Social media preview cards
- CLI tool for terminal workflows

## 🙋🏻‍♀️ Why?

Another pastebin? Really?

When I wanted to self-host a pastebin, I found plenty of options—but they were all *too much*. Git-based version control, OAuth, elaborate GUIs. I just wanted something I could deploy in under a minute with a CLI that actually works.

So I built this.

**Why not Gist?** Maybe you want to own your data. Maybe you don't want to depend on GitHub. Maybe you just like self-hosting things. Or maybe you're a little autistic like me and enjoy having your own stuff :)

**What makes pbnj different:**
- Deploy in seconds with one click
- CLI-first workflow (`pbnj file.py` → done)
- No accounts, no git, no bloat
- Just paste and share
- Cloudflare's free tier will last you forever

## 💰 Cost

Now, I know some people might wonder, "This is deployed on Cloudflare, they might charge us eventually!" That's why I wrote this section. Let's do some basic math to figure out how much storage we can use:

**Cloudflare D1 Free Tier:**
- 500 MB storage
- 5 million reads/day
- 100,000 writes/day

**Typical paste sizes:**
- Small snippet: ~500 bytes
- Medium file: ~2-5 KB
- Large file: ~10-20 KB
- Average: ~5 KB

**The math:**
- 500 MB ÷ 5 KB = **~100,000 pastes**
- At 10 pastes/day = **27+ years** of storage
- At 50 pastes/day = **5+ years** of storage

For personal use, you'll never hit these limits. Even if you somehow do, D1's paid tier is just $0.75/GB-month. You'd need to be running a pretty popular pastebin to spend more than a few cents.

**TL;DR:** Cloudflare's free tier is more than enough. Stop worrying and start pasting.

## ⚡ Speedrun: Get Started Under a Minute!

**Step 1:** Click the deploy button above and follow the prompts

**Step 2:** Install the CLI
```bash
npm install -g @pbnjs/cli
```

**Step 3:** Configure it
```bash
pbnj --init
# Enter your worker URL and AUTH_KEY
```

**Step 4:** Paste!
```bash
pbnj myfile.py
# → https://your-pbnj.workers.dev/crunchy-peanut-butter-sandwich
```

That's it. You now have your own pastebin.

See [cli/README.md](./cli/README.md) for full CLI documentation.
