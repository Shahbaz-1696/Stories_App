import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts as storePosts } from "../store/postSlice";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService
      .getAllPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(storePosts(posts.documents));
          setLoading(false);
        }
      })
      .catch((error) => console.log(error))
      .finally(userData => {
        if(userData === null){
          navigate("/login")
        }
      })
  }, []);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-zinc-500">
                {userData && "No posts. Please add a post"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
      {loading ? (
        <h1 className="font-bold text-3xl">Loading...</h1>
      ) : (
        <div className="py-8">
          <Container>
            {posts?.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </Container>
        </div>
      )}
    </>
  );
}

export default Home;
