import { useContext, useState } from 'react';
import { authContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const cloud_name = import.meta.env.VITE__CLOUD_NAME;
const upload_preset = import.meta.env.VITE__UPLOAD_PRESET;

export default function CreateFeedback() {
  const { user } = useContext(authContext);

  console.log(user);

  const [image1Loading, setImage1Loading] = useState(false);
  const [image2Loading, setImage2Loading] = useState(false);

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleImage1Change = async (e) => {
    console.log('image 1 change');

    const profileImage = e.target.files[0];

    if (
      profileImage === null &&
      (profileImage.type !== 'image/jpeg' ||
        profileImage.type !== 'image/jpg' ||
        profileImage.type !== 'image/png')
    ) {
      toast.error('only accepted types are jpeg/jpg/png');
    }

    try {
      setImage1Loading(true);
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', cloud_name);
        image.append('upload_preset', upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dzwub5bux/image/upload',
          { method: 'post', body: image }
        );

        const imgData = await response.json();

        setImage1(imgData.url.toString());
      }

      setImage1Loading(false);
    } catch (error) {
      setImage1Loading(false);
      toast.error(error.message);
    }
  };

  const handleImage2Change = async (e) => {
    console.log('change image2');

    const profileImage = e.target.files[0];

    if (
      profileImage === null &&
      (profileImage.type !== 'image/jpeg' ||
        profileImage.type !== 'image/jpg' ||
        profileImage.type !== 'image/png')
    ) {
      toast.error('only accepted types are jpeg/jpg/png');
    }

    try {
      setImage2Loading(true);
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', cloud_name);
        image.append('upload_preset', upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dzwub5bux/image/upload',
          { method: 'post', body: image }
        );

        const imgData = await response.json();

        setImage2(imgData.url.toString());
      }

      setImage2Loading(false);
    } catch (error) {
      setImage2Loading(false);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image1 || !title || !image2) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await axios.post(`/api/feedbacks`, {
        image1,
        image2,
        title,
      });
      navigate('/feedbacks');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data || error.message);
    }
  };

  return (
    <>
      <form className="container mx-auto w-1/2" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Feedback
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="caption"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a full title about feedback.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image1"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        {image1Loading ? (
                          <span>Uploading file please wait....</span>
                        ) : (
                          <span>Upload a file</span>
                        )}
                        <input
                          id="image1"
                          name="image1"
                          type="file"
                          className="sr-only "
                          accept="image/*"
                          onChange={handleImage1Change}
                        />
                      </label>
                      {!image1Loading && (
                        <p className="pl-1">or drag and drop</p>
                      )}
                    </div>
                    {!image1Loading && (
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    )}

                    {!image1Loading && image1 && (
                      <img src={image1} alt="cover thumbnail" />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image2"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        {image2Loading ? (
                          <span>Uploading file please wait....</span>
                        ) : (
                          <span>Upload a file</span>
                        )}
                        <input
                          id="image2"
                          name="image2"
                          type="file"
                          className="sr-only "
                          accept="image/*"
                          onChange={handleImage2Change}
                        />
                      </label>
                      {!image2Loading && (
                        <p className="pl-1">or drag and drop</p>
                      )}
                    </div>
                    {!image2Loading && (
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    )}

                    {!image2Loading && image2 && (
                      <img src={image2} alt="cover thumbnail" />
                    )}
                  </div>
                </div>
              </div>

              {/* {mutation.isError ? (
                <div className="p-2 rounded border border-red-400 bg-red-200">
                  {mutation.error.response.data.msg || mutation.error.message}
                </div>
              ) : null} */}

              <button
                disabled={image1Loading || image2Loading}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
