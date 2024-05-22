import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
} from '@mui/icons-material'
import moment from 'moment/moment'
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, loader } = useSelector((state) => state.auth)
  const {avatar,name,username,bio,createdAt} = user; 

  const avatar_url = avatar.url 
    return (
        <Stack spacing={"1rem"} direction={"column"} alignItems={"center"}>
            <Avatar src={avatar_url}
                sx={{
                 width:200,
                 height:200,
                 objectFit:"contain",
                 marginBottom:"1rem",
                 border:"5px solid white"
                }}
            />

            <ProfileCard  text={bio} heading={"Boi"}/>
            <ProfileCard  text={username} heading={"User Name"} Icon={<UserNameIcon/>} />
            <ProfileCard  text={name} heading={"Name"} Icon={<FaceIcon/>} />
            <ProfileCard  text={moment(`${createdAt}`).fromNow()} heading={"Join"} Icon={<CalendarIcon/>} />
        </Stack>
    )
}
const ProfileCard = ({text,Icon,heading}) =>{
  return (  
  <Stack
    direction={"row"}
    alignContent={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
   { Icon && Icon}
    <Stack>
         <Typography variant='body1'>{text}</Typography>
         <Typography variant='caption' color={"gray"}>
            {heading}
         </Typography>
    </Stack>
  </Stack>
  )

}

export default Profile