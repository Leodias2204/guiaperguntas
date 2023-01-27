const Sequelize  = require('sequelize')
const connection = require('./database')


//Model ::> representação de uma tabela My SQL utilizando Java script

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
    
});

Pergunta.sync({ force: false}).then(() => {
    console.log('Table Created')
})



module.exports = Pergunta