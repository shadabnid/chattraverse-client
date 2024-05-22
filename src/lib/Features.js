import moment from "moment";

const fileFormat = (url) => {
    const fileExt = url.split('.').pop();
    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
        return "video";
    if (fileExt === "mp3" || fileExt === "wav" || fileExt === "audio")
        return "audio";
    if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif")
        return "image";

    return "file";    

};

const transformImage = (url="",width=100)=>url;

const getLast7days = ()=>{
    const currentDate = moment();
    const get7days = [];
    for(let i=0;i<7;i++){
        const dayDate = currentDate.clone().subtract(i,"days");
        const dayName = dayDate.format("dddd");
        get7days.unshift(dayName);
    }
    return get7days;
}

const getOrSaveFromStorage = ({key,value,get}) =>{
     if(get)
        return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    :null;
    else localStorage.setItem(key,JSON.stringify(value));
}

export { fileFormat,transformImage,getLast7days,getOrSaveFromStorage };