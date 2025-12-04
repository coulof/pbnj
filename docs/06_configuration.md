# Configuration

pbnj is configured through a single `pbnj.config.js` file in the project root.

## Default Configuration

```js
export default {
  name: 'pbnj',
  logo: '/logo.png',
  idStyle: 'sandwich',
  homepage: true,
  maxPasteSize: '1mb',
}
```

## Options

### `name`
- **Type:** `string`
- **Default:** `'pbnj'`

The site name displayed in the browser title and header.

### `logo`
- **Type:** `string`
- **Default:** `'/logo.png'`

Path to your logo image. Place your logo in the `public/` directory and reference it with a leading slash.

### `idStyle`
- **Type:** `'sandwich' | 'short' | 'uuid'`
- **Default:** `'sandwich'`

How paste IDs are generated:

| Style | Example | Description |
|-------|---------|-------------|
| `sandwich` | `crunchy-peanut-butter-jelly-wrap` | Fun, memorable, food-themed IDs |
| `short` | `a3f8x2q1` | 8-character alphanumeric |
| `uuid` | `550e8400-e29b-41d4-a716-446655440000` | Standard UUID v4 |

### `homepage`
- **Type:** `boolean`
- **Default:** `true`

When `true`, the homepage displays a grid of recent public pastes. Set to `false` for a minimal landing page without paste listings.

### `maxPasteSize`
- **Type:** `string`
- **Default:** `'1mb'`

Maximum allowed paste size. Supports units: `b`, `kb`, `mb`, `gb`.

Examples:
- `'500kb'` - 500 kilobytes
- `'2mb'` - 2 megabytes
- `'1gb'` - 1 gigabyte (not recommended)

## Example: Custom Configuration

```js
export default {
  name: 'my-pastes',
  logo: '/my-logo.svg',
  idStyle: 'short',
  homepage: false,
  maxPasteSize: '2mb',
}
```

This creates a pastebin with:
- Custom branding
- Short 8-character IDs
- No public paste listing on homepage
- 2MB paste limit
