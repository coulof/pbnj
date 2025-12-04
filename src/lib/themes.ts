/**
 * Theme definitions for pbnj
 * Each theme includes UI colors and uses a local hljs CSS file
 * CSS files are located at /public/styles/hljs-{theme-name}.css
 */

export interface ThemeColors {
  bg: string;        // Main background
  bg2: string;       // Secondary background (code blocks, cards)
  text: string;      // Primary text
  muted: string;     // Muted/secondary text
  faint: string;     // Even more muted text
  border: string;    // Border color
  borderHover: string;
  borderActive: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

/**
 * Available themes - all use local CSS for syntax highlighting
 */
export const themes: Record<string, Theme> = {
  // Light themes
  'flexoki-light': {
    name: 'Flexoki Light',
    colors: {
      bg: '#FFFCF0',      // Flexoki paper
      bg2: '#F2F0E5',     // Flexoki base-50
      text: '#100F0F',    // Flexoki black
      muted: '#878580',   // Flexoki base-500
      faint: '#6F6E69',   // Flexoki base-600
      border: '#E6E4D9',  // Flexoki base-100
      borderHover: '#DAD8CE',
      borderActive: '#B7B5AC',
    },
  },
  'github-light': {
    name: 'GitHub Light',
    colors: {
      bg: '#ffffff',
      bg2: '#f6f8fa',
      text: '#24292f',
      muted: '#57606a',
      faint: '#6e7781',
      border: '#d0d7de',
      borderHover: '#bbc0c5',
      borderActive: '#8c959f',
    },
  },
  'gruvbox-light': {
    name: 'Gruvbox Light',
    colors: {
      bg: '#fbf1c7',      // Gruvbox light bg
      bg2: '#f2e5bc',     // Gruvbox light bg1
      text: '#3c3836',    // Gruvbox dark fg
      muted: '#665c54',   // Gruvbox dark gray
      faint: '#7c6f64',   // Gruvbox light gray
      border: '#d5c4a1',  // Gruvbox light bg2
      borderHover: '#bdae93',
      borderActive: '#a89984',
    },
  },

  // Dark themes
  'flexoki-dark': {
    name: 'Flexoki Dark',
    colors: {
      bg: '#100F0F',      // Flexoki black
      bg2: '#1C1B1A',     // Flexoki base-950
      text: '#CECDC3',    // Flexoki base-200
      muted: '#878580',   // Flexoki base-500
      faint: '#6F6E69',   // Flexoki base-600
      border: '#282726',  // Flexoki base-900
      borderHover: '#343331',
      borderActive: '#403E3C',
    },
  },
  'github-dark': {
    name: 'GitHub Dark',
    colors: {
      bg: '#0d1117',
      bg2: '#161b22',
      text: '#c9d1d9',
      muted: '#8b949e',
      faint: '#6e7681',
      border: '#30363d',
      borderHover: '#484f58',
      borderActive: '#6e7681',
    },
  },
  'nord': {
    name: 'Nord',
    colors: {
      bg: '#2e3440',
      bg2: '#3b4252',
      text: '#d8dee9',
      muted: '#a5abb6',
      faint: '#7b8394',
      border: '#434c5e',
      borderHover: '#4c566a',
      borderActive: '#5e6779',
    },
  },
  'gruvbox-dark': {
    name: 'Gruvbox Dark',
    colors: {
      bg: '#1d2021',
      bg2: '#282828',
      text: '#ebdbb2',
      muted: '#a89984',
      faint: '#928374',
      border: '#3c3836',
      borderHover: '#504945',
      borderActive: '#665c54',
    },
  },

  // Catppuccin themes
  'catppuccin-latte': {
    name: 'Catppuccin Latte',
    colors: {
      bg: '#eff1f5',      // Base
      bg2: '#e6e9ef',     // Mantle
      text: '#4c4f69',    // Text
      muted: '#6c6f85',   // Subtext1
      faint: '#8c8fa1',   // Subtext0
      border: '#ccd0da',  // Surface0
      borderHover: '#bcc0cc', // Surface1
      borderActive: '#acb0be', // Surface2
    },
  },
  'catppuccin-frappe': {
    name: 'Catppuccin Frappé',
    colors: {
      bg: '#303446',      // Base
      bg2: '#292c3c',     // Mantle
      text: '#c6d0f5',    // Text
      muted: '#a5adce',   // Subtext1
      faint: '#838ba7',   // Subtext0
      border: '#414559',  // Surface0
      borderHover: '#51576d', // Surface1
      borderActive: '#626880', // Surface2
    },
  },
  'catppuccin-macchiato': {
    name: 'Catppuccin Macchiato',
    colors: {
      bg: '#24273a',      // Base
      bg2: '#1e2030',     // Mantle
      text: '#cad3f5',    // Text
      muted: '#a5adcb',   // Subtext1
      faint: '#8087a2',   // Subtext0
      border: '#363a4f',  // Surface0
      borderHover: '#494d64', // Surface1
      borderActive: '#5b6078', // Surface2
    },
  },
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    colors: {
      bg: '#1e1e2e',      // Base
      bg2: '#181825',     // Mantle
      text: '#cdd6f4',    // Text
      muted: '#a6adc8',   // Subtext1
      faint: '#7f849c',   // Subtext0
      border: '#313244',  // Surface0
      borderHover: '#45475a', // Surface1
      borderActive: '#585b70', // Surface2
    },
  },
  'dracula': {
    name: 'Dracula',
    colors: {
      bg: '#282a36',      // Background
      bg2: '#21222c',     // Current Line (darker)
      text: '#f8f8f2',    // Foreground
      muted: '#6272a4',   // Comment
      faint: '#44475a',   // Current Line
      border: '#44475a',  // Current Line
      borderHover: '#6272a4', // Comment
      borderActive: '#bd93f9', // Purple
    },
  },
};

// Default theme
export const defaultTheme = 'flexoki-light';

/**
 * Get theme by name, falling back to default if not found
 */
export function getTheme(name: string): Theme {
  return themes[name] || themes[defaultTheme];
}

/**
 * Get list of available theme names
 */
export function getThemeNames(): string[] {
  return Object.keys(themes);
}
