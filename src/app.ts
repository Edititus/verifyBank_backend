import * as dotenv from "dotenv"
dotenv.config();

import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import typeOrmConfig from "./type-orm.config";
const app = express();
const httpServer = http.createServer(app);
import { Context } from "./types/Context"
// import { pool } from "pg";


 const boot = async() => {
 
   const connection = await typeOrmConfig.initialize();
   
   const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      return {connection} 
      
    }
  }) 
  server.start().then(() => {
    server.applyMiddleware({ app });
  });

 httpServer.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
   
   process.on("SIGTERM", async() => {
     console.info("SIGTERM signal received.");
     console.log("Closing http server.");
       httpServer.close(() => {
         console.log("Http server closed.");
       });

       setTimeout( function () {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit(1); 
      });
   });
   
   return server;
}

boot()
export { boot }