import express from 'express';
import dotenv from 'dotenv';
import DbConnection from './db/DbConnection';
import CoursesRoute from './routes/CoursesRoute';
import PeopleRoute from "./routes/PeopleRoute";
import MigrationRoute from "./migration/MigrationRoute";

dotenv.config();
const server = express();
DbConnection.connect().then(() => {
  const serverPort = process.env.PORT || 3000;
  server.use(express.json());
  // TODO Enable CORs

  const routers = [
    CoursesRoute,
    PeopleRoute,
    // MigrationRoute,
  ];
  routers.map((Router) => new Router(server));

  server.listen(serverPort, () => {
    console.log(`Server is listening on port ${serverPort}...`);
  });
});