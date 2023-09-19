import { Request, Response, NextFunction } from "express";

export const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).render("404");
};

export const handleDevelopmentErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).render("error", { error: err });
};

export const handleProductionErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).render("error", { error: "Something went wrong!" });
};
