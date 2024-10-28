import axios from './axios';
import { categoryT } from '../types/categoryT';

// Get All Categories
export const getCategoriesRq = async () => axios.get('api/categories');

// Create Category
export const createCategoryRq = async (category: categoryT) =>{
  console.log(category)
  return axios.post('api/categories', category);
}

// Delete Category
export const deleteCategoryRq = async (_id: string | number) =>
  axios.delete(`api/categories/${_id}`);

// Update Category
export const updateCategoryRq = async (id: string, category: categoryT) =>
  axios.put(`api/categories/${id}`, category);

// Get Category
export const getCategoryRq = async (_id: string | number) =>
  axios.get(`api/categories/${_id}`);

// Upload Media Category
export const uploadMediaCategory = async (formdata: FormData)  =>
  axios.post(`api/categories/upload`, formdata , {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });