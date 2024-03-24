import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../context/authContext';

export default function Header() {
  const { user } = useContext(authContext);

  console.log(user);

  let content;
  if (user === null) {
    content = '';
  } else if (user === false) {
    content = <a href="/auth/google">Login with Google</a>;
  } else {
    content = (
      <div className="flex text-sm gap-2 items-center">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user.avatar}
          alt="profile pic"
        />
        <Link
          className="p-2 border border-blue-400 text-blue-400 rounded"
          to="/feedbacks/new"
        >
          New
        </Link>
        <a
          className="p-2 text-red-400 border border-red-400 rounded"
          href="/api/logout"
        >
          Logout
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 flex justify-between px-8 p-4 text-white font-bold items-center">
      <h2 className="italic">
        <Link to={user ? '/feedbacks' : '/'}>FEEDBACKS</Link>
      </h2>

      <div>{content}</div>
    </div>
  );
}
