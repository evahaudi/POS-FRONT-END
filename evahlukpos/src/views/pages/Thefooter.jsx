import React from 'react';
import { IconButton, Grid, Typography } from '@mui/material';
import Box from '@material-ui/core/Box';
import { LinkedIn, Facebook, Twitter } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box position="fixed" bottom={0} width="100%" bgcolor="green" zIndex={99}>
            <Grid container justifyContent="space-between" alignItems="center" padding="10px">
                <Grid item xs={12} md={6} textAlign="center">
                    <Typography variant="body2" color="white">
                        &copy; {new Date().getFullYear()} EvaLuk POS. All Rights Reserved.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} textAlign="center">
                    <IconButton color="white" aria-label="LinkedIn" href="https://www.linkedin.com/">
                        <LinkedIn />
                    </IconButton>
                    <IconButton color="white" aria-label="Facebook" href="https://www.facebook.com/">
                        <Facebook />
                    </IconButton>
                    <IconButton color="white" aria-label="Twitter" href="https://twitter.com/">
                        <Twitter />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;