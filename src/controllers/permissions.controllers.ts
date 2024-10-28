import express from 'express';
import Permission from '../models/permission.model';

const getPermissions = async (_req: express.Request, res: express.Response) => {
  const permissions = await Permission.find();
  return res.json(permissions);
};

const postPermissions = async (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  const newPermission = new Permission({
    name,
  });
  const permissionSaved = await newPermission.save();
  if (!permissionSaved) return res.status(500).json({ message: 'Error' });
  return res.json(permissionSaved);
};

const putPermissions = async (req: express.Request, res: express.Response) => {
  const permission = await Permission.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!permission)
    return res.status(404).json({ message: 'Permission not found' });
  return res.json(permission);
};

const deletePermissions = async (
  req: express.Request,
  res: express.Response
) => {
  const permission = await Permission.findByIdAndDelete(req.params.id);
  if (!permission)
    return res.status(404).json({ message: 'Permission not found' });
  return res.sendStatus(204);
};

export { getPermissions, postPermissions, putPermissions, deletePermissions };

