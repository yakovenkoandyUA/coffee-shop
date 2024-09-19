import express, { json, urlencoded } from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'elitejapanimports@gmail.com',
		pass: 'ryra cstk fpmg jfah',
	},
})

const app = express()
dotenv.config()
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())
// Serve static files
app.use(express.static('./client/'))

export const sendEmail = async (req, res) => {
	const { name, lastName, desc, mail, toAddress } = req.body
	console.log(req.body);
	const info = await transporter.sendMail({
		to: mail, // list of receivers
		subject: `Замовлення`, // Subject line
		html: `Вітаю шановний ${name} ${lastName}`, // html body
	})

	// console.log('Message sent: %s', info.messageId)
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	res.status(200).send(info.messageId)
}

// const getStart = async (req, res) => {
// 	const __dirname = path.resolve()
// 	res.sendFile(__dirname + '/index.html')
// }

const mailRoutes = express.Router()
mailRoutes.post('/', sendEmail)

// const homeRoutes = express.Router()
// homeRoutes.get('/', getStart)
//handling client routes
app.get('*', (req, res) => {
	const __dirname = path.resolve()
	res.sendFile(path.join(__dirname, './client/index.html'))
})

// app.use('/', homeRoutes)
app.use('/api/mail', mailRoutes)

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
