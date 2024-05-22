import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute';
import NotFound from './pages/NotFound';
import { LayoutLoader } from './components/layout/Loaders';
import { server } from './components/constants/config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducer/auth';
import { Toaster } from 'react-hot-toast'
import {SocketProvider} from './socket';

// import Home from './pages/Home'
//dynamically import component
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Group = lazy(() => import('./pages/Group'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));




const App = () => {

  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${server}/api/v1/user/profile`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  
  return (
    loader ? (<LayoutLoader />) : (<BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            <SocketProvider>
              <ProtectRoute user={user} />
            </SocketProvider>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />

          </Route>
          <Route path="/login" element=
            {<ProtectRoute user={!user} redirect='/'>
              <Login />
            </ProtectRoute>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/messages-management" element={<MessageManagement />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <Toaster position='bottom-center' />
    </BrowserRouter>
    )
  )
}

export default App