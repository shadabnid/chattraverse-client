import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, Stack, Avatar, IconButton } from '@mui/material'
import { CameraAlt } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../utils/validators';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { server } from '../components/constants/config';
import { userExists } from '../redux/reducer/auth';
import toast from 'react-hot-toast';

const Login = () => {
    const [islogin, setIsLogin] = useState(true);
    const toggleLogin = () => setIsLogin((prev) => !prev);

    let name = useInputValidation("", usernameValidator);
    let username = useInputValidation("");
    let password = useStrongPassword();
    let bio = useInputValidation("");
    let avatar = useFileHandler('single');

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                username: username.value,
                password: password.value
            }, config);
            dispatch(userExists(data.user));
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "something went wrong");
        }

    }
    const handleSignup = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        try {
            const { data } = await axios.post(`${server}/api/v1/user/new`,
                formData, config);
            dispatch(userExists(data.user));
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "something went wrong");
        }

    }

    return (
        <Container component={"main"} maxWidth="xs"
            sx={{
                height: "100vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '2rem'
            }}
        >

            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {
                    islogin ?
                        <>
                            <Typography variant='h5'>Login</Typography>
                            <form
                                onSubmit={handleLogin}
                                style={{
                                    width: "100%",
                                    marginTop: '1rem'
                                }}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="User name"
                                    variant="outlined"
                                    margin='normal'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Password"
                                    type='password'
                                    variant="outlined"
                                    margin='normal'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                />

                                <Button
                                    variant="contained"
                                    color='primary'
                                    type='submit'
                                    fullWidth
                                    sx={{
                                        marginTop: '1rem'
                                    }}
                                >
                                    Login
                                </Button>
                                <Typography

                                    sx={{
                                        textAlign: 'center',
                                        marginTop: '1rem',
                                    }}
                                >OR</Typography>
                                <Button
                                    sx={{ marginTop: '1rem' }}
                                    variant='contained'
                                    color='primary'
                                    onClick={toggleLogin}
                                    fullWidth

                                >
                                    sign Up
                                </Button>
                            </form>
                        </> :
                        <>

                            <Typography variant='h5'>Sign Up</Typography>
                            <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                                <Avatar
                                    sx={{
                                        width: '10rem',
                                        height: '10rem',
                                        objectFit: 'contain'

                                    }}
                                    src={avatar.preview}
                                />
                                {avatar.error && (
                                    <Typography color='error' variant='caption'>{avatar.error}</Typography>
                                )
                                }
                                <IconButton
                                    sx={{
                                        position: 'absolute',

                                        bottom: '0',
                                        right: '0',
                                        color: 'white',
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        ':hover': {
                                            bgcolor: 'rgba(0,0,0,0.7)',
                                        },

                                    }

                                    }
                                    component='label'

                                >
                                    <>
                                        <CameraAlt />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />

                                    </>
                                </IconButton>

                            </Stack>
                            <form
                                style={{
                                    width: "100%",
                                    marginTop: '1rem'
                                }}
                                onSubmit={handleSignup}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    margin='normal'
                                    value={name.value}
                                    onChange={name.changeHandler}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="User name"
                                    variant="outlined"
                                    margin='normal'
                                    value={username.value}
                                    onChange={username.changeHandler}

                                />
                                {username.error && (
                                    <Typography color='error' variant='caption'>{username.error}</Typography>
                                )
                                }
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Bio"
                                    variant="outlined"
                                    margin='normal'
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    label="Password"
                                    type='password'
                                    variant="outlined"
                                    margin='normal'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                />
                                {password.error && (
                                    <Typography color='error' variant='caption'>{password.error}</Typography>
                                )
                                }

                                <Button
                                    variant="contained"
                                    color='primary'
                                    type='submit'
                                    fullWidth
                                    sx={{
                                        marginTop: '1rem'
                                    }}
                                >
                                    Sign Up
                                </Button>
                                <Typography

                                    sx={{
                                        textAlign: 'center',
                                        marginTop: '1rem',
                                    }}
                                >OR</Typography>
                                <Button
                                    sx={{ marginTop: '1rem' }}
                                    variant='contained'
                                    color='primary'
                                    onClick={toggleLogin}
                                    fullWidth

                                >
                                    Login Instead
                                </Button>
                            </form>
                        </>
                }
            </Paper>
        </Container>
    )
}

export default Login