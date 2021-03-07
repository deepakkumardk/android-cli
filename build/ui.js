"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUI = void 0;
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var initUI = function () {
    var title = chalk_1.default.green(figlet_1.default.textSync("Android  CLI"));
    console.log("\n\n", title, "\n\n");
};
exports.initUI = initUI;
