import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import UsersItem from '../shared/UsersItem'
import { sampleUsers } from '../constants/sampleData'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch } from '../../redux/reducer/misc'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import toast from 'react-hot-toast'
import { useAsyncMutation } from '../../hooks/hook'


const SearchDialog = () => {
  const search = useInputValidation("");
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  let [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("sending friend request...", { userId: id })

  }
  isLoadingSendFriendRequest = false;

  const searchCloseHandler = () => dispatch(setIsSearch(false));
  useEffect(() => {
    const timeOutId = setTimeout(() => {

      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000)
    return () => {
      clearTimeout(timeOutId);
    }
  }, [search.value])


  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>

      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}

        />
        <List>

          {
            users.map((user) => (
              <UsersItem user={user}
                key={user._id}
                handler={addFriendHandler}
                handleIsLoading={isLoadingSendFriendRequest} />
            ))
          }
        </List>

      </Stack>
    </Dialog>
  )
}

export default SearchDialog