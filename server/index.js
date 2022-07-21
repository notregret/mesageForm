require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('../server/routes/index')
const errorHandler = require('../server/middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.json())
app.use('/api', router)
//обработка ошиблк

app.get('/', (req, res)=>{
    res.status(200).json({message: 'Work'})
})


const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()
