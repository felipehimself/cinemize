import { Post as PostType } from '../ts/types/post';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';

import Link from 'next/link';

//@ts-ignore
import ReactStars from 'react-rating-stars-component';

type PCard = PostType & { userName: string; isVerified: boolean };

const PostCard = ({
  postId,
  rating,
  type,
  userName,
  title,
  comment,
  whereToWatch,
  genre,
  isVerified,
}: PCard): JSX.Element => {
  return (
    <article
      key={postId}
      className='min-h-[126px] rounded-md w-full border bg-lightWhite dark:bg-lightDark '
    >
      <div className='py-2 px-3'>
        <Link href={`/user/${userName}`}>
          <a className='flex items-center gap-1'>
            <span className='text-sm font-bold'>@{userName}</span>
            <span> {isVerified ? <MdVerified /> : undefined} </span>
          </a>
        </Link>

        {/* content container */}
        <div className='mt-2 flex flex-col md:flex-row gap-3'>
          {/* COL 1 */}
          <div className='flex-[1.8] flex flex-col gap-1'>
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
          <div className='flex-1 flex flex-col gap-3'>
            <div className='flex  md:flex-col gap-3'>
              <div className='text-xs'>
                <span className='mb-1 block'>Onde assistir</span>
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
                <span className='mb-1 block'>Gênero</span>
                <ul className='flex gap-2'>
                  {genre.map((gen: any) => {
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

            <div className='flex flex-col '>
              <span className='text-xs -mb-2'>Nota</span>

              <ReactStars
                edit={false}
                isHalf={true}
                size={28}
                activeColor='#eab308'
                value={rating}
              />
            </div>
          </div>
        </div>
        <footer className='flex items-end justify-end gap-3'>
          <div className='flex items-end justify-end gap-1'>
            <button className='peer hover:scale-110 hover:-rotate-6 transition'>
              <AiOutlineLike size={20} />
            </button>
            <span className='text-xs peer-hover:scale-110'>5</span>
          </div>
          <div className='flex items-end justify-end gap-1'>
            <button className='peer hover:scale-105 transition'>
              <IoBookmarkOutline size={18} />
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};
export default PostCard;
