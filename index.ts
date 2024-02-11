import * as url from "url";
import * as http from "http";
// @ts-ignore
import * as yargs from "yargs";
import {launchEditor} from "./launchEditor";
import {getFile, editFile} from "./sourceFile";

const port = yargs.argv.p || yargs.argv.port || 3010;

const server = http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
    'Content-Type': 'text/html'
  };
  const {pathname, query} = url.parse(req.url!, true)
  try {

    switch (pathname) {
      case '/getSource': {
        const {file} = query;
        const source = getFile(String(file))
        res.writeHead(200, headers);
        res.end(JSON.stringify({source}));
        return;
      }
      case '/openEditor': {
        const {column, lineNumber, file} = query;
        launchEditor(String(file), Number(lineNumber), Number(column))
        res.writeHead(200, headers);
        res.end();
        break;
      }
      case '/editSource': {
        const {file, source} = query;
        editFile(String(file), String(source))
        res.writeHead(200, headers);
        res.end();
        break;
      }
      default: {
        res.writeHead(400, {'Content-Type': 'text/html'});
        res.end('Bad Request');
        return;
      }
    }
  } catch (e) {
    res.writeHead(500, headers);
    res.end();
  }finally {
    res.end();
  }
})

server.listen(port, () => {
  console.log(`React Code Finder Server running at http://localhost:${port}/`);
});
