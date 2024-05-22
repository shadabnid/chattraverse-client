import React, { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, Stack, Avatar, IconButton } from '@mui/material'

import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom';

const isAdmin =true;
const AdminLogin = () => {
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
    }
    const secretKey = useInputValidation("");
    if(isAdmin){
        return <Navigate to="/admin/dashboard"/>;
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

            
                    <Typography variant='h5'>Admin Login</Typography>
                    <form
                        onSubmit={submitHandler}
                        style={{
                            width: "100%",
                            marginTop: '1rem'
                        }}
                    >


                        <TextField
                            required
                            fullWidth
                            id="outlined-basic"
                            label="Secret Key"
                            type='password'
                            variant="outlined"
                            margin='normal'
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
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
                    </form>

            </Paper>
        </Container>
    )
}

export default AdminLogin