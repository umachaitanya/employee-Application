const mongoose = require('mongoose');
 var employeeSchema = new mongoose.Schema({
     fullName : {
         type: String,
         required:"this is mandatory"
     },
     email: {
         type : String,
         required:"this is mandatory"
     },
     mobile : {
        type: String,
        required:"this is mandatory"
    },
    city: {
        type : String,
        required:"this is mandatory"
    }
 });
 mongoose.model('Employee', employeeSchema);