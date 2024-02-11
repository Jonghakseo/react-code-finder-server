"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const http = require("http");
// @ts-ignore
const yargs = require("yargs");
const launchEditor_1 = require("./launchEditor");
const sourceFile_1 = require("./sourceFile");
const port = yargs.argv.p || yargs.argv.port || 3010;
const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
        /** add other headers as per requirement */
        'Content-Type': 'text/html'
    };
    const { pathname, query } = url.parse(req.url, true);
    try {
        switch (pathname) {
            case '/getSource': {
                const { file } = query;
                const source = (0, sourceFile_1.getFile)(String(file));
                res.writeHead(200, headers);
                res.end(JSON.stringify({ source }));
                return;
            }
            case '/openEditor': {
                const { column, lineNumber, file } = query;
                (0, launchEditor_1.launchEditor)(String(file), Number(lineNumber), Number(column));
                res.writeHead(200, headers);
                res.end();
                break;
            }
            case '/editSource': {
                const { file, source } = query;
                (0, sourceFile_1.editFile)(String(file), String(source));
                res.writeHead(200, headers);
                res.end();
                break;
            }
            default: {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('Bad Request');
                return;
            }
        }
    }
    catch (e) {
        res.writeHead(500, headers);
        res.end();
    }
    finally {
        res.end();
    }
});
server.listen(port, () => {
    console.log(`React Code Finder Server running at http://localhost:${port}/`);
});
