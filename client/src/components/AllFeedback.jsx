import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllFeedback() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['feedback'],
    queryFn: () => axios.get('/api/feedbacks').then((res) => res.data),
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.toString()}</div>;

  return (
    <div className="p-5">
      <h1 className="bg-pink-700 p-2 font-bold text-2xl text-white text-center shadow rounded-sm">
        All Feedback
      </h1>
      <div className="flex flex-col">
        {data.map((feedback) => (
          <div
            key={feedback.id}
            className="p-2 flex items-center justify-between border-b border-gray-300 mt-4"
          >
            <h3>{feedback.title}</h3>
            <Link to={`/feedbacks/${feedback._id}`} className="text-blue-500 ">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
