import cors from 'cors'
import express from 'express'
const app: express.Express = express()
const router: express.Router = express.Router()
const port = 3000

const corsOptions = {
  origin: 'http://localhost:5173',
  credential: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api", router)

// root
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// api
router.get('/', (req, res) => {
  res.send('Hello, Express API!')
  console.log('GET /api')
})

router.get('/activity', (req, res) => {
  const activity = {
    attendTime: "2024/09/12 12:00:00",
    leaveTime: "2024/09/12 18:00:00",
    weeklyTime: "3h 20min",
    totalTime: "10h 30min"
  }
  res.send(activity)
  console.log('GET /api/activity')
})

router.post('/attend', (req, res) => {
  const attendTime = req.body.attendTime
  res.send(`Attend time: ${attendTime}`)
  console.log('POST /api/attend')
  console.log(req.body)
})


app.listen(port, () => {
  console.log(`The app is listening on port ${port}`)
})