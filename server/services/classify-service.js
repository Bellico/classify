
const fs = require('fs');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function checkPath(path) {
    if (!path) {
        return { checked: false, error: 'Bad Request: params source path required' };
    }

    if (!fs.existsSync(path)) {
        return { checked: false, error: 'Bad Request: path invalid' };
    }

    return ({ checked: true });
}

function checkRule({ action, sourcePath, targetPath, fileTypes }) {
    const resultCheck = checkPath(sourcePath);

    if (!resultCheck.checked) {
        return { success: false, error: resultCheck.error };
    }

    if (fileTypes.length == 0) {
        return { success: false, error: 'Bad Request: no file type asked' };
    }

    if (!['move', 'deleted'].includes(action)) {
        return { success: false, error: 'Bad Request: action unrecognized' };
    }

    if (action === 'move' && !targetPath) {
        return { success: false, error: 'Bad Request: targetPath require for move action' };
    }

    if (action === 'move' && targetPath === sourcePath) {
        return {
            success: false, error: 'Bad Request: targetPath and sourcePath can\'t be the same'
        };
    }

    return { success: true };
}

function getFilesMatches(sourcePath, fileTypes) {
    return fs.readdirSync(sourcePath)
        .filter(file => fileTypes
            .some(fileType => file.endsWith(fileType)));
}

function doMoveAction({ sourcePath, targetPath, fileTypes }) {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }

    const files = getFilesMatches(sourcePath, fileTypes);

    files.forEach(file => {
        fs.rename(`${sourcePath}\\${file}`, `${targetPath}\\${file}`, (error) => {
            if (error) {
                return { success: false, error };
            }
        });
    });

    return { success: true };
}

function doDeletedAction({ sourcePath, fileTypes }) {
    const files = getFilesMatches(sourcePath, fileTypes);

    files.forEach(file => {
        fs.unlink(`${sourcePath}\\${file}`, (error) => {
            if (error) {
                return { success: false, error };
            }
        });
    });

    return { success: true };
}


module.exports = { sleep, checkPath, checkRule, doMoveAction, doDeletedAction };
