import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Person as PersonIcon
} from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Chart'


const AdminDashboard = () => {

    const Appbar =
        <Paper
            elevation={3}
            sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
        >
            <Stack direction={"row"} spacing={"1rem"}>
                <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
                <SearchField placeholder='Search...' />
                <CurveButton>Search</CurveButton>
                <Box flexGrow={1}>
                    <Typography
                        display={{
                            xs: "none",
                            lg: "block"
                        }}
                        color={"rgba(0,0,0,0.7)"}
                        textAlign={"center"}
                    >{moment().format('dddd, D MMMM YYYY')}</Typography>
                </Box>
            </Stack>
        </Paper>
    const widgets = <>
        <Stack direction={{
            xs: "column",
            sm: "row"
        }}
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={"2rem 0"}
            spacing={"1rem"}
        >
            <Widget title={"users"} value={15} Icon={<PersonIcon/>}/>
            <Widget title={"chats"} value={3} Icon={<GroupIcon/>}/>
            <Widget title={"messages"} value={40} Icon={<MessageIcon/>} />
        </Stack>
    </>
    return (
        <AdminLayout>

            <Container component={"main"}>
                {Appbar}
                <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"} justifyContent={"center"}sx={{gap:"10px"}}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem 3.5rem",
                            borderRadius: "1rem",
                        
                            alignItems:"center"

                        }}
                    >
                        <Typography>Last Messages</Typography>
                        <LineChart value={[12,17,25,36,87]}/>
                        </Paper>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: { xs: "100%", sm: "50%" },
                                position: "relative",
                                width: "100%",
                                maxWidth: "25rem",
                                height: "25rem",
                            }}

                        >
                          <DoughnutChart label={["Single chat","Group chat"]}  value={[22,66]}/>
                        
                        <Stack
                            position={"absolute"}
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={"0.5rem"}
                            width={"100%"}
                            height={"100%"}
                        >
                            <GroupIcon />
                            <Typography>vs</Typography>

                            <PersonIcon />
                        </Stack>
                        </Paper>
                    
                </Stack>
                {
                    widgets
                }
            </Container>
        </AdminLayout>
    )
}
const Widget = ({ title, value, Icon }) => (
<Paper
sx={{
    padding:"2rem",
    margin:"2rem 0",
    borderRadius:"1rem",
    width:"20rem",
}}
>
    <Stack alignItems={"center"} spacing={"1rem"}> 
        <Typography
        sx={{
            color:"rgba(0,0,0,0.7)",
            borderRadius:"50%",
            border:"5px solid rgba(0,0,0,0.9)",
            width:"5rem",
            height:"5rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }}
        >{value}</Typography>
        <Stack direction={"row"} spacing={"1rem"}>
            {Icon}
           <Typography>{title}</Typography> 
        </Stack>
    </Stack>
</Paper>
);

export default AdminDashboard