import React from 'react';
import { Typography, Grid, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { LinkedIn, Facebook, Twitter, GitHub } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles'
import eve from '../../views/pages/eve.png';
import storyfood from '../../views/pages/storyfood.jpg';

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(2),
    },
    cardMedia: {
        height: 'auto', 
        width: '100%', 
        maxWidth: 300, 
    },
}));

const AboutUs = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            padding={2}
        >
            <Grid item xs={12}>
                <Typography variant="h1" color="orange" align="center" gutterBottom>
                    Welcome to our Evahluk Restaurant POS!
                </Typography>
                <Typography variant="h4" color="white" align="center" paragraph>
                    In the bustling world of restaurants, where every dish tells a story and every table holds a memory, the journey of Evahluk Restaurant Point of Sale was born from a simple yet powerful inspiration—my mom's small eatery.
                    Years ago, I watched as my mom poured her heart and soul into her restaurant, striving to create delicious meals and warm hospitality for her patrons. Yet, despite her passion, she faced numerous challenges in managing the daily operations of her business.
                    I vividly remember the moments of frustration as she struggled to juggle customers, waitstaff, and inventory, often leading to missed opportunities and lost revenue. Seeing her dedication and determination, I knew there had to be a better way to support small businesses like hers.
                    Driven by a desire to make a difference, I ventured into the world of technology, armed with the knowledge that I could create something meaningful—a solution that would alleviate the burdens faced by restaurant owners and empower them to thrive in their craft.
                    Evahluk Restaurant Point of Sale is more than just a system; it's a testament to the resilience and spirit of entrepreneurship. By streamlining order taking, minimizing inventory waste, simplifying payments, and enhancing customer relationships, Evahluk aims to revolutionize the way restaurants operate.
                    Through this journey, I carry with me the memory of my mom's unwavering dedication and the countless small businesses striving to make their mark in the culinary world. With Evahluk, I hope to honor their legacy and pave the way for a future where every restaurant can flourish and every meal is served with pride.
                    Join us as we embark on this culinary adventure together, one table at a time.
                </Typography>
                <CardMedia
                    component="img"
                    height="194"
                    image={storyfood}
                    alt="food"
                />
            </Grid>
            
            <Grid item xs={12}>
                <br/>
                <Typography variant="h1" color="red" align="center" gutterBottom>
                    Meet the Team
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                component="img"
                                height="150"
                                image={eve}
                                alt="Emmanuel"
                            />
                            <CardContent>
                                <Typography color="red" variant="subtitle1">EMMANUEL KUILUK</Typography>
                                <Typography color="green" variant="body">Software Engineer/data scientist</Typography>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item>
                                        <IconButton color="white" aria-label="LinkedIn" href="https://www.linkedin.com/in/everlyne-akinyi-90683a1b5/">
                                            <LinkedIn />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="white" aria-label="Facebook" href="https://www.facebook.com/">
                                            <Facebook />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="white" aria-label="Twitter" href="https://twitter.com/EvahAudi">
                                            <Twitter />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="white" aria-label="GitHub" href="https://github.com/evahaudi">
                                            <GitHub />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                component="img"
                                height="150"
                                image={eve}
                                alt="Eng. eve"
                            />
                            <CardContent>
                                <Typography color="red" variant="subtitle1">EVERLYNE AKINYI AUDI</Typography>
                                <Typography color="green" variant="body2">Software Engineer/Enterprenuer</Typography>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item>
                                        <IconButton color="white" aria-label="LinkedIn" href="https://www.linkedin.com/in/everlyne-akinyi-90683a1b5/">
                                            <LinkedIn />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="white" aria-label="Facebook" href="https://www.facebook.com/">
                                            <Facebook />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="white" aria-label="Twitter" href="https://twitter.com/EvahAudi">
                                            <Twitter />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="white" aria-label="GitHub" href="https://github.com/evahaudi">
                                            <GitHub />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AboutUs;
