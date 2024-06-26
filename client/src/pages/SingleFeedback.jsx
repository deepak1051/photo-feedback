import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { authContext } from '../context/authContext';
import Comments from '../components/comments/Comments';

export default function SingleFeedback() {
  const { user } = useContext(authContext);
  const { feedbackId } = useParams();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['feedback', feedbackId],
    queryFn: () =>
      axios.get(`/api/feedbacks/${feedbackId}`).then((res) => res.data),
  });

  const voteMutation1 = useMutation({
    mutationFn: (data) => axios.post(`/api/feedbacks/${feedbackId}/vote`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const voteMutation2 = useMutation({
    mutationFn: (data) => axios.post(`/api/feedbacks/${feedbackId}/vote`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', feedbackId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const isLikedByUser = (img) => {
    return data?.votes?.find((v) => v.userId === user._id && v.imageUrl == img);
  };

  const voteCountWithImage = (img) => {
    return data?.votes?.filter((v) => v.imageUrl == img).length;
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.toString()}</div>;

  return (
    <div className="flex flex-col p-4 ">
      <h1 className="bg-pink-700 p-2 font-bold text-2xl text-white text-center shadow rounded-sm mb-4">
        {data.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-20 md:gap-2 items-center justify-between">
        <div className="flex flex-col gap-2 md:flex-1 md:h-80 w-full h-60  object-cover rounded cursor-pointer">
          <div className="bg-indigo-50 w-full">
            <img
              className="md:flex-1 md:h-80 w-full h-60 object-contain rounded cursor-pointer"
              src={data.image1}
              alt="image1"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={voteMutation1.isPending}
              onClick={() => voteMutation1.mutate({ imageUrl: data.image1 })}
              className=" flex  items-center  gap-2 bg-teal-600 p-2 text-lg text-white rounded"
            >
              {isLikedByUser(data.image1) ? (
                <AiFillHeart
                  className="text-2xl cursor-pointer"
                  fill="deeppink"
                />
              ) : (
                <AiOutlineHeart className="text-2xl cursor-pointer" />
              )}

              {voteMutation1.isPending ? 'Voting...' : 'Vote'}
            </button>
            <span className="flex  items-center justify-center font-extrabold bg-cyan-400 p-2  text-white rounded-full h-8 w-8">
              {voteCountWithImage(data.image1)}
            </span>
          </div>
        </div>
        <div className="flex flex-col  md:flex-1 gap-4 md:h-80 w-full h-60 object-cover rounded cursor-pointer">
          <div className="bg-indigo-50 w-full">
            <img
              className="md:flex-1 md:h-80 w-full h-60 object-contain rounded cursor-pointer"
              src={data.image2}
              alt="image2"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={voteMutation2.isPending}
              onClick={() => voteMutation2.mutate({ imageUrl: data.image2 })}
              className="flex items-center gap-2 bg-teal-600 p-2 text-lg text-white rounded"
            >
              {isLikedByUser(data.image2) ? (
                <AiFillHeart
                  className="text-2xl cursor-pointer"
                  fill="deeppink"
                />
              ) : (
                <AiOutlineHeart className="text-2xl cursor-pointer" />
              )}

              {voteMutation2.isPending ? 'Voting...' : 'Vote'}
            </button>
            <span className="flex  items-center justify-center font-extrabold bg-cyan-400 p-2  text-white rounded-full h-8 w-8">
              {voteCountWithImage(data.image2)}
            </span>
          </div>
        </div>
      </div>

      <hr />
      {/* <div className="mt-24">
        <h3>Search Something On Youtube</h3>
        <div className="py-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${searchText}`);
            }}
          >
            <input
              className="p-2 border border-black w-full"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="p-2 bg-teal-500 text-white text-xl"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div> */}

      <hr />
      <Comments feedbackId={data._id} />
    </div>
  );
}
