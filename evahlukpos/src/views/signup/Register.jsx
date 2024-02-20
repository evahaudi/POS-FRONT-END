import React, { useRef, useState, useEffect } from 'react'
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Input, Select } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PHONE_REGEX = /^\+?[0-9]{1,4}-?[0-9]{1,4}-?[0-9]{1,10}$/
const YEARS_REGEX = /^[1-9]\d*$/
const LOCATION_REGEX = /^[A-Za-z0-9\s,'.-]+$/
const FULLNAME_REGEX = /^[A-Za-z]+(?:[' -][A-Za-z]+)*$/

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
    const userRef = useRef(null)
    const emailRef = useRef(null)
    const fullnameRef = useRef()
    const dateRef = useRef()
    const locationRef = useRef()
    const experienceyearRef = useRef()
    const phoneRef = useRef()
    const departmentRef = useRef()
    const errRef = useRef()

    const [username, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [birthdate, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [experienceyears, setExperienceyear] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [validFullname, setValidFullname] = useState(false)
    const [fullnameFocus, setFullnameFocus] = useState(false)
    const [validDate, setValidDate] = useState(false)
    const [dateFocus, setDateFocus] = useState(false)
    const [validLocation, setValidLocation] = useState(false)
    const [locationFocus, setLocationFocus] = useState(false)
    const [validyear, setValidYear] = useState(false)
    const [yearFocus, setYearFocus] = useState(false)
    const [validPhone, setValidPhone] = useState(false)
    const [phoneFocus, setPhoneFocus] = useState(false)
    const [validDepartment, setValidDepartment] = useState(false)
    const [departmentFocus, setDepartmentFocus] = useState(false)
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)
    const [password, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [password2, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate(success)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        fullnameRef.current.focus()
    }, [])

    useEffect(() => {
        setValidFullname(FULLNAME_REGEX.test(fullname))
    }, [fullname])

    useEffect(() => {
        dateRef.current.focus()
    }, [])

    useEffect(() => {
        setValidDate(DATE_REGEX.test(birthdate))
    }, [birthdate])

    useEffect(() => {
        locationRef.current.focus()
    }, [])

    useEffect(() => {
        setValidLocation(LOCATION_REGEX.test(location))
    }, [location])

    useEffect(() => {
        experienceyearRef.current.focus()
    }, [])

    useEffect(() => {
        setValidYear(YEARS_REGEX.test(experienceyears))
    }, [experienceyears])

    useEffect(() => {
        phoneRef.current.focus()
    }, [])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {
        departmentRef.current.focus()
    }, [])

    useEffect(() => {
        setValidDepartment(USER_REGEX.test(department))
    }, [department])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password))
        setValidMatch(password === password2)
    }, [password, password2])

    useEffect(() => {
        setErrMsg('')
    }, [
        username,
        password,
        password2,
        email,
        fullname,
        birthdate,
        experienceyears,
        location,
        department,
        phone,
    ])

    const handleChange = (event) => {
        setRole(event.target.value)
    }
    // let roleEndpoint = ''
    //         if (role === 'Waiter') {
    //             roleEndpoint = 'http://localhost:8000/api/signup/waiter/'
    //         } else if (role === 'Chef') {
    //             roleEndpoint = 'http://localhost:8000/api/signup/chef/'
    //         } else if (role === 'Manager') {
    //             roleEndpoint = 'http://localhost:8000/api/signup/manager/'
    //         }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validations = [
            USER_REGEX.test(username),
            EMAIL_REGEX.test(email),
            PWD_REGEX.test(password),
            PHONE_REGEX.test(phone),
            FULLNAME_REGEX.test(fullname),
            YEARS_REGEX.test(experienceyears),
            LOCATION_REGEX.test(location),
            DATE_REGEX.test(birthdate),
        ]

        if (validations.includes(false)) {
            setErrMsg('Invalid Entry')
            return
        }
        try {
            let roleEndpoint = ''
            if (role === 'Waiter') {
                roleEndpoint = 'https://evahluk-restful-apis.onrender.com/api/signup/waiter/'
            } else if (role === 'Chef') {
                roleEndpoint = 'https://evahluk-restful-apis.onrender.com/api/signup/chef/'
            } else if (role === 'Manager') {
                roleEndpoint = 'https://evahluk-restful-apis.onrender.com/api/signup/manager/'
            }

            const requestData = {
                username,
                password,
                email,
                fullname,
                birthdate,
                experienceyears,
                location,
                department,
                phone,
                role,
                password2,
            }
            const jsonData = JSON.stringify(requestData)
            console.log('Data being sent:', requestData)
            const response = await axios.post(roleEndpoint, jsonData, {
                headers: { 'Content-Type': 'application/json' },
            })

            console.log(JSON.stringify(response?.data))

            setSuccess(true)
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You can now log in with your credentials.',
            }).then(() => {
                navigate('/login')
            })
            setUser('')
            setPwd('')
            setMatchPwd('')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('username or email already exist')
            }
            errRef.current.focus()
        }
    }

    return (
        <>
            <section>
                <Typography
                    ref={errRef}
                    className={errMsg ? 'errmsg' : 'offscreen'}
                    aria-live="assertive"
                >
                    {errMsg}
                </Typography>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome
                </Typography>
                <Typography variant="h6" align="left" gutterBottom>
                    Register
                </Typography>
                <form className="responsive-form" onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={4} className="input-container">
                            <InputLabel htmlFor="username">
                                Username:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validName ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validName || !username
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                            </InputLabel>
                            <Input
                                id="username"
                                ref={userRef}
                                placeholder="Type in here…"
                                variant="filled"
                                aria-describedby="uidnote"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={!validName}
                                onBlur={() => setUserFocus(false)}
                            />
                            <Typography
                                id="uidnote"
                                className={
                                    userFocus && username && !validName
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />4 to 24
                                characters.Must begin with a letter.Letters,
                                numbers, underscores, hyphens allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="email">
                                Email:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validEmail ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validEmail || !email
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                            </InputLabel>
                            <Input
                                type="text"
                                id="email"
                                placeholder="Type in here…"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <Typography
                                id="uidnote"
                                className={
                                    emailFocus && email && !validEmail
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="fulname">
                                Fullname:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validFullname ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validFullname || !fullname
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="text"
                                    id="fullname"
                                    placeholder="Type in here…"
                                    ref={fullnameRef}
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setFullname(e.target.value)
                                    }
                                    value={fullname}
                                    required
                                    aria-invalid={
                                        validFullname ? 'false' : 'true'
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setFullnameFocus(true)}
                                    onBlur={() => setFullnameFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="uidnote"
                                className={
                                    fullnameFocus && fullname && !validFullname
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, space, allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="date">
                                Date of birth:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validDate ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validDate || !birthdate
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="date"
                                    id="date"
                                    ref={dateRef}
                                    placeholder="Type in here…"
                                    autoComplete="off"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={birthdate}
                                    required
                                    aria-invalid={validDate ? 'false' : 'true'}
                                    aria-describedby="uidnote"
                                    onFocus={() => setDateFocus(true)}
                                    onBlur={() => setDateFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="uidnote"
                                className={
                                    dateFocus && birthdate && !validDate
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                numbers, dash allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="location">
                                Location:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validLocation ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validLocation || !location
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Type in here…"
                                    id="location"
                                    ref={locationRef}
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    value={location}
                                    required
                                    aria-invalid={
                                        validLocation ? 'false' : 'true'
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setLocationFocus(true)}
                                    onBlur={() => setLocationFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="uidnote"
                                className={
                                    locationFocus && location && !validLocation
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers,hyphens allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="years">
                                Experience Years:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validyear ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validyear || !experienceyears
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="text"
                                    id="years"
                                    placeholder="Type in here…"
                                    ref={experienceyearRef}
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setExperienceyear(e.target.value)
                                    }
                                    value={experienceyears}
                                    required
                                    aria-invalid={validyear ? 'false' : 'true'}
                                    aria-describedby="uidnote"
                                    onFocus={() => setYearFocus(true)}
                                    onBlur={() => setYearFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="uidnote"
                                className={
                                    yearFocus && experienceyears && !validyear
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                1 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                numbers, allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="phone">
                                Phone:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validPhone ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validPhone || !phone
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Type in here…"
                                    id="phone"
                                    ref={phoneRef}
                                    autoComplete="off"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    required
                                    aria-invalid={validPhone ? 'false' : 'true'}
                                    aria-describedby="uidnote"
                                    onFocus={() => setPhoneFocus(true)}
                                    onBlur={() => setPhoneFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="uidnote"
                                className={
                                    phoneFocus && phone && !validPhone
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                minimum of 10 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="department">
                                Department:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validDepartment ? 'valid' : 'hide'
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validDepartment || !department
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Type in here…"
                                    id="department"
                                    ref={departmentRef}
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setDepartment(e.target.value)
                                    }
                                    value={department}
                                    required
                                    aria-invalid={
                                        validDepartment ? 'false' : 'true'
                                    }
                                    aria-describedby="uidnote"
                                    onFocus={() => setDepartmentFocus(true)}
                                    onBlur={() => setDepartmentFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="uidnote"
                                className={
                                    departmentFocus &&
                                    department &&
                                    !validDepartment
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="password">
                                Password:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validPwd ? 'valid' : 'hide'}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validPwd || !password
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Type in here…"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={password}
                                    required
                                    aria-invalid={validPwd ? 'false' : 'true'}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="pwdnote"
                                className={
                                    pwdFocus && !validPwd
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.
                                <br />
                                Must include uppercase and lowercase letters, a
                                number and a special character.
                                <br />
                                Allowed special characters:{' '}
                                <span aria-label="exclamation mark">
                                    !
                                </span>{' '}
                                <span aria-label="at symbol">@</span>{' '}
                                <span aria-label="hashtag">#</span>{' '}
                                <span aria-label="dollar sign">$</span>{' '}
                                <span aria-label="percent">%</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validMatch && password2
                                            ? 'valid'
                                            : 'hide'
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validMatch || !password2
                                            ? 'hide'
                                            : 'invalid'
                                    }
                                />
                                <Input
                                    type="password"
                                    id="confirm_pwd"
                                    placeholder="Type in here…"
                                    onChange={(e) =>
                                        setMatchPwd(e.target.value)
                                    }
                                    value={password2}
                                    required
                                    aria-invalid={validMatch ? 'false' : 'true'}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                            </InputLabel>
                            <Typography
                                id="confirmnote"
                                className={
                                    matchFocus && !validMatch
                                        ? 'instructions'
                                        : 'offscreen'
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <InputLabel labelId="demo-simple-select-label">
                                Role:
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="role"
                                label="Role"
                                onChange={handleChange}
                                value={role}
                                required
                            >
                                <MenuItem value="">Select Role</MenuItem>
                                <MenuItem value="Chef">Chef</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Waiter">Waiter</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={
                            !validName || !validPwd || !validMatch
                                ? true
                                : false
                        }
                    >
                        Sign Up
                    </Button>
                </form>
                <Grid>
                    <Typography>
                        Already registered?
                        <br />
                        <span className="line">
                            <Link to="/login">Log In</Link>
                        </span>
                    </Typography>
                    <br />
                </Grid>
            </section>
            <br />
            <br />
        </>
    )
}

export default Register
