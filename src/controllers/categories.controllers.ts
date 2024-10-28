import express from 'express';
import Category from '../models/category.model';
import Permission from '../models/permission.model';

const getCategories = async (_req: express.Request, res: express.Response) => {
  const categories = await Category.find();
  return res.json(categories);
};

const getCategory = async (req: express.Request, res: express.Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  return res.json(category);
};
const postCategories = async (req: express.Request, res: express.Response) => {
  try {
    const { name, permissions, cover } = req.body;
    console.log({ name, permissions, cover })
    const allPermissions = await Permission.find({
      name: { $in: permissions },
    });
    if (!allPermissions)
      return res.status(404).json({ message: 'Permission is empty' });
    const findPermissions = await allPermissions.filter((permission) => {
      return (
        permission.name === permissions[0] ||
        permission.name === permissions[1] ||
        permission.name === permissions[2]
      );
    });
    if (!findPermissions)
      return res.status(404).json({ message: 'Permission not exist in DB' });
    if (!name) {
      return res.status(404).json({ message: 'Name not found' });
    }
    // if (!cover) {
    //   return res.status(404).json({ message: 'Cover not found' });
    // }

    const newCategory = new Category({
      name,
      cover: '',
      permissions: findPermissions.map((permission) => permission.name),
    });
    console.log({newCategory})
    const categorySaved = await newCategory.save();
    console.log({categorySaved})
    if (!categorySaved) return res.status(500).json({ message: 'Error' });
    return res.json(categorySaved);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(401).json(['The category already exists']);
    }
  }
};
const putCategories = async (req: express.Request, res: express.Response) => {
  const { cover, ...body } = req.body
  const category = await Category.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  if (!category) return res.status(404).json({ message: 'Category not found' });
  return res.json(category);
};
const deleteCategories = async (
  req: express.Request,
  res: express.Response
) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  return res.sendStatus(204);
};
export {
  getCategories,
  postCategories,
  putCategories,
  deleteCategories,
  getCategory,
};

