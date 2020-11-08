import * as express from 'express'
import * as cors from 'cors'

const app = express()

app.use(cors())

app.listen(8080, () => {
  console.log(`now listening for requests on port 8080`)
})

export default app
