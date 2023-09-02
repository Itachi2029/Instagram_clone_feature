import './Add.css';
import { useState, useRef ,useContext} from 'react';
import  Context from '../../Context';


const AddPost = (props) => {

  const{user,setisPost,isPost}=useContext(Context)

  const contentRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const{toggleModal}=props
  const verfiation=({content})=>{
    
    if(content.trim().length===0){
      return false
    }
    return true

  }

  const inputs=({content,user,imageFile})=>{
    const form =new FormData() 
    form.append('paragraph',content)
    form.append('image',imageFile)
    form.append('username',user)
    return form
  
  }
  const Charger=async()=>{
      await setisPost(!isPost)


  }

  const submit=async({input})=>{
    const url="http://localhost:4000/post"   
    return await fetch(url,{
      method:"post",
      body:input
    })
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    const content = contentRef.current.value;
    if(verfiation({content})){
      const input=inputs({content,user,imageFile})
      try{
      submit({input})
      .then(res=>{return res.json()})
      .then(data=>{
        if(data.sucess){
          alert('Posted')
          contentRef.current.value=""
          Charger()
          
          setImageFile(null)
          setImagePreview(null)
          toggleModal(false)
        }
      })  
     
     
    
    }catch(err){
      alert('msfmdsf ')
    }

       
  } 
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="add-post">
      <button className='close'>Close</button>
      <div className="container">
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            placeholder="Write your post here..."
            className="post-content"
            ref={contentRef}
          />
          <label htmlFor="post-image" className="post-image-label">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="post-image"
            onChange={handleImageChange}
            className="post-image-input"
          />
          {imagePreview && <img src={imagePreview}  className="img-preview" alt="Preview" />}
          <button type="submit" className="post-submit">
            POST
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
