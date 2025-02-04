import axios from 'axios'


const commenApi=async(httpmethod,url,reqBody,reqHeader)=>{

    const reqConfig={
        method:httpmethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"content-type":"application/json"}
        // server notification that the content type of the header is json type
    }

   return await axios(reqConfig).then(res=>{
    return res
   }).catch(err=>{
    return err
   })
}

export default commenApi