import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor } from '../components/constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialog/FileMenu';
import { sampleMessage } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, NEW_MESSAGE, START_Typing, STOP_TYPING } from '../components/constants/event';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducer/misc';
import { removeNewMessagesAlert } from '../redux/reducer/chat';
import { TypingLoader } from '../components/layout/Loaders';

const Chat = ({ chatId ,user}) => {

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const socket = getSocket();
  const dispatch = useDispatch();

  const [messages, setMessages] = useState("");
  const [message,setMessage] = useState([]);
  const [page,setPage] = useState(1);
  const [fileMenuAnchor,setFileMenuAnchor] = useState(null);

  const [iAmTyping,setIAmTyping] = useState(false);
  const [userTyping,setUsertyping] = useState(false);

  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({chatId,page});

  const {data:oldMessages,setData:setOldMessages}=
  useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.currentData?.totalPages,
    page,
    setPage,
    oldMessagesChunk.currentData?.message,
  )
  
  const errors = [
    {isError:chatDetails.isError,error:chatDetails.error},
    {isError:oldMessagesChunk.isError,error:oldMessagesChunk.error}
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e)=>{
     setMessages(e.target.value);

     if(!iAmTyping){
     socket.emit(START_Typing,{members,chatId});
     setIAmTyping(true);
     }

     if(typingTimeout.current)
        clearTimeout(typingTimeout.current);

     typingTimeout.current = setTimeout(()=>{
      socket.emit(STOP_TYPING,{members,chatId}); 
      setIAmTyping(false);
     },2000)



  } 

  const submitHandler = (e) => {
    e.preventDefault();

    if (!messages.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setMessages("");
  }
  
  useEffect(()=>{
  dispatch(removeNewMessagesAlert(chatId))
  return ()=>{
    setMessage([]);
    setMessages("");
    setOldMessages([]);
    setPage(1);
  } ; 
  },[chatId]);

  useEffect(()=>{
    if(bottomRef.current) 
      bottomRef.current.scrollIntoView({behavior:"smooth"})
  },[message])

  useEffect(()=>{
    
  },[])

  const newMessagesHandler = useCallback((data)=>{
    if(data.chatId !== chatId) return;
    setMessage((prev)=>[...prev,data.message])
  },[chatId]);

  const startTypingListner = useCallback((data)=>{
    if(data.chatId !== chatId) return;
    setUsertyping(true);
  },[chatId]);

  const stopTypingListner = useCallback(
    (data)=>{
    if(data.chatId !== chatId) return;

    setUsertyping(false);
  },[chatId]);

  const alertListner =  useCallback(
    (data)=>{
    const messageForAlert ={
      content: data,
      
      sender: {
          _id: "AdminID",
          name: "Admin"
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    }
     setMessage((prev)=> [...prev,messageForAlert]);
  },[chatId]);

   const eventHandlers = {
    [ALERT]:alertListner,
    [NEW_MESSAGE]:newMessagesHandler,
    [START_Typing]:startTypingListner,
    [STOP_TYPING]:stopTypingListner
  };

   useSocketEvents(socket,eventHandlers);

   useErrors([{errors}]);
  
   const allMessages = [...oldMessages,...message];

   const handleFileOpen = (e)=>{
          dispatch(setIsFileMenu(true));
          setFileMenuAnchor(e.currentTarget);
   }
  
  
  return chatDetails?.isLoading ? (<Skeleton />) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}

      >
        
        {
          allMessages?.map((i) => (
            <MessageComponent message={i} user={user} />
          ))
        }
        {userTyping &&<TypingLoader/>}
        <div ref={bottomRef}/>
      </Stack >
      <form
        style={{ height: "10%" }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.5rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "0.3rem",
            }}
           onClick={handleFileOpen}  
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message Here...'
            value={messages}
            onChange={messageOnChange}
          />

          <IconButton type="submit"
            sx={{
              backgroundColor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              }

            }}
          >
            <SendIcon />
          </IconButton>

        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor}/>

    </>
  )
}

export default AppLayout()(Chat);