"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const path_1 = require("./path");
const route = (0, express_1.Router)();
route.use(path_1.paths.user.Base, user_routes_1.default);
exports.default = route;
