/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import {
  createCategoryRq,
  deleteCategoryRq,
  getCategoriesRq,
  getCategoryRq,
  updateCategoryRq,
  uploadMediaCategory,
} from '../api/categories';
import { categoryT } from '../types/categoryT';
import { useAuth } from './AuthContext';

const CategoriesContext = createContext({
  categoriesData: [] as categoryT[],
  saveCategory: (data: categoryT, file?: File) => {
    console.log(data, file);
  },
  errors: [''] as string[],
  deleteCategory: (_id: string | number) => {
    console.log(_id);
  },
  updateCategory: (id: string, category: categoryT, file?: File) => {
    console.log(id, category, file);
  },
  getCategory: (_id: string | number) => {
    console.log(_id);
  },
});

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('usePermission must be used within an PermissionsProvider');
  }

  return context;
};

const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categoriesData, setCategoriesData] = useState<categoryT[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const callCategories = async () => {
    try {
      const res = await getCategoriesRq();
      console.log('RESPONSE ', res)
      setCategoriesData(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (isAuthenticated) callCategories();
  }, [isAuthenticated]);

  const saveCategory = async (data: categoryT, file?: File) => {
    try {
      const response = await createCategoryRq({
        _id: data._id,
        name: data.name,
        cover: data.cover,
        permissions: data.permissions,
      });
      
      // Si se creó correctamente, subimos la imagen si existe
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('id', String(response.data._id));
        
        await uploadMediaCategory(formData);
      }
  
      // Actualizamos el estado de las categorías
      setCategoriesData((prevCategories) => [...prevCategories, response.data]);
      callCategories(); // Refresca todas las categorías
      return response;
    } catch (error: any) {
      console.error('Error al guardar la categoría:', error);
      setErrors([error.response?.data?.message || 'Error en el servidor']);
    }
  };
  

  const uploadCategoryImage = async (id: string | number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", String(id));

    try {
      await uploadMediaCategory(formData);
      await callCategories(); // Refresca la lista de categorías después de la subida
    } catch (error: any) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al subir la imagen"]);
    }
  };

  const deleteCategory = async (_id: string | number) => {
    try {
      const response = await deleteCategoryRq(_id);
      setCategoriesData(
        categoriesData.filter((category) => category._id !== _id)
      );
      return response;
    } catch (error: any) {
      console.error(error);
    }
  };

  const updateCategory = async (id: string, category: categoryT, file?: File) => {
    try {
      const response = await updateCategoryRq(id, category);
      if (file) {
        await uploadCategoryImage(id, file);
      } else {
        callCategories(); // Refresca las categorías solo si no hay imagen
      }
      return response;
    } catch (error: any) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al actualizar categoría"]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timerError = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timerError);
    }
  }, [errors]);

  const getCategory = async (_id: string | number) => {
    const response = await getCategoryRq(_id);
    return response.data;
  };
  return (
    <CategoriesContext.Provider
      value={{
        categoriesData,
        saveCategory,
        errors,
        deleteCategory,
        updateCategory,
        getCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };

