import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../context/authContext';

export default function EditNote() {
  const { token } = useContext(authContext);
  const { noteId } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTitle(data.title);
        setContent(data.content);
        setDate(new Date(data.date).toISOString().substring(0, 10));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [noteId, token]);

  const mutation = useMutation({
    mutationFn: (data) =>
      axios
        .put(`/api/notes/${noteId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      navigate('/notes');
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      title,
      content,
      date,
    });
  };

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <Link
            to="/notes"
            className="bg-gray-400 p-2 rounded-sm text-white font-bold ml-4"
          >
            Back
          </Link>
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Edit Note
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg rounded-lg border"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Content
                </label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  name="content"
                  className="resize-none w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  name="date"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              {mutation.isError ? (
                <div className="p-2 rounded border border-red-400 bg-red-200">
                  {mutation.error.response.data.msg || mutation.error.message}
                </div>
              ) : null}

              <button
                type="submit"
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                {mutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
