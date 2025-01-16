require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require("./Routes/routes")
require("./Connection/db")

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})