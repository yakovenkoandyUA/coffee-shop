import express, { json, urlencoded } from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'elitejapanimports@gmail.com',
		pass: 'iast rpor bzee eglo',
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
	const { name, lastName, desc, mail, toAddress, storage } = req.body
	const info = await transporter.sendMail({
		to: mail, // list of receivers
		subject: `Замовлення`, // Subject line
		html: `Вітаю шановний/на ${name} ${lastName}, ваше замовлення прийнято в роботу та буде відправлено на протязі декількох днів. Дякую. що обрали саме нас. Гарного дня!
		`, // html body
	})
	let str = ''
	// storage.forEach(i => {
	// 	str += `<p>${i.title}</p><span> ${i.id}</span>`
	// })

	// const info1 = await transporter.sendMail({
	// 	to: 'ahri123@ukr.net', // list of receivers
	// 	subject: `Замовлення`, // Subject line
	// 	html: str, // html body
	// })

	// console.log('Message sent: %s', info.messageId)
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	res.status(200).send({ info: info.messageId })
}
export const sendEmail1 = async (req, res) => {
	const { name, lastName, desc, mail, toAddress, storage } = req.body
	let str = ''
	storage.forEach(i => {
		str += `<p>${i.title}</p><span> ${i.id}</span>`
	})

	const info = await transporter.sendMail({
		to: 'elitejapanimports1@gmail.com', // list of receivers
		subject: `Замовлення`, // Subject line
		html: str, // html body
	})

	// console.log('Message sent: %s', info.messageId)
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	res.status(200).send({ info: info.messageId })
}

// const getStart = async (req, res) => {
// 	const __dirname = path.resolve()
// 	res.sendFile(__dirname + '/index.html')
// }

const mailRoutes = express.Router()
mailRoutes.post('/', sendEmail)
mailRoutes.post('/admin', sendEmail1)

const taskSchema = new mongoose.Schema({
	lastName: String,
	mail: String,
	name: String,
	phone: String,
	storage: [{
		id: String,
		imgSrc: String,
		title: String,
		descr: String,
		qty: Number,
	}],
	completed: Boolean,
})

// Create a model for Task based on the schema
const Task = mongoose.model('Task', taskSchema)

// Define a route to get all tasks
const tasksRoutes = express.Router()
tasksRoutes.get('/', getAllTasks)
tasksRoutes.post('/', addTasks)
async function getAllTasks(req, res) {
	// res.send('hello')
	try {
		const tasksAll = await Task.find() // Fetch all tasks from the collection
		res.send(tasksAll) // Send tasks as JSON response
	} catch (err) {
		res.status(400).send({ message: 'Error fetching tasks' })
	}
}
// Route to add a new task (POST /tasks)
async function addTasks(req, res) {
	try {
		const { lastName, mail, name, phone, storage, completed } = req.body // Extract data from request body
		// Create a new task
		const newTask = new Task({
			lastName,
			mail,
			name,
			phone,
			storage,
			completed,
		})

		// Save the task to the database
		const savedTask = await newTask.save()

		// Send the saved task as a response
		res.status(200).send(savedTask)
	} catch (err) {
		res.status(500).send({ message: 'Error creating task', error: err })
	}
}
// const homeRoutes = express.Router()
// homeRoutes.get('/', getStart)
//handling client routes


const DB_URL = 'mongodb+srv://yakovenkoandyua:forest548@japan-co.lic0y.mongodb.net/?retryWrites=true&w=majority&appName=Japan-co'
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDb connected'))
	.catch(err => console.error(err))

// app.use('/', homeRoutes)
app.use('/api/mail', mailRoutes)
app.use('/api/tasks', tasksRoutes)


app.get('*', (req, res) => {
	const __dirname = path.resolve()
	res.sendFile(path.join(__dirname, './client/index.html'))
})
app.listen(process.env.PORT || 8080, () => {
	console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
