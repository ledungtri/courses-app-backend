import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import PeopleService from "../services/PeopleService";

export default class PeopleController {
  public static async list(req: Request, res: Response): Promise<void> {
    const result = await PeopleService.getPeople(Number(req.query.year));
    res.status(StatusCodes.OK).json({ data: result });
  }

  public static async create(req: Request, res: Response): Promise<void> {
    res.send('create');
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    const result = await PeopleService.getPersonById(req.params.id);
    if (result) {
      res.status(StatusCodes.OK).json({ data: result });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ success: false, error: "No person found." });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    res.send('update');
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    const result = await PeopleService.deletePerson(req.params.id);
    if (result) {
      res.status(StatusCodes.OK).json({ success: true, data: result });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ success: false, error: "No person found." });
    }
  }
}
