/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from './axios';

// get all content
export const getContentsRq = () => axios.get('api/contents');

// get content by id
export const getContentRq = (_id: string | number) =>
  axios.get(`api/contents/${_id}`);

// create content
export const createContentRq = (content: any) =>
  axios.post('api/contents', content);

// update content
export const updateContentRq = (id: string, content: any) =>
  axios.put(`api/contents/${id}`, content);

// delete content
export const deleteContentRq = (_id: string | number) =>
  axios.delete(`api/contents/${_id}`);

// Get Category
export const uploadMediaContent = async (formdata: FormData)  =>
  axios.post(`api/contents/upload`, formdata , {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
