import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";

import HeroRouter from "./routes/HeroRouter";

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();
    router.get("/", (_req, res, _next) => {
      res.json({
        message: "Hello world!",
      });
    });

    this.express.use("/", router);
    this.express.use("/api/v1/heroes", HeroRouter);
  }
}

export default new App().express;
