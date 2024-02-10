"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.editFile = void 0;
const fs = require("fs");
function editFile(file, source) {
    fs.writeFileSync(file, source);
}
exports.editFile = editFile;
function getFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}
exports.getFile = getFile;
