import { Express } from 'express';
import AbstractRoute from './AbstractRoute';
import PeopleController from "../controllers/PeopleController";

export default class PeopleRoute extends AbstractRoute {
  constructor(server: Express) {
    super(server, '/people');
  }

  protected setRoutes(): void {
    this.router.route('/')
      .get(PeopleController.list)
      .post(PeopleController.create);

    this.router.route('/:id')
      .get(PeopleController.getById)
      .put(PeopleController.update)
      .delete(PeopleController.delete);
  }
}
