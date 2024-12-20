import express, { Application, Request, Response } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import cookieParser from 'cookie-parser'


const app: Application = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/',router )

app.use(notFound)
app.use(globalErrorHandler)
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Blogging Site')
  })


export default app

