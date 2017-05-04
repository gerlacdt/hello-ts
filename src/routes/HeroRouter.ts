import { NextFunction, Request, Response, Router } from "express";

// tslint:disable-next-line
const heroes = require("../../data");

export class HeroRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAll(_req: Request, res: Response, _next: NextFunction) {
    res.json(heroes);
  }

  public getOne(req: Request, res: Response, _next: NextFunction) {
    const query = parseInt(req.params.id, 10);
    const hero = heroes.find((h: any) => h.id === query);
    if (hero) {
      res.status(200)
        .json({
          message: "Success",
          status: res.status,
          hero,
        });
    } else {
      res.status(404)
        .json({
          message: `No hero found with the given id: ${query}`,
        });
    }
  }

  public init() {
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getOne);
  }
}

const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;
