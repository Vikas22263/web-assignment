import { Router } from "express";
import userRoutes from "./user.routes";
import { paths } from "./path";

const route = Router();

route.use(paths.user.Base, userRoutes);

export default route;
