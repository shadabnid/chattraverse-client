import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table';
import { dashboardData } from '../../components/constants/sampleData';
import { Avatar, Stack } from '@mui/material';

const columns = [{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"attachments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
    <Avatar alt={params.row.name} src={params.row.avatar}/>
  }
},
{
  field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400,
  
},
{
  field:"sender",
  headerName:"Send By",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
   <Stack>
    <Avatar alt={params.row.name} src={params.row.name}/>
    <span>{params.row.sender.name}</span>
   </Stack>
  }
},

{
  field:"chat",
  headerName:"Chat",
  headerClassName:"table-header",
  width:200,
},
{
  field:"createdat",
  headerName:"Createdat",
  headerClassName:"table-header",
  width:200,
}
];
const MessageManagement = () => {
  const [rows,setRows] = useState([]);
  useEffect(()=>{
     setRows(dashboardData.messages.map((i)=>({...i})));

   },[])

  return (
    <AdminLayout>

<Table heading={"All Messages"}
    columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default MessageManagement