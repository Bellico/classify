const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

router.get('/check-path', function (req, res) {
    const sourcePath = req.query.sourcePath;

    if (!sourcePath) {
        return res.status(400).json('Bad Request: params source path required');
    }

    if (!fs.existsSync(sourcePath)) {
        return res.status(400).json('Bad Request: path invalid');
    }

    res.end();
})

router.get('/extensions', function (req, res) {
    const sourcePath = req.query.sourcePath;

    if (!sourcePath) {
        return res.status(400).json('Bad Request: params source path required');
    }

    if (!fs.existsSync(sourcePath)) {
        return res.status(400).json('Bad Request: path invalid');
    }


    fs.readdirSync(sourcePath).forEach(d => {
        console.log(fs.statSync(sourcePath + '\\' + d).isDirectory());
    })

    const extensions = fs.readdirSync(sourcePath)
        .filter(f => !fs.statSync(sourcePath + '\\' + f).isDirectory())
        .map(f => path.extname(f));

    res.json(extensions);
})


module.exports = router;



// const sourcePath = `D:\\Downloads\\classify_workspace\\Backgrounds`;
// const sourcePathFinal = `D:\\Downloads\\classify_workspace\\final`;

// fs.mkdir(sourcePathFinal, { recursive: true }, (err) => {
//     if (err) throw err;
// });

// fs.readdir(`D:\\Images\\Backgrounds`, (err, data) => {
//     console.log(err);
//     const d = data.filter(f => f.endsWith('.jpg'));

//     //fs.unlink().
//     d.forEach(d => {
//         fs.rename(`${sourcePath}\\${d}`, `${sourcePathFinal}\\${d}`, (err) => {
//             // console.log(err);
//             // console.log('Rename complete!');
//         })
//     });


// });
