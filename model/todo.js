const mongoose = require('mongoose');
//creating structure of database
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    duedate: {
        type: String,
        require: true
    }
}); 
const Todo= mongoose.model('Todo',todoSchema);
module.exports = Todo;