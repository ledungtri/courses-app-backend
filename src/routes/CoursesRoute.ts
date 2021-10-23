import { Express } from "express";
import AbstractRoute from './AbstractRoute';
import CoursesController from '../controllers/CoursesController';


export default class CoursesRoute extends AbstractRoute {
  constructor(server: Express) {
    super(server, '/courses');
  }

  protected setRoutes(): void {
    this.router.route('/')
      .get(CoursesController.list)
      .post(this.validateEmptyBody, CoursesController.create);

    this.router.route('/:id')
      .get(this.validateId, CoursesController.getById)
      .put(this.validateId, this.validateEmptyBody, CoursesController.update)
      .delete(this.validateId, CoursesController.delete);


    // this.router.route("/:id/course/")
    //   .post();
    //
    // this.router.route("/:id/course/:courseId")
    //   .put()
    //   .delete();
  }
}
