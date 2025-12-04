# Cost Breakdown

"This is deployed on Cloudflare, they might charge us eventually!"

Don't worry. Let's do the math.

## Cloudflare D1 Free Tier

- 500 MB storage
- 5 million reads/day
- 100,000 writes/day

## Typical Paste Sizes

- Small snippet: ~500 bytes
- Medium file: ~2-5 KB
- Large file: ~10-20 KB
- Average: ~5 KB

## The Math

500 MB / 5 KB = ~100,000 pastes

At 10 pastes/day = 27+ years of storage
At 50 pastes/day = 5+ years of storage

## What If I Hit the Limit?

D1's paid tier is $0.75/GB-month.

You'd need to be running a pretty popular pastebin
to spend more than a few cents.

## Other Costs

Workers: 100k requests/day (free tier)
Pages: Unlimited bandwidth
KV (if used): 1GB storage, 100k reads/day

All free tier limits are more than enough for personal use.

## TL;DR

Cloudflare's free tier is more than enough.
Stop worrying and start pasting.

---
Next: 04_cli.md - CLI usage and options
