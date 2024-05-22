import { Avatar, Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, memo, useEffect, lazy, Suspense, } from 'react'
import { orange } from '../components/constants/color'
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard';
import { sampleUsers, samplechats } from '../components/constants/sampleData';
import UsersItem from '../components/shared/UsersItem'
import { useAddGroupMemberMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { LayoutLoader } from '../components/layout/Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducer/misc'
const ConfirmDeleteDialog = lazy(() => import('../components/dialog/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../components/dialog/AddMemberDialog'));
const isMember = false;

const Group = () => {
  const chatId = useSearchParams()[0].get('group');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAddMember} = useSelector((state)=>state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMemberMutation);


  const navigateBack = () => {
    navigate("/");
  }

  const [isEdit, setIsEdit] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);


  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    }
  ]
  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.currentData;

    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }

  }, [groupDetails.currentData])

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("updating group name...", {
      chatId,
      name: groupNameUpdatedValue,
    })

  }

  const openConfirmDeleteHandler = () => {
    setconfirmDeleteDialog(true);
    
  }
  const closeConfirmDeleteHandler = () => {
    setconfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  }

  const deleteHandler = () => {
    setconfirmDeleteDialog(false);
    
  }
  const removeMemberHandler = (userId) => {
    
    removeMember("Removing Member..",{chatId,userId})
    

  }
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  }, [chatId])
  const GroupName = <>
    <Stack direction="row"
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {
        isEdit ? <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}
            disabled={isLoadingGroupName}
          >
            <DoneIcon />
          </IconButton>
        </> :
          <>

            <Typography variant='h4'>{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)}
              disabled={isLoadingGroupName}>
              <EditIcon />
            </IconButton>
          </>
      }
    </Stack>
  </>

  const IconsBtns =
    <>
      <Box
        sx={{

          display: {
            xs: "block",
            sm: "none"

          },
          position: "fixed",
          right: "1rem",
          top: "1rem"
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              color: "black"
            }
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>

  const ButtonGroup = <>
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row"
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem"
      }}
    >
      <Button size="large" color='error' startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size="large" variant='contained' startIcon={<AddIcon />}
        onClick={openAddMemberHandler}>Add Member</Button>
    </Stack>
  </>

  return myGroups.isLoading ? <LayoutLoader /> : (
    <Grid container height={"100vh"} >
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          overflowY: "auto",
          height: "100%"

        }}
        sm={4}
        bgcolor={orange}
      >
        <GroupList myGroups={myGroups?.currentData?.groups} chatId={chatId} sx={{ position: "absolute" }} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem"
        }}
      >
        {IconsBtns}
        {groupName && <>
          {GroupName}
          <Typography
            margin={"2rem"}
            alignSelf={"flex-start"}
            variant='body1'
          >
            Members
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}

              height={"50vh"}
              overflow={"auto"}
            >
              {
                groupDetails?.currentData?.chat?.members.map((user) => (
                  <UsersItem key={user._id} user={user} isAdded styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                    handler={removeMemberHandler} />
                ))
              }
            </Stack>
          </Typography>
          {ButtonGroup}
        </>
        }
      </Grid>
      {
        isAddMember && <Suspense fallback={<Backdrop />}>
          <AddMemberDialog chatId={chatId}/>
        </Suspense>
      }
      {
        confirmDeleteDialog &&
        <Suspense fallback={<Backdrop open />}
        ><ConfirmDeleteDialog open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler} />
        </Suspense>
      }
      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose} >
        <GroupList myGroups={myGroups?.currentData?.groups} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  )
};
const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack>
      {
        myGroups.length > 0 ? (
          myGroups.map((group) => {
            return <GroupItem group={group} chatId={chatId} key={group._id} />
          })
        ) : (
          <Typography
            textAlign={"center"}
            padding={"1rem"}
          >
            No Groups
          </Typography>
        )
      }
    </Stack>

  )
};
const GroupItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar avatar={avatar} />

        <Typography>{name}</Typography>
      </Stack>

    </Link>
  )
})

export default Group