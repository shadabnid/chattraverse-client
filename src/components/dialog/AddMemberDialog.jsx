import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../shared/UsersItem'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducer/misc'

const AddMemberDialog = ({chatId }) => {

    const dispatch = useDispatch();

    const [selectedMember,setSelectedMember] = useState([]);

    const {isAddMember} = useSelector((state)=>state.misc);

    const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMemberMutation);

    const {isLoading,data,isError,error} = useAvailableFriendsQuery(chatId);
    
    useErrors([{isError,error}]);

    const selectMemberHandler = (id)=>{
      setSelectedMember((prev)=>prev.includes(id)?prev.filter((i)=>i!==id):[...prev,id]);
  
    }
   
    const closeHandler = ()=>{
        
        dispatch(setIsAddMember(false));

    }
    const addMemberSubmitHandler = ()=>{
        addMember("adding members",{members:selectedMember,chatId})

    }
    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle>Add Member</DialogTitle>
                <Stack spacing={"1rem"}>
                    {isLoading?(<Skeleton/>):data?.friends?.length > 0 ?
                        data?.friends?.map((i) => (
                            <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMember.includes(i._id)} />
                        )) : <Typography
                        textAlign={"center"}>No friends</Typography>
                    }
                </Stack>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                    <Button onClick={closeHandler}>cancel</Button>
                    <Button variant='contained' onClick={addMemberSubmitHandler}>Submit</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog