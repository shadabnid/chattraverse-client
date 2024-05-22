import {
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Group as GroupIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon,
    Message as MessageIcon,
} from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom'

const Link = styled(LinkComponent)`
 text-decoration:none;
 border-radius:2rem;
 padding:1rem 2rem;
 color:black;
 &:hover{
    color : rgba(0,0,0,0.54);
 }
`
export const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
    },
    {
        name: "Users",
        path: "/admin/user-management",
        icon: <ManageAccountsIcon />,
    },
    {
        name: "Chats",
        path: "/admin/chats-management",
        icon: <GroupIcon />,
    },
    {
        name: "Messages",
        path: "/admin/messages-management",
        icon: <MessageIcon />,
    },
]
const SideBar = ({ w = "100%" }) => {
    const location = useLocation();
    const logoutHandler = ()=>{}
    return (
        <Stack width={w}
            direction={"column"}
            p={"3rem"}
            spacing={"1rem"}
        >
            <Typography variant='h5'>ChatTraverse</Typography>
            {
                adminTabs.map((tab) => (
                    <Link key={tab.path} to={tab.path}
                        sx={
                            location.pathname === tab.path && {
                                bgcolor: 'black',
                                color: 'white',
                                "&:hover": { color: "white" }
                            }
                        }
                    >
                        <Stack direction={"row"} spacing={"1rem"}>
                            {tab.icon}
                            {tab.name}
                        </Stack>
                    </Link>
                ))
            }
            <Link>
                <Stack direction={"row"} spacing={"1rem"}>
                    <ExitToAppIcon/>
                    <Typography>Log Out</Typography>
                    
                </Stack>
            </Link>
        </Stack>
    )
}
const isAdmin = true;
const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    const handleMobile = () => setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false);
    if(!isAdmin) return <Navigate to="/admin"/>
    return (
        <>
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    right: "1rem",
                    top: "1rem"
                }}
            >
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>
            </Box>
            <Grid container height={"100vh"}>
                <Grid
                    item
                    md={4}
                    lg={3}
                    sx={{ display: { xs: "nono", md: "block" } }}
                >
                    <SideBar />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    lg={9}
                    sx={{
                        bgcolor: "beige"
                    }}
                >
                    {children}
                </Grid>
                <Drawer open={isMobile} onClose={handleClose}>
                    <SideBar w="50vw" />

                </Drawer>
            </Grid>
        </>
    )
}

export default AdminLayout