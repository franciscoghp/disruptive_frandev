import axios from './axios';

// Get All Permissions
export const getPermissionsRq = () => axios.get('api/permissions');
