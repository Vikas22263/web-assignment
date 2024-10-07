"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const serverConfig_1 = require("./config/serverConfig");
const config_1 = __importDefault(require("./config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = require("./routes/path");
const { PORT } = serverConfig_1.EnvVars;
const app = (0, express_1.default)();
(0, config_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(path_1.paths.Base, routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is runing on the PORT ${PORT}`);
});
