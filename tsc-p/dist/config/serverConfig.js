"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.EnvVars = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY
};
