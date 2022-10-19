const fs = require('fs')
const path = require('path')

function dirTree(startingDirPath) {
    let maxDepth = 0;
    let dirTree = '';

    function recursiveDirWalker(dirPath, currentDepth) {
        const dirFiles = fs.readdirSync(dirPath);
        currentDepth++;
        for (const file of dirFiles) {
            const filePath = path.join(dirPath, file);
            const isDir = path.extname(filePath) === '' && fs.statSync(filePath).isDirectory();

            if (isDir && filePath) {
                recursiveDirWalker(filePath, currentDepth);
                if (fs.readdirSync(filePath).length === 0) {
                    dirTree += `./${filePath}\n`;
                }
            } else {
                dirTree += `./${filePath}\n`;
            }
        }


        if (currentDepth > maxDepth) {
            maxDepth = currentDepth;
        }


    }

    recursiveDirWalker(startingDirPath, -1)
    console.log(dirTree, maxDepth)

}

dirTree('./')