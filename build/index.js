#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var yargs_1 = __importDefault(require("yargs"));
var helpers_1 = require("yargs/helpers");
var clone_1 = require("./src/clone");
var projects_1 = require("./src/projects");
var questions_1 = require("./src/questions");
var ui_1 = require("./src/ui");
var program = new commander_1.Command();
var newAppInfo = {
    appName: "",
    projectName: "",
    packageName: "",
    minSdk: 21,
};
var runScript = function () { return __awaiter(void 0, void 0, void 0, function () {
    var argv, projectName, answers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                argv = yargs_1.default(helpers_1.hideBin(process.argv)).argv._;
                if (!argv[1]) {
                    console.error(chalk_1.default.red("Please enter a valid project name."));
                    return [2 /*return*/];
                }
                projectName = argv[1];
                ui_1.initUI();
                return [4 /*yield*/, questions_1.askQuestions(projectName)];
            case 1:
                answers = _a.sent();
                newAppInfo = {
                    appName: answers.appName,
                    projectName: projectName,
                    packageName: answers.packageName,
                    minSdk: answers.minSdk,
                };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, clone_1.cloneProject()];
            case 3:
                _a.sent();
                return [4 /*yield*/, projects_1.initProject(newAppInfo)];
            case 4:
                _a.sent();
                console.log(chalk_1.default.blue("Completed Successfully"));
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("error", error_1);
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var setupCommander = function () {
    program
        .option("-d, --debug", "Output extra logs")
        .option("--template <type>", "Add template path");
    program.parse(process.argv);
    var options = program.opts();
};
setupCommander();
runScript();
