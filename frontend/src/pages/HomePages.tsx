/**
 * Renders the HomePages component.
 *
 * @return {JSX.Element} The rendered HomePages component.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CardContent, Search } from '../components/';
import { useContent } from '../context/ContentContext';
import { contentT } from '../types/contentT';

const HomePages = () => {
  const { user, isAuthenticated } = useAuth();
  const { contentsData } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLocal, setDataLocal] = useState<contentT[]>([]);

  // Ordenar los contenidos por fecha de creación
  const sortedContentsData = contentsData.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
    return dateB.getTime() - dateA.getTime();
  });

  useEffect(() => {
    // Actualiza los datos locales al cambiar el término de búsqueda
    if (!searchTerm) {
      return setDataLocal(sortedContentsData);
    }
    
    const filterSearch = sortedContentsData.filter((content) => {
      const transformedSearchTerm = searchTerm.toLowerCase();
      const transformedContent = content.name_theme[0].toLowerCase();
      return transformedContent.includes(transformedSearchTerm);
    });

    setDataLocal(filterSearch);
  }, [searchTerm, sortedContentsData]);

  // Inicializa dataLocal cuando contentsData cambia
  useEffect(() => {
    if (contentsData) {
      setDataLocal(sortedContentsData);
    }
  }, [contentsData, sortedContentsData]);

  if (!contentsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="text-4xl font-bold text-sky-400">
        Welcome, Mr(s) {!user ? 'visitor' : user.username}
      </h1>
      <span className="text-2xl font-bold text-gray-300 mt-2">
        {!user
          ? 'If you have credentials you can access the login or register otherwise '
          : `You are logged in as ${user.role} - Section Contents`}
      </span>
      {isAuthenticated && <Search onSearch={setSearchTerm} />}

      <div className="overflow-auto flex flex-wrap gap-2 mt-5">
        {dataLocal.length > 0 && isAuthenticated ? (
          dataLocal.map((content) => (
            <CardContent key={content._id} {...content} />
          ))
        ) : (
          <p className="text-2xl font-bold text-gray-300 mt-2">
            {!user
              ? 'You cannot access the content without credentials.'
              : 'Sorry, the content you are looking for does not exist for now. Please try again later.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePages;
