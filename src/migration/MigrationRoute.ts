import { Express } from 'express';
import AbstractRoute from '../routes/AbstractRoute';
import MigrationController from './MigrationController';

export default class MigrationRoute extends AbstractRoute {
  constructor(server: Express) {
    super(server, '/migration');
  }

  protected setRoutes(): void {
    this.router.route('/courses')
      .get(MigrationController.migrateCourses);

    this.router.route('/students')
      .get(MigrationController.migrateStudents);

    this.router.route('/teachers')
      .get(MigrationController.migrateTeachers);

    this.router.route('/attendances')
      .get(MigrationController.migrateAttendances);

    this.router.route('/instructions')
      .get(MigrationController.migrateInstructions);

    this.router.route('/json')
      .get(MigrationController.json);
  }
}
