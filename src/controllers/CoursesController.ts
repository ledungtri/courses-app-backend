import { Request, Response } from 'express';
import CoursesService from "../services/CoursesService";
import { StatusCodes } from "http-status-codes";

export default class CoursesController {
  public static async list(req: Request, res: Response): Promise<void> {
    const result = await CoursesService.getCourses(Number(req.query.year));
    res.status(StatusCodes.OK).json({ data: result });
  }

  public static async create(req: Request, res: Response): Promise<void> {
    res.send('create');
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    const result = await CoursesService.getCourseById(req.params.id);
    if (result) {
      res.status(StatusCodes.OK).json({ data: result });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ success: false, error: "No course found." });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    res.send('update');
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    const result = await CoursesService.deleteCourse(req.params.id);
    if (result) {
      res.status(StatusCodes.OK).json({ success: true, data: result });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ success: false, error: "No course found." });
    }
  }
}
