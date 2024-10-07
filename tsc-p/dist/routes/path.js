"use strict";
/*


All path go here

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
exports.paths = {
    Base: "/api/v1",
    user: {
        Base: "/user",
        register: {
            Post: ["/register"],
        },
        login: {
            Post: ["/login"],
        },
        dashboard: {
            Get: ["/dashboard"]
        }
    },
};
