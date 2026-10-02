import '@mui/material/styles';
import '@mui/material/Button';

// Custom palette colors for each module, defined in the layout theme
declare module '@mui/material/styles' {
  interface Palette {
    home: Palette['primary'];
    verbs: Palette['primary'];
    articles: Palette['primary'];
    sentences: Palette['primary'];
    dictionary: Palette['primary'];
  }
  interface PaletteOptions {
    home?: PaletteOptions['primary'];
    verbs?: PaletteOptions['primary'];
    articles?: PaletteOptions['primary'];
    sentences?: PaletteOptions['primary'];
    dictionary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    home: true;
    verbs: true;
    articles: true;
    sentences: true;
    dictionary: true;
  }
}
