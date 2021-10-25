import express from 'express';
import dotenv from 'dotenv';
const cors = require('cors');
import DbConnection from './db/DbConnection';
import CoursesRoute from './routes/CoursesRoute';
import PeopleRoute from "./routes/PeopleRoute";
import MigrationRoute from "./migration/MigrationRoute";
import { graphqlHTTP } from "express-graphql";
import RootSchema from "./graphql/RootSchema";

dotenv.config();
const server = express();
DbConnection.connect().then(() => {
  const serverPort = process.env.PORT || 3000;
  server.use(express.json());
  server.use(cors());
  server.use('/graphql', graphqlHTTP({ schema: RootSchema, graphiql: true }));

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