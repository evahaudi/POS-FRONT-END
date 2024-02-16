import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../views/pages/logo.jpg.png'

const CustomLogin = () => {
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const handleRoleChange = (event) => {
        setRole(event.target.value)
        navigate(`/${event.target.value.toLowerCase()}Login`)
    }

    return (
        <>
            <section>
                <Box textAlign="center" mb={2}>
                    <img
                        src={logo}
                        alt="my logo"
                        style={{ maxWidth: '15%', maxHeight: '15%' }}
                    />
                    <Typography
                        variant="h5"
                        align="center"
                        style={{ color: 'white' }}
                    >
                        WELCOME BACK!
                    </Typography>
                    <Grid container justifyContent="center">
                        <Typography variant="h6" style={{ color: 'black' }}>
                            Already registered?
                            <br />
                            <span className="line">
                                {role === 'Waiter' && (
                                    <Link to="/waiterLogin">
                                        Sign In as Waiter
                                    </Link>
                                )}
                                {role === 'Chef' && (
                                    <Link to="/chefLogin">Sign In as Chef</Link>
                                )}
                                {role === 'Manager' && (
                                    <Link to="/managerLogin">
                                        Sign In as Manager
                                    </Link>
                                )}
                            </span>
                        </Typography>
                    </Grid>
                    <Typography
                        variant="h6"
                        align="center"
                        style={{ color: 'white' }}
                    >
                        Please choose your role in order to Sign In
                    </Typography>
                </Box>
                <Box>
                    <Grid container justifyContent="center">
                        <select value={role} onChange={handleRoleChange}>
                            <option value="">Select Role</option>
                            <option value="Waiter">Waiter</option>
                            <option value="Chef">Chef</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </Grid>
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>{' '}
                    <br />
                    <br />
                    <br />
                </Box>
            </section>
        </>
    )
}

export default CustomLogin
