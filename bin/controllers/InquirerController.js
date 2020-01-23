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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
var child_process_1 = require("child_process");
var axios_1 = require("axios");
var env_1 = require("../env");
var InquirerController = /** @class */ (function () {
    function InquirerController(prompt, prompts) {
        var _this = this;
        this.prompt = prompt;
        this.prompts = prompts;
        this.writeTokenToEnv = function (token, username) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                fs_1.writeFile(process.cwd() + "/./.env", "GITHUB_TOKEN=" + token + " \n GITHUB_USERNAME=" + username, function (err) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err)
                                    throw err;
                                return [4 /*yield*/, this.fetchRepos()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.fetchRepos = function () { return __awaiter(_this, void 0, void 0, function () {
            var resp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get("https://git.generalassemb.ly/api/v3/users/" + env_1.GITHUB_USERNAME + "/repos?per_page=300", {
                                headers: {
                                    Authorization: "token " + env_1.GITHUB_TOKEN
                                }
                            })];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, this.createRepoFolder()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.cloneRepos(resp.data)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.cloneRepos = function (repos) { return __awaiter(_this, void 0, void 0, function () {
            var incrementor;
            var _this = this;
            return __generator(this, function (_a) {
                incrementor = repos.length;
                repos.forEach(function (repo) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.exec("cd ./repos && git clone " + repo.clone_url, function (err) {
                                    if (err)
                                        return;
                                    incrementor--;
                                })];
                            case 1:
                                _a.sent();
                                if (incrementor === 0)
                                    return [2 /*return*/, process.exit()];
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.createRepoFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                fs_1.mkdir(process.cwd() + "/./repos", function (err) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err)
                                    return [2 /*return*/];
                                return [4 /*yield*/, this.fetchRepos()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.intializePrompt = function () { return __awaiter(_this, void 0, void 0, function () {
            var answers, token, username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!env_1.GITHUB_TOKEN && !env_1.GITHUB_USERNAME)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prompt(this.prompts)];
                    case 1:
                        answers = _a.sent();
                        token = answers.token, username = answers.username;
                        this.writeTokenToEnv(token, username);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.fetchRepos()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.prompt = prompt;
        this.prompts = prompts;
        // this.githubType = ''
        this.exec = util_1.promisify(child_process_1.exec);
    }
    return InquirerController;
}());
exports.default = InquirerController;
