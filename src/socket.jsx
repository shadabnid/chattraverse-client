import { useContext, useMemo, createContext, useEffect } from 'react';
import { server } from './components/constants/config';
import io from 'socket.io-client';

const SocketContext = createContext();
const getSocket = ()=> useContext(SocketContext);

const SocketProvider = ({children})=>{
  const socket = useMemo(
    ()=>io(server,{withCredentials:true}),
    []
  );
    
  
    return (
        <SocketContext.Provider value={socket}>
             {children} 
        </SocketContext.Provider>
    )
}

export {getSocket,SocketProvider};