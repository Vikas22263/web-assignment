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
const repository_1 = require("../repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serverConfig_1 = require("./../config/serverConfig");
class userService {
    constructor() {
        this.userRepo = new repository_1.userRepository();
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUserPresnt = yield this.userRepo.isUserAlreadyPresent(data.email);
                if (!isUserPresnt.success) {
                    const createdUser = yield this.userRepo.registerUser(data);
                    return { success: true, user: createdUser };
                }
                else {
                    return { success: false, message: "User already exists" };
                }
            }
            catch (error) {
                return { success: false, message: error.message || "An error occurred" };
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUserPresnt = yield this.userRepo.isUserAlreadyPresent(data.email);
                if (!isUserPresnt) {
                    return { success: false, message: "User Not exists please register" };
                }
                const isMatch = yield bcrypt_1.default.compare(data.password, isUserPresnt.data.password);
                if (!isMatch) {
                    return { success: false, message: "Incorrect password" };
                }
                const { email, fullname } = isUserPresnt.data;
                const Token = this.createToken({ email, fullname });
                return {
                    success: true,
                    message: "Login success",
                    data: { email, fullname, accessToken: Token },
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createToken(payload) {
        const expiresIn = "30d";
        const token = jsonwebtoken_1.default.sign(payload, serverConfig_1.EnvVars.SECRET_KEY, { expiresIn });
        return token;
    }
    getUserDetails(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUserPresent = yield this.userRepo.isUserAlreadyPresent(email);
                if (!isUserPresent.success) {
                    return { success: false, message: "User does not exist, please register" };
                }
                const { email: userEmail, fullname } = isUserPresent.data;
                return {
                    success: true,
                    message: "User details fetched successfully",
                    data: { email: userEmail, fullname },
                };
            }
            catch (error) {
                return { success: false, message: "An error occurred while fetching user details" };
            }
        });
    }
}
exports.default = userService;
