import React from 'react'
import { transformImage } from '../../lib/Features';
import { FileOpen as FileOpenIcon} from '@mui/icons-material';

const RenderAttachment = (file,url) => {
  switch(file){
    case "video":
       return  <Video src={url} preload="none" width={"200px"} controls/>
    case "image":
        return <img src={transformImage(url,200)} alt="attachment" width={"200px"} height={"200px"}
        style={{
            objectFit:"contain"
        }}/>
     
    case "audio":
        return  <Video src={url} preload="none" controls/>  

    default:
        return <FileOpenIcon/>    
  }
}

export default RenderAttachment