const express = require('express')
const app = express()
const path = require('path')

const fs = require('fs');

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

//app.use(express.static('../client/build'));

app.get('/extensions', function (req, res) {
    const sourcePath = req.query.sourcePath;

    if (!sourcePath) {
        return res.status(400).json('Bad Request: params source path required');
    }

    if (!fs.existsSync(sourcePath)) {
        return res.status(400).json('Bad Request: path invalid');
    }

    const extensions = fs.readdirSync(sourcePath).map(f => path.extname(f));

    res.json(extensions);
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
