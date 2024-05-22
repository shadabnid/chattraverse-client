import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { dashboardData } from '../../components/constants/sampleData';
import Table from '../../components/shared/Table';
import { Avatar, Stack } from '@mui/material';
const columns = [{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"avatar",
  headerName:"Avatar",
  headerClassName:"table-header",
  width:150,
  renderCell:(params)=>{
    <Avatar alt={params.row.name} src={params.row.avatar}/>
  }
},
{
  field:"name",
  headerName:"name",
  headerClassName:"table-header",
  width:200,
},
{
  field:"totalmembers",
  headerName:"Total Member",
  headerClassName:"table-header",
  width:100,
},
{
  field:"members",
  headerName:"Members",
  headerClassName:"table-header",
  renderCell:(params)=>{
    <Avatar alt={params.row.name} src={params.row.avatar}/>
  },
  width:200,
},
{
  field:"totalmessages",
  headerName:"Total Messages",
  headerClassName:"table-header",
  width:200,
},
{
  field:"creator",
  headerName:"Created By",
  headerClassName:"table-header",
  renderCell:(params)=>{
    <Stack
     direction={"row"}
     alignItems={"center"}
     spacing={"1rem"}
    >

      <Avatar alt={params.row.name} src={params.row.avatar}/>
      <span>
      {params.row.name}
      </span>
    </Stack>
  },
  width:200,
}
];

const ChatManagement = () => {
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    setRows(dashboardData.chats.map((i)=>({...i})));

  },[])
  return (
    <AdminLayout>

<Table heading={"all Chats"}
    columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default ChatManagement