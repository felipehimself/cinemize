import { IPost } from './../../ts/interfaces/post';
import { AiFillLike, AiOutlineLike,  } from 'react-icons/ai';
import {MdVerified} from 'react-icons/md'

const PostCard = ({
  id,
  type,
  user,
  title,
  comment,
  whereToWatch,
  genres,
  verified
}: IPost): JSX.Element => {
  return (
    <article
      key={id}
      className='min-h-[126px] rounded-md w-full border bg-lightWhite dark:bg-lightDark '
    >
      <div className='py-2 px-3'>
        <div className='flex items-center gap-1'>
          <span className='text-sm font-bold'>@{user}</span>
          <span> {verified? <MdVerified /> : undefined} </span>
        </div>
        <div className='my-2 flex items-center gap-2'>
          <h3 className='text-sm'>{title}</h3>
          <span>•</span>
          <span className='text-sm'>{type}</span>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-sm'>
            <p>{comment}</p>
          </div>
          <div className='flex flex-col flex-wrap gap-3'>
            <div className='text-xs'>
              <p className='mb-1'>Watch on</p>
              <ul className='flex gap-2'>
                {whereToWatch.map((platform: any) => {
                  return (
                    <li
                      className='py-1 capitalize px-2 dark:bg-dark bg-slate-200 rounded-lg text-xs'
                      key={platform}
                    >
                      {platform}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='text-xs'>
              <p className='mb-1'>Genre</p>
              <ul className='flex gap-2'>
                {genres.map((platform: any) => {
                  return (
                    <li
                      className='py-1 capitalize px-2 dark:bg-dark bg-slate-200 rounded-lg text-xs'
                      key={platform}
                    >
                      {platform}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <footer className='flex items-end justify-end gap-1'>
            <button className='peer active:scale-105 active:-rotate-6 transition'>
              <AiOutlineLike size={20} /> 
            </button>
            <span className='text-xs peer-active:scale-110'>5</span>
          </footer>
        </div>
      </div>
    </article>
  );
};
export default PostCard;
