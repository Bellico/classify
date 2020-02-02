const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

var classifyService = require('../services/classify-service');

router.get('/checked-path', function (req, res) {
    const sourcePath = req.query.sourcePath;

    const result = classifyService.checkPath(sourcePath);

    if (!result.checked) {
        return res.status(400).json(result);
    }

    res.json(result);
})

router.get('/extensions', async function (req, res) {
    const sourcePath = req.query.sourcePath;

    const result = classifyService.checkPath(sourcePath);

    if (!result.checked) {
        return res.status(400).json(result);
    }

    const files = fs.readdirSync(sourcePath)
        .filter(file => !fs.statSync(sourcePath + '\\' + file).isDirectory());

    const extensions = [...new Set(files.map(file => path.extname(file)))].sort();
    const index = extensions.indexOf("");

    if (index !== -1) {
        extensions.splice(index, 1);
    }

    await classifyService.sleep(500);

    res.json({
        countFiles: files.length,
        extensions
    });
})

router.post('/rule', async function (req, res) {
    const resultCheck = classifyService.checkRule(req.body);

    await classifyService.sleep(1000);

    if (!resultCheck.success) {
        return res.status(400).json(resultCheck);
    }

    const { action } = req.body;
    let resultAction;

    if (action === 'move') {
        resultAction = classifyService.doMoveAction(req.body)
    }

    if (action === 'deleted') {
        resultAction = classifyService.doDeletedAction(req.body)
    }

    if (!resultAction.success) {
        res.status(500).json(resultAction);
    }

    res.json(resultAction);
})


module.exports = router;
