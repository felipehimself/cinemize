import { IPost } from './../../ts/interfaces/post';

const PostCard = ({
  id,
  type,
  user,
  title,
  comment,
  whereToWatch,
  genres,
}: IPost): JSX.Element => {
  return (
    <div
      key={id}
      className='min-h-[126px] rounded-md w-full border bg-[#fffcfc] dark:bg-[#3b3b3b] '
    >
      <div className='py-2 px-3'>
        <div>
          <span className='text-sm font-bold'>@{user}</span>
          <span></span>
        </div>
        <div className='my-2 flex items-center gap-2'>
          <h3 className='text-sm'>{title}</h3>
          <span>•</span>
          <span className='text-sm'>{type}</span>
          {/* <div>
            {genres.map((gen) => {
              return (
                <span key={gen} className='text-xs'>
                  {gen}
                </span>
              );
            })}
          </div> */}
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-sm'>
            <p>{comment}</p>
          </div>
          <div className='flex flex-wrap gap-3'>
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

        </div>
      </div>
    </div>
  );
};
export default PostCard;
