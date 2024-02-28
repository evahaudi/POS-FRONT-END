import React from 'react';
import { Typography, Grid, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { LinkedIn, Facebook, Twitter, GitHub } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles'
import eve from '../../views/pages/eve.png';
import manu from '../../views/pages/manu.png';
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
    name: {
        textDecoration: 'underline', // Decorate the names
        fontFamily: 'Verdana',
        fontSize: '1.2rem', // Set font size
        fontStyle: 'italic', // Apply italics
    },
    content: {
        textAlign: 'justify', // Align content to justify
        fontFamily: 'Verdana, Geneva, sans-serif', // Set Verdana as font family
        fontSize: '1rem', // Set font size
        lineHeight: '1.5', // Set line height
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
                <Typography variant="h1" className={classes.name} color="orange" align="center" gutterBottom>
                    Welcome to our Evahluk Restaurant POS!
                </Typography>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>

                        Evahluk Restaurant Point of Sale was inspired by the founder's mom's eatery struggles. Determined to aid small businesses, they delved into technology, creating a system to streamline operations. Evahluk simplifies order taking, reduces waste, eases payments, and strengthens customer relations. It's a tribute to entrepreneurship and aims to uplift the culinary industry's small businesses. Join Evahluk in revolutionizing restaurant management, one table at a time.

                    </CardContent>
                </Card>
                <CardMedia
                    component="img"
                    height="194"
                    image={storyfood}
                    alt="food"
                />
            </Grid>

            <Grid item xs={12}>
                <br />
                <Typography variant="h1" color="red" align="center" className={classes.name} gutterBottom>
                    Meet the Team
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                component="img"
                                height="150"
                                image={manu}
                                alt="Emmanuel"
                            />
                            <CardContent>
                                <Typography color="red" className={classes.name} variant="subtitle1">EMMANUEL KUILUK</Typography>
                                <Typography color="green" variant="body">Software Engineer/data scientist</Typography>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item>
                                        <IconButton style={{color:"blue"}}  aria-label="LinkedIn" href="https://www.linkedin.com/in/everlyne-akinyi-90683a1b5/">
                                            <LinkedIn  />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="Facebook" href="https://www.facebook.com/">
                                            <Facebook />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="Twitter" href="https://twitter.com/EvahAudi">
                                            <Twitter />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="GitHub" href="https://github.com/evahaudi">
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
                                <Typography color="red" className={classes.name} variant="subtitle1">EVERLYNE AKINYI AUDI</Typography>
                                <Typography color="green" variant="body2">Software Engineer/Enterprenuer</Typography>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="LinkedIn" href="https://www.linkedin.com/in/everlyne-akinyi-90683a1b5/">
                                            <LinkedIn />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="Facebook" href="https://www.facebook.com/">
                                            <Facebook />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="Twitter" href="https://twitter.com/EvahAudi">
                                            <Twitter />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton style={{color:"blue"}} aria-label="GitHub" href="https://github.com/evahaudi">
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
