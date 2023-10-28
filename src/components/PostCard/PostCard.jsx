/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import appwriteService from '../../appwrite/config'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-zinc-300 p-4 rounded-xl'>
        <div className='w-full mb-4 justify-center'>
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-black font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
