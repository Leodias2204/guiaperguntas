const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
//Database

//Testando a conexão com o banco de dadosnod

connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com o banco de dados")
    }).catch((msgErro) => {
        console.log(msgErro)
    })

app.set('view engine', 'ejs')// Estou dizendo para o express usar o EJS como o view engine
app.use(express.static('public')) // use express static é utilizado para carregar imagens ou qualquer coisa estática para o HTML.


//Body parser
app.use(bodyParser.urlencoded({extended: false })) // Decodifica os dados do formulário em uma estrutura Java script utilizavel pelo back end.
app.use(bodyParser.json()) 


// Rotas
app.get("/",(req,res) => {
    // Váriaveis criadas para serem vizualizadas diretamente no HTML.

    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']]}).then(pergunta => {
        res.render('index', {
            pergunta:pergunta
        })
    })
    // findALL  >>>> Equivalente ao SELECT * FROM + NOME DA TABELA 
}) // raw: true >>> Significa que somente receberá os dados principais da tabela

app.get("/perguntar",(req,res) => {
    res.render("perguntar")
})



//Tipo de rota utilizado para formulário
app.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    
    // Equivalente ao Insert into table 

    Pergunta.create( {
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id',(req, res) => {
    let id = req.params.id;
    Pergunta.findOne({  //Busca especifica equivalente a Select * from table where id= params
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {  //Pergunta Encontrada
            
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]}).then(respostas => {
                res.render('pergunta',{
                    pergunta:pergunta,
                    respostas: respostas
                    
                })
            })
        }else{                       //Pergunta Não encontrada
            res.redirect('/')
        }
    }) 
})

app.post("/responder",(req, res) => {
    const corpo = req.body.corpo
    const perguntaId = req.body.pergunta
    Resposta.create ({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    })
})


app.listen(8080,() =>{console.log('App Rodando!!')})