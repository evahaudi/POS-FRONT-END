import React, { useState } from 'react'
import { Typography, Button, Paper, Container } from '@mui/material'
import Swal from 'sweetalert2'
import { Input, InputLabel } from '@material-ui/core'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your message has been received and we will get in touch soon.',
        })
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Typography
                    variant="h2"
                    color="primary"
                    align="center"
                    gutterBottom
                >
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel>Name:</InputLabel>
                        <Input
                            fullWidth
                            label="Name"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel>Email:</InputLabel>
                        <Input
                            fullWidth
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel>Message</InputLabel>
                        <Input
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: 20 }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
            <br />
            <br />
            <br />
        </Container>
    )
}

export default ContactUs
