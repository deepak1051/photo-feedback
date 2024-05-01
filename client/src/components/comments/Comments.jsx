import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import CreateComment from './CreateComment';
import CommentReplyContainer from './CommentReplyContainer';

export default function Comments({ feedbackId }) {
  const { data } = useQuery({
    queryKey: ['comments', feedbackId],
    queryFn: () =>
      axios.get(`/api/comments/${feedbackId}`).then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="p-5 mt-24">
      <hr />
      <h2 className="text-2xl">Comments</h2>
      <CreateComment feedbackId={feedbackId} />

      <hr />
      <div>
        {data?.map((comment) => (
          <div
            className="border rounded-md p-3 ml-3 my-3 relative"
            key={comment._id}
          >
            <div className="flex gap-3 ">
              <img
                src={comment?.user.avatar}
                className="object-cover w-8 h-8 rounded-full 
                    border-2 border-emerald-400  shadow-emerald-400
                    "
              />

              <div>
                <div className="flex gap-2 items-center">
                  {/* <h3 className="font-semibold">{comment?.name}</h3> */}
                  <span className="text-xs text-slate-400 ">
                    {' '}
                    {formatDistance(new Date(comment?.createdAt), Date.now(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-5 mt-1">
                  <p className="text-gray-700 text-base ">{comment.text}</p>
                </div>
              </div>
            </div>

            <CommentReplyContainer
              // id={id}
              comment={comment}
              feedbackId={feedbackId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
