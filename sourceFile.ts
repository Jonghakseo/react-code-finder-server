
import * as fs from 'fs';
import * as path from 'path';

function editFile(file: string, source: string) {
  fs.writeFileSync(file, source);
}

function getFile(filePath:string) {
  return fs.readFileSync(filePath, 'utf8');
}

export { editFile, getFile };
