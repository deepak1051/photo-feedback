import {Link} from 'react-router-dom'
import { authContext } from '../context/authContext';
import {useContext} from 'react'

export default function Homepage() {
  const { user } = useContext(authContext);
  return (
    <>
      <section className="px-3 py-5 bg-neutral-100 lg:py-10">
        <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <p className="text-4xl font-bold md:text-7xl text-orange-600">
              GIVE YOUR FEEDBACK
            </p>
            <p className="text-4xl font-bold md:text-7xl">FEEDBACK APP</p>
            <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
            <Link to={user ? '/feedbacks' : '/'} className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
              Click Now
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <img
              className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
              src="https://c4.wallpaperflare.com/wallpaper/297/22/531/lake-blue-moonlight-moon-wallpaper-preview.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
