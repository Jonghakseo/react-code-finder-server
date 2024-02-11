import * as fs from 'fs';
import * as path from 'path';

function editFile(file: string, source: string) {
  try {
    fs.writeFileSync(file, source);
  } catch (e) {
    console.error(e);
  }
}

function getFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error(e);
    return `${e}`;
  }
}

export {editFile, getFile};
