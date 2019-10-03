var express = require('express')
var app = express()

app.set("view engine", "ejs")
app.use('/static', express.static('public'))

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // should be a very very random string
        let ext = file.originalname.split('.')[1]
        let filename = file.fieldname + '-' + Date.now() + '.' + ext
        cb(null, filename)
    }
})


var singleupload = multer({ storage: storage }).single('file')
var multipleupload = multer({ storage: storage }).array('file')

app.get('/', (req, res) => {
    res.render('index', { fileUploaded: false })
})

app.post('/', singleupload, (req, res) => {
    res.render('index', { fileUploaded: true })
})

app.post('/multiple', multipleupload, (req, res) => {
    res.render('index', { fileUploaded: true })
})

app.listen(3000, () => {
    console.log("Server is running")
})