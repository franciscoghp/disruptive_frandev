import { Link } from 'react-router-dom';

const NoFoundPages = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Pages Not Found
        </h1>
        <p className="text-lg text-gray-300 text-center">
          Sorry , the page you are looking for does not exist.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoFoundPages;

