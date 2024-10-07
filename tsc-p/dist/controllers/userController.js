"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashBoardController = exports.loginController = exports.registerController = void 0;
const services_1 = require("../services");
const userServiceInstance = new services_1.userService();
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password } = req.body;
        console.log(fullname, email, password);
        const result = yield userServiceInstance.createUser({
            fullname,
            email,
            password,
        });
        if (result.success) {
            return res
                .status(201)
                .json({ message: "User registered successfully", user: result.user });
        }
        else {
            return res.status(400).json({ message: result.message });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield userServiceInstance.login({ email, password });
        if (!result.success) {
            return res
                .status(400)
                .send({ success: result.success, message: result.message });
        }
        res.cookie("token", result.data.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.loginController = loginController;
const dashBoardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        const result = yield userServiceInstance.getUserDetails(email);
        if (!result.success) {
            return res
                .status(400)
                .send({ success: result.success, message: result.message });
        }
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.dashBoardController = dashBoardController;
