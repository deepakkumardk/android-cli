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
exports.replacePackageName = exports.initProject = void 0;
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var replace_in_file_1 = require("replace-in-file");
var templateProject = "HelloWorld";
var templatePackageName = "com.example.helloworld";
var getProjectDir = function (projectName) {
    var currentDir = process.cwd() + "/" + projectName;
    return currentDir;
};
var initProject = function (_a) {
    var projectName = _a.projectName, packageName = _a.packageName, appName = _a.appName;
    return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_extra_1.default.rename(process.cwd() + "/android-template", getProjectDir(projectName))];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log("error occurs while initializing project", error_1);
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, replacePackageName({ projectName: projectName, packageName: packageName, appName: appName })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, renameFolders({ projectName: projectName, packageName: packageName, appName: appName })];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.initProject = initProject;
var replacePackageName = function (_a) {
    var projectName = _a.projectName, packageName = _a.packageName, appName = _a.appName;
    return __awaiter(void 0, void 0, void 0, function () {
        var currentDir, files, options, projectNameOptions, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    currentDir = getProjectDir(projectName);
                    files = [currentDir + "/**"];
                    options = {
                        files: files,
                        from: /com.example.helloworld/g,
                        to: packageName,
                        countMatches: true,
                    };
                    projectNameOptions = {
                        files: files,
                        from: /HelloWorld/g,
                        to: appName,
                        countMatches: true,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, replace_in_file_1.replaceInFile(options)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, replace_in_file_1.replaceInFile(projectNameOptions)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.log(chalk_1.default.red("Error while initializing project " + error_2));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.replacePackageName = replacePackageName;
/**
 *
 * @param param0 {{
 * projectName: string,
 * packageName: string,
 * }}
 */
var renameFolders = function (_a) {
    var projectName = _a.projectName, packageName = _a.packageName;
    return __awaiter(void 0, void 0, void 0, function () {
        var oldPath, newPath;
        return __generator(this, function (_b) {
            oldPath = templatePackageName.split(".").join("/");
            newPath = packageName.split(".").join("/");
            oldPath = oldPath.substring(0, oldPath.lastIndexOf("/"));
            newPath = newPath.substring(0, newPath.lastIndexOf("/"));
            //First rename the com.example packages
            renameOneFolder({
                projectName: projectName,
                fileName: "test",
                oldPath: oldPath,
                newPath: newPath,
            });
            renameOneFolder({
                projectName: projectName,
                fileName: "androidTest",
                oldPath: oldPath,
                newPath: newPath,
            });
            renameOneFolder({
                projectName: projectName,
                fileName: "main",
                oldPath: oldPath,
                newPath: newPath,
            });
            oldPath = newPath + "/helloworld";
            newPath = packageName.split(".").join("/");
            //Then rename the com.new.helloworld packages
            renameOneFolder({ projectName: projectName, fileName: "test", oldPath: oldPath, newPath: newPath });
            renameOneFolder({
                projectName: projectName,
                fileName: "androidTest",
                oldPath: oldPath,
                newPath: newPath,
            });
            renameOneFolder({ projectName: projectName, fileName: "main", oldPath: oldPath, newPath: newPath });
            return [2 /*return*/];
        });
    });
};
var renameOneFolder = function (_a) {
    var projectName = _a.projectName, fileName = _a.fileName, oldPath = _a.oldPath, newPath = _a.newPath;
    return __awaiter(void 0, void 0, void 0, function () {
        var currentDir, newDir, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    currentDir = getProjectDir(projectName) + "/app/src/" + fileName + "/java/" + oldPath;
                    newDir = getProjectDir(projectName) + "/app/src/" + fileName + "/java/" + newPath;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_extra_1.default.rename(currentDir, newDir)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.log(chalk_1.default.red("Error while initializing project " + error_3));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};