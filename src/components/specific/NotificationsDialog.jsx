
import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { smapleNotification } from '../constants/sampleData';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducer/misc';
import toast from 'react-hot-toast';

const NotificationsDialog = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({_id, accept}) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "something went Wrong")
      }

    } catch (error) {
      toast.error("something went wrong");
    }

  }
  useErrors([{ error, isError }]);

  const closeHandler = () => dispatch(setIsNotification(false));
  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={"25rem"}
      >
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? <Skeleton /> :
            <>
              {
                data?.allRequests?.length > 0 ? (
                  data?.allRequests?.map((i) => (
                    <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id} />
                  ))
                ) : (
                  <Typography textAlign={"center"}>0 Notifications</Typography>
                )

              }
            </>


        }
      </Stack>
    </Dialog>
  )
};
const NotificationItem = memo(({ sender, _id, handler }) => {
  console.log(sender);
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-flex",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%"
          }}
        >
          {name}
        </Typography>
        <Stack direction={{
          xs: "column",
          sm: "row"
        }}>
          <Button onClick={() => handler({ _id, accept: true })}>
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>

      </Stack>
    </ListItem>
  )

})

export default NotificationsDialog