import { useState } from 'react';
import { Post as PostType } from '../ts/types/post';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { IoBookmark, IoBookmarkOutline, IoTrash } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';

const {motion} = require('framer-motion')

import { parseISO, format } from 'date-fns';



import axios from 'axios';

//@ts-ignore
import ReactStars from 'react-rating-stars-component';

type Props = PostType & {
  userName: string;
  isVerified: boolean;
  loggedUserId: string;
  
};

const PostCard = ({ postId, rating, type, userName, title, comment, whereToWatch, genre, isVerified, createdAt, likedBy, favoritedBy,
  loggedUserId,
  userId,
  
}: Props): JSX.Element => {
  const [isSubmiting, setIsSubmiting] = useState(false)

  const postDate = format(
    parseISO(createdAt), 
    "dd/MM/yyyy '•' HH'h'mm"
  );
  

  const router = useRouter()
  const refreshProps = () => router.replace(router.asPath);

  const handleLike = async () => {

    setIsSubmiting(true)
    try {
      await axios.put('/api/post/like', {
        postId: postId,
        isLiking: true,
      });
     await refreshProps()
  

      setIsSubmiting(false)
    } catch (error) {
      console.log(error)
      setIsSubmiting(false)
    }
  };


  const handleDislike = async () => {
    setIsSubmiting(true)
    try {
      await axios.put('/api/post/like', {
        postId: postId,
        isLiking: false,
        
      });
      await refreshProps()
     
      setIsSubmiting(false)
    } catch (error) {
      console.log(error)
      setIsSubmiting(false)
    }
  }

  const handleFavorite = async () => {
    setIsSubmiting(true)
    try {
      await axios.put('/api/post/favorite', {
        postId: postId,
        isFavoriting: true,
      });
      await refreshProps()
      
      setIsSubmiting(false)
    } catch (error) {
      console.log(error)
      setIsSubmiting(false)
    }
  }


  const handleUnfavorite = async () => {
    setIsSubmiting(true)
    try {
     await axios.put('/api/post/favorite', {
        postId: postId,
        isFavoriting: false,
        
      });
      await refreshProps()
      setIsSubmiting(false)
    } catch (error) {
      console.log(error)
      setIsSubmiting(false)
    }
  }


  const handleDelete = async () => {
    setIsSubmiting(true)

    try {
    await axios.delete(`/api/post/${postId}`)
    refreshProps()

    setIsSubmiting(false)
    
    } catch (error) {
      console.log(error);
      setIsSubmiting(false)      
    }
  }


  return (
    <motion.article
      key={postId}
      className='min-h-[126px] rounded-md w-full border bg-lightWhite dark:bg-lightDark '
      initial={{y: 0, opacity:1}}
      exit={{opacity:0}}
    >
      <div className='py-2 px-3 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <Link href={`/user/${userName}`}>
            <a className='flex items-center gap-1'>
              <span className='text-sm font-bold'>@{userName}</span>
              <span> {isVerified ? <MdVerified className='fill-indigo-600 dark:fill-white' /> : undefined} </span>
            </a>
          </Link>
          <div className='flex items-center gap-2'>
            {loggedUserId === userId && 
            (
            <button onClick={handleDelete} disabled={isSubmiting} 
                className='group'> 
                    {isSubmiting? 
                <span 
                className='block border-[2px] animate-spin border-slate-300 border-t-[2px] border-t-indigo-600 rounded-full h-[16px] w-[16px]'></span> : 
                <IoTrash className='group-hover:scale-110 group-hover:text-red-500 transition'/> 
                }
            </button>)
            }
          </div>
        </div>

        {/* content container */}
        <div className='mt-2 grid grid-cols-1 flex-col md:grid-cols-2 gap-3'>

          {/* COL 1 */}
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <h3 className='text-sm'>{title}</h3>
              <span>•</span>
              <span className='text-sm'>{type}</span>
            </div>
            <div className='flex my-3 flex-col gap-3'>
              <p className='text-sm'>{comment}</p>
            </div>
          </div>

          {/* COL 2 */}
          <div className='flex flex-col gap-3'>
            {/* nota */}
            <div className='flex flex-col '>
              <span className='text-xs -mb-2'>
                Nota <span className='ml-1'>{rating}</span>
              </span>

              <ReactStars
                edit={false}
                isHalf={true}
                size={28}
                activeColor='#eab308'
                value={rating}
              />
            </div>

            <div className='flex -mt-2 md:flex-col gap-3'>
              <div className='text-xs'>
                <span className='mb-1 block'>Onde assistir</span>
                <ul className='flex flex-wrap items-start gap-2'>
                  {whereToWatch.map((platform: any) => {
                    return (
                      <li
                        className='py-1 min-w-fit capitalize px-2 dark:bg-dark bg-slate-200 rounded-lg text-xs'
                        key={platform}
                      >
                        {platform}
                      </li>
                    );
                  })}
                </ul>
              </div>
              
            </div>
            <div className='text-xs'>
                <span className='mb-1 block'>Gênero</span>
                <ul className='flex flex-wrap gap-2'>
                  {genre.map((gen) => {
                    return (
                      <li
                        className='py-1 capitalize px-2 dark:bg-dark bg-slate-200 rounded-lg text-xs'
                        key={gen}
                      >
                        {gen}
                      </li>
                    );
                  })}
                </ul>
              </div>

            
          </div>
        </div>


        <footer className='flex items-end justify-between gap-3 mt-2'>
        <span className='text-[10px]'>{postDate}</span>
          <div className='flex gap-3'>
            <div className='flex items-end justify-end gap-1'>
              {likedBy.some((lik) => lik?.userId === loggedUserId) ? (
                <>
                  <button disabled={isSubmiting} onClick={handleDislike} className='peer hover:scale-110 hover:-rotate-6 transition'>
                    <AiFillLike  size={20} />
                  </button>
                  <span className='text-xs peer-hover:scale-110'>
                    {likedBy.length}
                  </span>
                </>
              ) : (
                <>
                  <button disabled={isSubmiting} onClick={handleLike}  className='peer hover:scale-110 hover:-rotate-6 transition'>
                    <AiOutlineLike size={20} />
                  </button>
                  <span className='text-xs peer-hover:scale-110'>
                    {likedBy.length}
                  </span>
                </>
              )}
            </div>
            <div className='flex items-end justify-end gap-1'>

            {favoritedBy.some((fav) => fav?.userId === loggedUserId) ? (
                <>
                  <button disabled={isSubmiting} onClick={handleUnfavorite} className='peer hover:scale-110 transition'>
                    <IoBookmark  size={20} />
                  </button>
                  <span className='text-xs peer-hover:scale-110'>
                    {favoritedBy.length}
                  </span>
                </>
              ) : (
                <>
                  <button disabled={isSubmiting} onClick={handleFavorite}  className='peer hover:scale-110 transition'>
                    <IoBookmarkOutline size={20} />
                  </button>
                  <span className='text-xs peer-hover:scale-110'>
                    {favoritedBy.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </footer>
      </div>
    </motion.article>
  );
};
export default PostCard;
