
export const samplechats = [{
    avatar:["https://gravatar.com/avatar/HASH"],
    name:"shadab",
    _id:"1",
    groupChat:false,
    members:["1","2"]
},
{
    avatar:["https://gravatar.com/avatar/HASH"],
    name:"atif",
    _id:"2",
    groupChat:false,
    members:["1","2"]
},


]
export const sampleUsers = [
    {
        avatar:["https://gravatar.com/avatar/HASH "],
        name:"shadab",
        _id:"1",
    },
    {
        avatar:["https://gravatar.com/avatar/HASH "],
        name:"atif",
        _id:"2",
    },
  

]
export const smapleNotification =[
    {
        sender:{
            avatar:["https://gravatar.com/avatar/HASH "],
            name:"atif",

        },

    },
    {
        sender:{
            avatar:["https://gravatar.com/avatar/HASH "],
            name:"shadab",

        },

    }
];
export const sampleMessage = [
    {
       
        content:"this is new message",
        _id:"1234",
        sender:{
            _id:"user_id",
            name:"lallu",
        },
        chat:"chatID",
        createdAt:"'2024-03-29T20:58:03.278Z'"
    }
]

export const dashboardData={
 users:[
    {
        id:"1",
        avatar:"",
        name:"shadab",
        username:"shadabnid",
        friends:20,
        groups:4
    },
    {
        id:"2",
        name:"atif",
        avatar:"",
        username:"khan",
        friends:16,
        groups:7
    }
 ] ,
 chats:[
  {
    name:"shadab",
    avatar:[],
    id:1,
    groupChat:false,
    members:["1","2"],
    totalmessages:10,
    totalmembers:2,
    creator:{
        name:"shad",
        avatar:"",
    }
  },
  {
    name:"atif",
    avatar:[],
    id:2,
    groupChat:false,
    members:["1","2"],
    totalmessages:200,
    totalmembers:5,
    creator:{
        name:"khan",
        avatar:"",
    }
  }  
 ],
 messages:[
    {

        attachments:[],
        content:"hello",
        id:"1",
        sender:{
            id:"2",
            name:"shadab",
        },
        chat:"chatu",
        creator:"2024-02-12",
    }

 ]
}