"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.editFile = void 0;
const fs = require("fs");
function editFile(file, source) {
    try {
        fs.writeFileSync(file, source);
    }
    catch (e) {
        console.error(e);
    }
}
exports.editFile = editFile;
function getFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch (e) {
        console.error(e);
        return `${e}`;
    }
}
exports.getFile = getFile;
