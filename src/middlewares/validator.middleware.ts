import express from 'express';
export const validateSchema =
  (schema: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res
        .status(400)
        .json(error.errors.map((err: any) => err.path[0] + ' ' +  err.message));
    }
  };

