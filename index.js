const express = require ('express')
const handlebars = require ('express-handlebars')
const homeRouter = require ('./routes/home.route')

const app = express ()

const PORT = 8080 || process.env.PORT

// Public
app.use(express.static(__dirname+'/public'))

//Engine
app.engine ('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//Routes
app.use('/home', homeRouter)



app.listen (PORT , ()=>{
    console.log(`Server run on port ${PORT}`)
})