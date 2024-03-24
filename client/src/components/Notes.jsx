import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../context/authContext';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default function Notes() {
  const { token } = useContext(authContext);

  const queryClient = useQueryClient();

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['notes'],
    queryFn: () =>
      axios
        .get('/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    retry: 0,
  });

  const mutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>{error.response.data.msg || error.message}</span>;

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Your Favorites Notes
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              If You Arent Taking Notes, You Arent Learning.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
            {data?.map((note) => (
              <div
                key={note._id}
                className="relative rounded-lg bg-gray-100 p-5 pt-8"
              >
                <span
                  onClick={() => handleDelete(note._id)}
                  className="absolute -top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white cursor-pointer"
                >
                  <MdDeleteOutline size={20} />
                </span>

                <span className="absolute  -top-4 right-16 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white cursor-pointer">
                  <Link to={`/edit/${note._id}`}>
                    <CiEdit size={20} />
                  </Link>
                </span>

                <h3 className="mb-3 text-lg font-semibold text-indigo-500 md:text-xl">
                  {note.title}
                </h3>
                <p className="text-gray-500">{note.content}</p>
                <span>{format(note.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
