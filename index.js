const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.set('view engine', 'ejs')// Estou dizendo para o express usar o EJS como o view engine
app.use(express.static('public')) // use express static é utilizado para carregar imagens ou qualquer coisa estática para o HTML.


//Body parser
app.use(bodyParser.urlencoded({extended: false })) // Decodifica os dados do formulário em uma estrutura Java script utilizavel pelo back end.
app.use(bodyParser.json()) 


// Rotas
app.get("/",(req,res) => {
    // Váriaveis criadas para serem vizualizadas diretamente no HTML.

    res.render("index",{
        //Render é utilizado para rederizar o HTML
    })
})

app.get("/perguntar",(req,res) => {
    res.render("perguntar")
})



//Tipo de rota utilizado para formulário
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    res.send("Formulário recebido " + titulo + " descrição " + descricao)
})


app.listen(8080,() => {
    console.log("App Rodando!!")
})