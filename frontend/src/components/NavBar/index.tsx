import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ButtonLink from '../ButtonLink';
import BackButton from '../ButtonBack';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const isAdminOrCreator = () => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'creators') return true;
    return false;
  };

  return (
    <nav className="bg-white border-green-200 dark:bg-green-900 dark:border-green-700 mb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <div className="flex items-center space-x-4">
          <BackButton />
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Disruptive
            </span>
          </a>
        </div>

        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-500 rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-green-100 rounded-lg bg-green-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-green-800 md:dark:bg-green-900 dark:border-green-700">
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                {user && user.role === 'admin' && (
                  <>
                    <li>
                      <Link
                        to="/categories"
                        className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories/form"
                        className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        New Category
                      </Link>
                    </li>
                  </>
                )}
                {isAdminOrCreator() && (
                  <li>
                    <Link
                      to="/contents/form"
                      className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Add Content
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/"
                    onClick={() => logout()}
                    className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <ButtonLink to="/login">Login</ButtonLink>
                </li>
                <li>
                  <ButtonLink to="/register">Register</ButtonLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
