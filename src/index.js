const express = require('express')
const multer = require('multer')

const { PORT } = require('./config')

const app = express()

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/users'),
  filename: (req, file, cb) => cb(null, file.originalname),
})

const getUrl = nameFile => `name: ${nameFile} ${Date.now()}`

const uploadImage = (req, res) => {
  const { file } = req
  const url = getUrl(file.filename)

  file ? res.send(url) : res.send('Error upload')
}

app.use(express.static(__dirname))
app.use(multer({ storage: storageConfig }).single('filedata'))

app.use('/api/upload', uploadImage)

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}`)
})
