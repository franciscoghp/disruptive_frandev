import express from 'express';
import Content from '../models/content.model';
import Category from '../models/category.model';

// Get all contents
export const getContents = async (
  _req: express.Request,
  res: express.Response
) => {
  const contents = await Content.find();
  if (!contents) return res.status(404).json({ message: 'Content not found' });
  return res.json(contents);
};

// Get one content
export const getContent = async (
  req: express.Request,
  res: express.Response
) => {
  const content = await Content.findById(req.params.id);
  if (!content) return res.status(404).json({ message: 'Content not found' });
  return res.json(content);
};

// Create new content
export const postContent = async (
  req: express.Request,
  res: express.Response
) => {
  const { name_theme, url_image, url_video, content_text, credits } = req.body;
  const allContents = await Category.find({ name: { $in: name_theme } });
  if (!allContents)
    return res.status(404).json({ message: 'Category not found' });

  const findContents = await allContents.filter((content) => {
    return content.name === name_theme;
  });
  if (!findContents)
    return res.status(404).json({ message: 'Category not exist in DB' });

  const newContent = new Content({
    name_theme,
    url_image,
    url_video,
    content_text,
    credits,
  });
  const contentSaved = await newContent.save();
  if (!contentSaved) return res.status(500).json({ message: 'Error' });
  return res.json(contentSaved);
};

// Update content
export const putContent = async (
  req: express.Request,
  res: express.Response
) => {
  const { url_image, ...body} = req.body;
  const content = await Content.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  if (!content) return res.status(404).json({ message: 'Content not found' });
  return res.json(content);
};

// Delete content
export const deleteContent = async (
  req: express.Request,
  res: express.Response
) => {
  const content = await Content.findByIdAndDelete(req.params.id);
  if (!content) return res.status(404).json({ message: 'Content not found' });
  return res.sendStatus(204);
};

