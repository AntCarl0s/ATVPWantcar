const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')


//configure template handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//parser para leitura do body
app.use(
express.urlencoded({
extended: true
})
)
app.use(express.json())

//ADICIONANDO CAMINHO CSS
app.use(express.static('public'))

app.get('/Users/add', (req, res) => {
res.render('Userform', {auth})
})


app.post('/Users/save', (req, res) => {
const marca = req.body.marca;
const  potencia = req.body.potencia;
const motor = req.body.motor;
const nome = req.body.nome;
const cor = req.body.cor;
const anofabricacao = req.body.anofabricacao;


const user = { marca: marca, potencia: potencia, motor: motor, nome: nome, cor: cor, anofabricacao:anofabricacao}
res.render('viewuser', { user: user, auth })

})


const usuario = {
login: 'usuario@hotmail.com',
senha: 123456

}


app.get('/', (req, res) => {

res.render('login')
})

var auth = false

app.post('/User/login', (req, res) => {
const login = req.body.login
const senha = req.body.senha
let message = ""

if (login == usuario.login && senha == usuario.senha) {
auth = true
message = "Login efetuado com sucesso, bem vindo(a)!"
res.render('home', { usuario: usuario, auth, message })
}
else {
auth = false
message = "Usuário e/ou senha inválidos!"
res.render('login', { auth, message })
}

})

//pagina 404
app.use(function (req, res, next) {
res.status(404).render('404')
})


//webserver
app.listen(port, () => {
console.log('Server Started')
})