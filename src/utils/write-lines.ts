import * as fs from 'fs';

export function writeLines(path, array) {
    return new Promise((resolve, reject) => {
        let writeStream = fs.createWriteStream(path);

        array.forEach(element => {
            writeStream.write(element + '\n');
        });

        writeStream.end();
        writeStream.on('finish', () => resolve(array));
        writeStream.on('error', () => reject);
    });
}