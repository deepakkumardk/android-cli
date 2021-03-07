"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestions = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var askQuestions = function (projectName) {
    var questions = [
        {
            name: "appName",
            type: "input",
            message: "App Name",
            default: projectName,
            validate: function (value) {
                if (value)
                    return true;
                else
                    return "Please enter a valid app name";
            },
        },
        {
            name: "packageName",
            type: "input",
            message: "Package Name",
            default: "com.example." + projectName,
            validate: function (value) {
                if (value)
                    return true;
                else
                    return "Please enter a valid package name";
            },
        },
        {
            name: "minSdk",
            type: "input",
            message: "Minimum SDK",
            default: 21,
            validate: function (value) {
                var error = "Please enter a valid minimum SDK between 21 & 30";
                var sdk = parseInt(value);
                if (!sdk)
                    return error;
                else if (sdk > 20 && sdk < 31)
                    return true;
                else
                    return error;
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
exports.askQuestions = askQuestions;
