import { Request, Response } from 'express';
import MigrationService from './MigrationService';

export default class MigrationController {
  public static async migrateCourses(req: Request, res: Response): Promise<void> {
    await MigrationService.migrateCourses();
    res.send('migrateCourses done');
  }

  public static async migrateTeachers(req: Request, res: Response): Promise<void> {
    await MigrationService.migrateTeachers();
    res.send('migrateTeachers done');
  }

  public static async migrateStudents(req: Request, res: Response): Promise<void> {
    await MigrationService.migrateStudents();
    res.send('migrateStudents done');
  }

  public static async migrateAttendances(req: Request, res: Response): Promise<void> {
    await MigrationService.migrateAttendances();
    res.send('migrateAttendances done');
  }

  public static async migrateInstructions(req: Request, res: Response): Promise<void> {
    await MigrationService.migrateInstructions();
    res.send('migrateInstructions done');
  }

  public static json(req: Request, res: Response): void {
    MigrationService.json();
    res.send('json done');
  }
}
