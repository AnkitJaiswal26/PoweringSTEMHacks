import React from 'react';
import { Box, Container, Typography } from '@mui/material'

const Footer = () => {
    return (<>
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                display : 'flex',
                flexDirection: 'column',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    My sticky footer can be found here.
                </Typography>
            </Container>
        </Box>
    </>);
}

export default Footer;