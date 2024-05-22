import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { orange } from '../constants/color'
import {
    Add as AddIcon,
    Group as GroupIcon,
    Logout, Menu as MenuIcon,
    Notifications,
    Search as SearchIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../constants/config';
import { userNotExists } from '../../redux/reducer/auth';
import { setIsMobile, setIsSearch, setIsNotification, setIsNewGroup } from '../../redux/reducer/misc';
import { resetNotificationCount } from '../../redux/reducer/chat'

const SearchDialog = lazy(() => import('../specific/SearchDialog'));
const NotificationsDialog = lazy(() => import('../specific/NotificationsDialog'));
const NewGroupDialog = lazy(() => import('../specific/NewGroupDialog'));

const Header = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSearch, isNotification,isNewGroup } = useSelector((state) => state.misc);
    const { notificationCount, setNotificationCount } = useSelector((state) => state.chat);


    const handlemobile = () => dispatch(setIsMobile(true));

    const openSearch = () => {
        dispatch(setIsSearch(true));

    }
    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));

    }
    const openNotifications = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    }
    const navigateToGroup = () => Navigate('/group');

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`,
                { withCredentials: true });
            dispatch(userNotExists());
            toast.success(data.message);

        } catch (error) {
            toast.error(error?.response?.data?.message || "something went wrong");
        }

    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar
                    position='static'
                    sx={{
                        bgcolor: orange
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant='h6'
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                            }}
                        >
                            ChatTraverse
                        </Typography>
                        <Box
                            sx={{
                                display: { xs: 'block', sm: 'none' }
                            }}
                        >
                            <IconButton color='inherit' onClick={handlemobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box>
                            <IconBtn
                                title={"Search"}
                                icon={<SearchIcon />}
                                onClick={openSearch} />

                            <IconBtn
                                title={"New Group"}
                                icon={<AddIcon />}
                                onClick={openNewGroup} />

                            <IconBtn
                                title={"Manage Group"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup} />

                            <IconBtn
                                title={"Notifications"}
                                icon={<Notifications />}
                                onClick={openNotifications} 
                                value={notificationCount}
                                />

                            <IconBtn
                                title={"Logout"}
                                icon={<Logout />}
                                onClick={logoutHandler} />
                        </Box>
                    </Toolbar>
                </AppBar>

            </Box>
            {isSearch ?
                <Suspense fallback={<Backdrop open />}>
                    <SearchDialog />
                </Suspense>
                : null
            }
            {isNotification ?
                <Suspense fallback={<Backdrop open />}>
                    <NotificationsDialog />
                </Suspense>
                : null
            }
            {isNewGroup ?
                <Suspense fallback={<Backdrop open />}>
                    <NewGroupDialog />
                </Suspense>
                : null
            }
        </>
    )
}
const IconBtn = ({ title, icon, onClick,value }) => {
    return (
        <Tooltip title={title}>
            <IconButton color='inherit' size="large" onClick={onClick}>
                {
                    value ?<Badge badgeContent={value} color="error">{icon}</Badge>:icon
                }
                
            </IconButton>
        </Tooltip>
    )
}
export default Header