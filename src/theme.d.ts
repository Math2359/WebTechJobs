import '@mui/material/styles';
import type { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    cinza: PaletteColor
  }
  interface PaletteOptions {
    cinza?: PaletteColor
  }
}