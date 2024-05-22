import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers as users } from '../constants/sampleData';
import UsersItem from '../shared/UsersItem';
import { useInputValidation } from '6pp';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducer/misc';
import toast from 'react-hot-toast';
const NewGroupDialog = () => {

  const { isNewGroup } = useSelector((state) => state.misc);
  const [selectedMember, setSelectedMember] = useState([]);

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNEwGroup] = useAsyncMutation(useNewGroupMutation);

  const dispatch = useDispatch();
  const groupName = useInputValidation("");

  const errors = [{
    isError,
    error
  }];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMember((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  }

  const submitHandler = () => {
    if (!groupName.value)
      return toast.error("Group Name is Required");

    if (selectedMember.length < 2)
      return toast.error("Please Select Atleast 3 Members");
     
    newGroup("Creating New Group",{ name: groupName.value, members: selectedMember });

    closeHandler();
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        width={"25rem"}
      >
        <DialogTitle variant='h4' textAlign={'center'}>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {isLoading ? (<Skeleton />) :
            data?.friends?.map((user) => (
              <UsersItem user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMember.includes(user._id)}
              />
            ))
          }
        </Stack>
        <Stack direction={"row"} justifyContent={"space-around"}>
          <Button size="large" variant='contained' color='error' onClick={closeHandler}>Cancel</Button>
          <Button
            size="large"
            variant='contained'
            onClick={submitHandler}
            disabled={isLoadingNEwGroup}
          >
            Create
          </Button>

        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroupDialog