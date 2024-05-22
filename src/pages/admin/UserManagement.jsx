import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material';
import { dashboardData } from '../../components/constants/sampleData';
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
  field:"username",
  headerName:"User Name",
  headerClassName:"table-header",
  width:200,
},
{
  field:"friends",
  headerName:"Friends",
  headerClassName:"table-header",
  width:200,
},
{
  field:"groups",
  headerName:"groups",
  headerClassName:"table-header",
  width:200,
}
];
const UserManagement = () => {
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    setRows(dashboardData.users.map((i)=>({...i})));

  },[])
  return (
    <AdminLayout>

    <Table heading={"all new user"}
    columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default UserManagement