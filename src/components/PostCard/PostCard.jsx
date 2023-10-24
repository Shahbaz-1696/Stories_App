/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import appwriteService from '../../appwrite/config'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full flex justify-center items-center'>
        <div className='bg-zinc-300'>
          <img src={appwriteService.getFilePreview(featuredImage)} />
        </div>
        <h2 className='text-black font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
