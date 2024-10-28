import { contentT } from '../../types/contentT';
import ButtonLink from '../ButtonLink';
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import getYouTubeId from '../../utils/getYoutube';

function CardContent({
  name_theme,
  url_image,
  url_video,
  credits,
  content_text,
  _id,
}: contentT) {
  const { user } = useAuth();
  const { deleteContent } = useContent();
  const isAdminOrCreator = () => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'creators') return true;
    return false;
  };
  const isAdmin = () => {
    if (user?.role === 'admin') return true;
    return false;
  };
  return (
    <div className="max-w-sm bg-zinc-800 border border-gray-800 rounded-lg shadow w-[250px]">
      {!!url_image && (
        <img
          className="rounded-t-lg w-full h-[250px] object-cover"
          src={`http://localhost:3000/uploads/${url_image}`}
          alt={name_theme}
        />
      )}

      {!!url_video && (
        <div className="rounded-t-lg w-full h-[250px] mt-2">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${getYouTubeId(url_video)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
          Tematica: {name_theme}
        </h5>
        <span className="mb-2 text-md font-bold tracking-tight text-gray-500">
          creditos: {credits}
        </span>

        {!!content_text && (
          <p className="mb-3 font-normal text-gray-300">{content_text}</p>
        )}

        <footer className="flex justify-between items-center mt-5 gap-2">
          {isAdminOrCreator() && (
            <>
              <ButtonLink to={`/contents/form/${_id}`} bgColor="bg-green-700">
                Edit
              </ButtonLink>
            </>
          )}

          {isAdmin() && (
            <Button onClick={() => deleteContent(_id)} bgColor="bg-red-500">
              Delete
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}

export default CardContent;

