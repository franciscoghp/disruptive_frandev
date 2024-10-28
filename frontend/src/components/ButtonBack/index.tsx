import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-cyam-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  ⬅ Back
          </span>

    </button>
  );
};

export default ButtonBack;
