import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts as storePosts } from "../store/postSlice";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    appwriteService
      .getAllPosts()
      .then(() => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(storePosts(posts.documents));
        }
      })
      .catch((error) => console.log(error))
      
  }, [posts, dispatch]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-zinc-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return(
    <div className="py-8">
        <Container>
            {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard {...post} />
                </div>
            ))}
        </Container>
    </div>
  )
}

export default Home;
