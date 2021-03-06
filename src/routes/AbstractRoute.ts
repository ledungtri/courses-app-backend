import { Express, Request, Response, Router } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export default abstract class AbstractRoute {
  protected router = Router();

  protected constructor(server: Express, private path: string) {
    this.setRoutes();
    server.use(`/api${this.path}`, this.router);
  }

  protected abstract setRoutes(): void;

  protected validateId(req: Request, res: Response, next: () => void) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(StatusCodes.BAD_REQUEST).json({error: `Invalid id: ${req.params.id}`});
    } else {
      next();
    }
  }

  protected validateEmptyBody(req: Request, res: Response, next: () => void) {
    const isEmpty = req.body || Object.keys(req.body).length === 0
    if (isEmpty) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "You must specify body." });
    } else {
      next();
    }
  }
}
