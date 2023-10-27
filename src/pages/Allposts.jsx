import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function Allposts() {
  const [posts, setPosts] = useState([]);
  const storePosts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    // if (storePosts.length > 0) {
    //   setPosts(storePosts);
    // } else {
    //   appwriteService
    //     .getAllPosts([])
    //     .then((posts) => {
    //         if(posts){
    //             setPosts(posts.documents)
    //         }
    //     })
    //     .catch((error) => console.log(error));
    // }
    appwriteService.getAllPosts([]).then((posts) => {
      if (posts) {
          setPosts(posts.documents)
      }
  })
  }, []);

  return (
  <div className="w-full py-8">
    <Container>
        <div className="flex flex-wrap justify-center items-center  w-full lg:gap-32 md:gap-32 gap-8">
            {posts.map(post => (
                <div key={post.$id} className="flex justify-center items-center w-full">
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </Container>
  </div>)
}

export default Allposts;
