import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onLineUsers = [],
    newMessagesAlter = [{
        chatId: "",
        count: 0,
    }],
    handleDeleteChat
}) => {
    return (
        <Stack width={w} direction={'column'} overflow={"auto"} height={"100%"}>
            {
                chats?.map((data, index) => {
                    
                    const { _id, members, name, avatar, groupChat } = data;
                    const avatar_url = avatar[0];
                    
                    const newMessageAlert = newMessagesAlter.find(
                        ({ chatId }) => chatId === _id
                    );
                    const isOnLine = members?.some((member) => {
                        onLineUsers.includes(_id)
                    });
                    return <ChatItem
                        _id={_id}
                        index={index}
                        newMessageAlert={newMessageAlert}
                        isOnLine={isOnLine}
                        avatar={avatar_url}
                        name={name}
                        key={_id}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                        handleDeleteChat={handleDeleteChat}
                    />
                })
            }

        </Stack>
    )
}

export default ChatList