const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.port || 3000
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const rootRouter = require('./routes/index')

app.use('/api/v1', rootRouter)

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`)
})