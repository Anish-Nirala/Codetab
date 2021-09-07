const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const Code = require('./models/Code')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/codebin", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

app.get('/', (req, res) => {
    const code = `Welcome to CodeTab!

An online code sharing platform that allows user to upload and share code online.
Use the new button above to create a new file to share with others.
Designed and created by Anish Kumar Nirala.`
    res.render('code-display', { code, language: 'plaintext' })
})

app.get('/code', (req, res) => {
    res.render("new")
})

app.post('/', async (req, res) => {
    const value = req.body.value;
    try {
        const code = await Code.create({ value })
        res.redirect(`/${code.id}`)
    } catch (e) {
        res.render("new", { value })
    }
})

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const code = await Code.findById(id);
        res.render('code-display', { code: code.value, id })
    } catch (e) {
        res.redirect('/')
    }
})
app.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const code = await Code.findById(id);
        res.render('new', { value: code.value })
    } catch (e) {
        res.redirect(`/${id}`)
    }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening...");
})