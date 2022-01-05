//for creating database and connecting mongoose with database
const mongoose= require('mongoose');

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/csv-reader')
.then(()=>{console.log('db connected')})
.catch((err)=>{console.log(err)});
const db = mongoose.connection;
//for checkin connection

db.on('error',console.error.bind(console,'error in connecting to mongodb'));

db.once('open',function(){
    console.log("connected to mongodb");
});

module.exports= db;