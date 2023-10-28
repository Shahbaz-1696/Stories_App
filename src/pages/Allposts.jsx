import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function Allposts() {
  const [allPost, setAllPost] = useState(null);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (posts?.length > 0) {
        setAllPost(posts);
    } else {
      appwriteService
        .getAllPosts()
        .then((posts) => {
          if (posts) {
            setAllPost(posts.documents);
            console.log("service returned")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
  <div className="w-full py-8">
    <Container>
        <div className="flex flex-wrap">
            {allPost && allPost.map(post => (
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </Container>
  </div>)
}

export default Allposts;
