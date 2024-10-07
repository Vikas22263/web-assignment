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
const usermodel_1 = __importDefault(require("../models/usermodel"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserRepository {
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield usermodel_1.default.create(data);
                return response;
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    throw new Error(Object.values(error.errors)
                        .map((err) => err.message)
                        .join(", "));
                }
                throw new Error("error occurred while registering the user");
            }
        });
    }
    isUserAlreadyPresent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usermodel_1.default.findOne({ email });
                if (result) {
                    return { success: true, data: result };
                }
                return { success: false, data: null };
            }
            catch (error) {
                throw new Error("error occurred while registering the user");
            }
        });
    }
}
exports.default = UserRepository;
