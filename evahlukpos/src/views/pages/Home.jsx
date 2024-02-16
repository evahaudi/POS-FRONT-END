import { Typography } from '@mui/material'
import React from 'react'

const Home = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <div style={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
                <Typography color="white">
                    Welcome to our Evahluk POS!
                </Typography>
                <Typography color="white">
                    Explore our services and offerings.
                </Typography>
            </div>
            <br />
        </div>
    )
}

export default Home
