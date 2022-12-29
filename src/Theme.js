import { createTheme } from '@mui/material/styles';

const CONTRASTTEXT = '#eceff1'

const theme = createTheme({
    palette: {
        primary: {
            main: '#5CB0FF',
            contrastText: CONTRASTTEXT,
        },
        secondary: {
            main: '#E7739A',
            light: '#fff',
            contrastText: CONTRASTTEXT,
        },
        neutral: {
            main: '#FFFBFE',
            contrastText: CONTRASTTEXT,
        },        
        blue: {
            main: '#5CB0FF',
            contrastText: CONTRASTTEXT,
        },
        darkblue: {
            main: '#4E5283',
            contrastText: CONTRASTTEXT,
        },
        green: {
            main: '#73FDB3',
            contrastText: CONTRASTTEXT,
        },
        pink: {
            main: '#E7739A',
            contrastText: CONTRASTTEXT,
        },
        
    },
});


export default theme