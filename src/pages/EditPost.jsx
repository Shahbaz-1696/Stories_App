import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Container, PostCard } from "../components/index"
import appwriteService from "../appwrite/config"

function EditPost() {
    const [post, setPost] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then(() => {
                if(post){
                    setPost(post)
                }
                
            }).catch((error) => console.log(error))
        } else navigate("/");     
    }, [navigate, slug, post])
  return post ? (
    <div className="py-8">
        <Container>
            <PostCard post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
