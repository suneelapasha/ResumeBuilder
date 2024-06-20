// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Red
    },
    background: {
      default: '#f4f6f8', // Light gray background
    },
    text: {
      primary: '#333333', // Dark gray text
    },
  },
  typography: {
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1976d2', // Blue
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#333333', // Dark gray
    },
  },
  spacing: 8, // default spacing unit
});

export default theme;
