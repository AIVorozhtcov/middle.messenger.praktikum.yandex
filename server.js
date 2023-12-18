import express from 'express'

const app = express()
const PORT = 3000

app.use(express.static('./dist'))

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`)
})
