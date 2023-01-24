const express = require("express");
const app = express();



app.set('view engine', 'ejs')// Estou dizendo para o express usar o EJS como o view engine
app.use(express.static('public')) // use express static é utilizado para carregar imagens ou qualquer coisa estática para o HTML.
app.get("/",(req,res) => {
    // Váriaveis criadas para serem vizualizadas diretamente no HTML.

    res.render("index",{

    })
})

app.listen(8080,() => {
    console.log("App Rodando!!")
})