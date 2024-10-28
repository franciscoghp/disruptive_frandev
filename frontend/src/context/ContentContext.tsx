/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useMemo, useEffect } from 'react';

import {
  getContentsRq,
  createContentRq,
  deleteContentRq,
  updateContentRq,
  getContentRq,
} from '../api/content';
import { contentT } from '../types/contentT';
import { useAuth } from './AuthContext';

type contentSaveT = Omit<contentT, '_id'>;
type contentUpdateT = Omit<contentT, 'credits'>;

const ContentContext = createContext({
  contentsData: [] as contentT[],
  saveContent: (data: contentSaveT) => {
    console.log(data);
  },
  errors: [''] as string[],
  deleteContent: (_id: string | number) => {
    console.log(_id);
  },
  updateContent: (id: string, category: contentUpdateT) => {
    console.log(id, category);
  },
  getContent: (_id: string | number) => {
    console.log(_id);
  },
});

export const useContent = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('usePermission must be used within an PermissionsProvider');
  }

  return context;
};

const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [contentsData, setContentsData] = useState<contentT[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const callContents = async () => {
    try {
      const res = await getContentsRq();
      setContentsData(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (isAuthenticated) callContents();
  }, [isAuthenticated]);

  const saveContent = async (data: contentSaveT) => {
    try {
      const response = await createContentRq({
        name_theme: data.name_theme,
        url_image: data.url_image || '',
        url_video: data.url_video || '',
        credits: user?.username,
        content_text: data.content_text || '',
      });

      setContentsData([...contentsData, response.data]);
      return response;
    } catch (error: any) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  const deleteContent = async (_id: string | number) => {
    try {
      const response = await deleteContentRq(_id);
      setContentsData(contentsData.filter((content) => content._id !== _id));
      return response;
    } catch (error: any) {
      console.error(error);
    }
  };

  const updateContent = async (id: string, content: contentUpdateT) => {
    try {
      const response = await updateContentRq(id, content);
      callContents();
      return response;
    } catch (error: any) {
      console.error(error);
    }
  };

  const getContent = async (_id: string | number) => {
    const response = await getContentRq(_id);
    return response.data;
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timerError = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timerError);
    }
  }, [errors]);

  return (
    <ContentContext.Provider
      value={{
        contentsData,
        saveContent,
        errors,
        deleteContent,
        updateContent,
        getContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentProvider };

