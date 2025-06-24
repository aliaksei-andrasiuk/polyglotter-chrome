import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E'
        },
        primary: {
            main: '#00E0B8'
        },
        secondary: {
            main: '#3FBAFF'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9E9E9E'
        },
        common: {
            white: '#FFFFFF',
            black: '#000000'
        }
    }
});
