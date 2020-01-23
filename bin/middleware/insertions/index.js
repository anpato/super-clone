"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
exports.InsertOAuthToken = function (token) {
    child_process_1.exec("touch .env && echo \"GITHUB_TOKEN=" + token + "\" >> .env", function (err) {
        if (err)
            throw err;
    });
};
