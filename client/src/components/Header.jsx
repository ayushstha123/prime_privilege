import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='z-10 sticky top-0 shadow-lg' style={{backgroundColor:'#263675'}}>
      <div className='text-white font-sans font-thin  flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Prime <span style={{color:'#F4BE40'}}>Privileges</span></h1>
        </Link>
        <ul className='flex gap-6'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/teams'>
            <li>Our Team</li>
          </Link>
          {currentUser && currentUser.role === 'admin' ? ( <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className=" w-full py-1 px-2 bg-white rounded-md shadow-sm  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleMenu}
        >
          Admin
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            <Link
              to='/profile'
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Link
              to='/create-post'
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={toggleMenu}
            >
              Create a cupon
            </Link>
            <Link
              to='/profile'
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={toggleMenu}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </div>):
    currentUser ? (
      <Link to='/profile'>
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
      </Link>
    ) : (
        <Link to={'/sign-in'}>Sign In</Link> 
    )
    }
        </ul>
      </div>
    </div>
  );
}