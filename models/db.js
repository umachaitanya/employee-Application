const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser : true }, (err) =>{
if(!err){
    console.log('mongo db connection succeeded');
}
else{
    console.log('error occurred while connection establishment: '+ err)
}
});
require('./employee.model');