import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Container,  PostForm } from "../components/index"
import appwriteService from "../appwrite/config"

function EditPost() {
    const [post, setPost] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
                
            }).catch((error) => console.log(error))
        } else navigate("/");     
    }, [navigate, slug])
  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
