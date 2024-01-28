const express = require ('express')
const handlebars = require ('express-handlebars')
const homeRouter = require ('./routes/home.route')
const http = require ('http')
const {Server} = require ('socket.io')

const app = express ()

const PORT = 8080 || process.env.PORT

let arrMsgs = []

//Server HTTP
const server = http.createServer(app)

// Public
app.use(express.static(__dirname+'/public'))

//Engine
app.engine ('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//Routes
app.use('/home', homeRouter)

//Socket server
const io = new Server (server)
io.on ('connection', (socket)=> {
    console.log('New user connected')

    socket.on('newMsg', (data)=>{
        arrMsgs.push(data)
        socket.emit('allMsgs', arrMsgs)
    })
})



server.listen (PORT , ()=>{
    console.log(`Server run on port ${PORT}`)
})