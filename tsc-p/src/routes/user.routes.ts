import { Router } from "express";
import { paths } from "./path";
import { dashBoardController, loginController, registerController } from "../controllers/userController";
import { userAuthCheck } from "../middlewares/auth/userMiddleware";


const route = Router();

route.post(paths.user.register.Post[0],registerController);
route.post(paths.user.login.Post[0],loginController);
route.get(paths.user.dashboard.Get[0],userAuthCheck,dashBoardController);

export default route;
