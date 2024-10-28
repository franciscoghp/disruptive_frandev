import formidable from 'formidable';
import path from 'path';
import express from 'express';
import Category from '../models/category.model';
import Content from '../models/content.model';
import { promises as fs } from 'fs';

const targetPath = path.join(process.cwd(), `./src/public/uploads/`);
export const uploadMediaCategory = async (req: express.Request, res: express.Response)=>  {
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }
    const form = formidable({
      uploadDir: targetPath,   // Especifica la ruta de subida
      keepExtensions: true,    // Mantiene las extensiones originales
      multiples: false         // Solo un archivo por carga
    });
    try {
      form.parse(req, async (err, fields: any, files) => {
        if(err)
          throw new Error(err);
        const file = files.file as any
        if(!file)
          return res.status(400).json({message: 'missing file'});
  
        const tempPath = file[0].filepath;

        await fs.readFile(tempPath)
        const fileName = path.basename(tempPath);
        const category = await updatePhotoCategory(fields.id[0], fileName );
        return res.status(200).json(category)
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
}

export const uploadMediaContent = async (req: express.Request, res: express.Response)=>  {
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }
    const form = formidable({
      uploadDir: targetPath,   // Especifica la ruta de subida
      keepExtensions: true,    // Mantiene las extensiones originales
      multiples: false         // Solo un archivo por carga
    });
    try {
      form.parse(req, async (err, fields: any, files) => {
        if(err)
          throw new Error(err);
        const file = files.file as any
        if(!file)
          return res.status(400).json({message: 'missing file'});
  
        const tempPath = file[0].filepath;

        await fs.readFile(tempPath)
        const fileName = path.basename(tempPath);
        const content = await updatePhotoContent(fields.id[0], fileName );
        return res.status(200).json(content)
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
}

async function updatePhotoCategory(id: string, cover: any) {

  let category: any = await Category.findById(id);
  category.cover = cover
  const res = await Category.findByIdAndUpdate( id, category, {
    new: true,
  });
  return res
}
async function updatePhotoContent(id: string, url_image: any) {
  let content: any = await Content.findById(id);
  content.url_image = url_image
  const res = await Content.findByIdAndUpdate( id, content, {
    new: true,
  });
  return res
}