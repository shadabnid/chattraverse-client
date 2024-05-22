import { Menu, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducer/misc';

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {

    const { isDeleteMenu,selectedDeleteChat } = useSelector((state) => state.misc);
    
    const isGroup = selectedDeleteChat.groupchat;

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
     }

     const leaveGroup = ()=>{}

     const deleteChat = ()=>{}
    return (
        <Menu open={isDeleteMenu} onClose={closeHandler} anchorE1={deleteMenuAnchor}>
            <Stack
                sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer"
                }}
                direction={"row"}
                alignItems={"center"}
                spacing={"0.5rem"}
                onClose={isGroup?leaveGroup:deleteChat}
            >
                {
                    isGroup?<>leave group</>:<>delete chat</>
                }
            </Stack>
        </Menu>
    )
}

export default DeleteChatMenu