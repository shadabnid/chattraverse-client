import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/Features';
import { useMychatsQuery } from '../../redux/api/api';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducer/chat';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducer/misc';
import { getSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../constants/event';
import DeleteChatMenu from '../dialog/DeleteChatMenu';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';

const AppLayout = () => (WrppedComponent) => {

    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const dispatch = useDispatch();

        const deleteMenuAnchor = useRef(null);

        const navigate = useNavigate();

        const socket = getSocket();


        const { isMobile } = useSelector((state) => state.misc);

        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);


        const { isLoading, data, isError, error, refetch } = useMychatsQuery("");

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;


        }
        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])

        const handleMobileMenuClose = () => dispatch(setIsMobile(false));

        const newMessagesAlertHandler = useCallback((data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId]);

        const newRequestHandler = useCallback(() => {
            dispatch(incrementNotification);
        }, [dispatch]);

        const refetchListner = useCallback(() => {
            refetch();
            navigate('/');
        }, [refetch, navigate]);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
            [NEW_REQUEST]: newRequestHandler,
            [REFETCH_CHATS]: refetchListner,
        };

        useSocketEvents(socket, eventHandlers);

        return (
            <>
                <Title />
                <Header />

                <DeleteChatMenu dispatch={dispatch}
                    deleteMenuAnchor={deleteMenuAnchor.current} />

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileMenuClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                        />

                    </Drawer>
                )

                }
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        lg={3}
                        sx={{
                            display: { xs: 'none', sm: 'block' }
                        }}
                        height={"100%"}
                    >
                        {isLoading ? <Skeleton /> :
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}

                            />}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={6}
                        height={"100%"}
                    >
                        <WrppedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        lg={3}
                        height={"100%"}
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            padding: '2rem',
                            bgcolor: 'rgba(0,0,0,0.85)',
                        }}
                    >
                        <Profile />
                    </Grid>

                </Grid>


            </>



        );
    };


};

export default AppLayout;