import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

import router from "./routes/route";
import {
  handleDevelopmentErrors,
  handleNotFound,
  handleProductionErrors,
} from "./middleware";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join("public")));

app.use("/", router);

if (process.env.NODE_ENV === "development") {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleDevelopmentErrors(err, req, res, next);
  });
}
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleProductionErrors(err, req, res, next);
});
app.use((req: Request, res: Response, next: NextFunction) => {
  handleNotFound(req, res, next);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
