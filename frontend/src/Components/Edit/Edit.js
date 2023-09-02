import { useParams } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit=()=>{

    const nava=useNavigate()
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const{username}=useParams()
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      };
    

    


    const submit=async()=>{
        
        const form=new FormData()
        form.append('image',imageFile)

        const url=`http://localhost:4000/changeprofile?username=${username}` 

        const response=await fetch(url,{
            method:
              "post"
            ,body:
               form
        })
        const data=response.json()
        nava(`/Profile/${username}`)
        console.log(data)

       

    }
    return <>
       
       
        <h1>{username}</h1>

        <label htmlFor="post-image" className="post-image-label">
             Change profile 
          </label>
          
          <input
            type="file"
            accept="image/*"
            id="post-image"
            onChange={handleImageChange}
            className="post-image-input"
          />
         {imagePreview && <img src={imagePreview}  className="img-preview" alt="Preview" />}
         <button onClick={submit}> New profile</button>

    </>
}

export default Edit