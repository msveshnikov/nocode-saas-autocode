import React from 'react';
import { Typography, Container, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        {
            title: 'Drag-and-Drop Interface',
            description: 'Build user interfaces easily with our intuitive drag-and-drop builder.',
            image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Pre-built Templates',
            description: 'Get started quickly with our library of pre-built SaaS templates.',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'Database Integration',
            description: 'Seamlessly integrate and manage your database without coding.',
            image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            title: 'AI-Powered',
            description:
                'Leverage AI with Claude, Gemini, and OpenAI connectors for smart features.',
            image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
                No-Code Startup SaaS Platform
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Build and launch your SaaS product quickly without coding
            </Typography>
            <div style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/register"
                    size="large"
                >
                    Get Started
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/templates"
                    size="large"
                    sx={{ ml: 2 }}
                >
                    View Templates
                </Button>
            </div>
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={feature.image}
                                alt={feature.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" align="center" sx={{ mt: 6, mb: 3 }}>
                Pricing
            </Typography>
            <Card sx={{ maxWidth: 300, margin: 'auto' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Startup Plan
                    </Typography>
                    <Typography variant="h4" color="primary" gutterBottom>
                        $9.99/month
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Includes all features, hosting, and support
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Choose Plan
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Home;