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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serverConfig_1 = require("../../config/serverConfig");
const { SECRET_KEY } = serverConfig_1.EnvVars;
if (!SECRET_KEY) {
    throw new Error("JWT key is not defined");
}
const userAuthCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies["Bearer"];
        const authHeader = req.header("Authorization");
        let token = null;
        if (accessToken) {
            token = accessToken;
        }
        else if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        if (!token) {
            return res.status(400).send({ success: false, message: "Invalid Token" });
        }
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).send({ success: false, message: "Forbidden" });
            }
            req.user = decoded;
            if (!decoded.email) {
                return res
                    .status(400)
                    .send({ success: false, message: "Unauthorized" });
            }
            next();
        });
    }
    catch (error) {
        console.error("Error in adminAuthCheck middleware", error);
        return res
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
    }
});
exports.userAuthCheck = userAuthCheck;
