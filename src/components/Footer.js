import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            No-code solution for startup SaaS applications, enabling quick and
                            efficient product launches.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Features
                        </Typography>
                        <Link href="#" color="text.secondary" display="block">
                            Drag-and-drop Interface
                        </Link>
                        <Link href="#" color="text.secondary" display="block">
                            Pre-built Templates
                        </Link>
                        <Link href="#" color="text.secondary" display="block">
                            Database Integration
                        </Link>
                        <Link href="#" color="text.secondary" display="block">
                            API Integration
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Support
                        </Typography>
                        <Link
                            href="mailto:support@nocodestartupsaas.com"
                            color="text.secondary"
                            display="block"
                        >
                            Email Support
                        </Link>
                        <Link
                            href="https://docs.nocodestartupsaas.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="text.secondary"
                            display="block"
                        >
                            Documentation
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Legal
                        </Typography>
                        <Link href="#" color="text.secondary" display="block">
                            Terms of Service
                        </Link>
                        <Link href="#" color="text.secondary" display="block">
                            Privacy Policy
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'© '}
                        <Link color="inherit" href="https://nocodestartupsaas.com/">
                            NoCode Startup SaaS
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
