import express from "express"
import "dotenv/config"
import { router } from "./routes/index"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

const app = express()

app.use(express.json())
app.use(router)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`)
})


