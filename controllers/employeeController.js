const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req,res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});
router.post('/', (req,res) => {
    if(req.body._id == '')
       insertEmployee(req,res);
    else
       updateRecord(req,res);
});

function insertEmployee(req,res){
   var employee = new Employee();
   employee.fullName = req.body.fullName;
   employee.email = req.body.email;
   employee.mobile = req.body.mobile;
   employee.city = req.body.city;
   employee.save((err, doc) => {
       if(!err) 
             res.redirect('employee');
        else{
            if(err.name == 'ValidationError')
            {
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                })
            }
            else
               console.log("there is something wrong"+err);
        }
   });
};
router.get('/list', (req,res) => {
   Employee.find((err,docs)=> {
       if(!err){
       res.render("employee/list",{
           list :docs
       });
    }
    else {
        console.log("error in retriving employees list" +err);
    } 
   });
});
// router.get('/list', function (req, res) {
//     let employees = Employee.find({}, function(err, employees){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(employees);
//         }
//     });
// });
router.get('/:id',(req,res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("employee/addorEdit", {
                viewTitle: "Update Employee",
                employee : doc
            })
        }
    })
});

function updateRecord(req,res){
    Employee.findOneAndUpdate({ _id: req.body._id}, req.body, { new : true }, (err, doc) => {
        if(!err){
            res.redirect('employee/list');
        }
        else{
            if(err.name == 'ValidationError')
            {
                res.render("employee/addOrEdit", {
                    viewTitle: "Update Employee",
                    employee: req.body
                })
            }
            else
               console.log("there is something wrong"+err);
        }
    });

}

router.get('/delete/:id', (req,res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log("error in deleting the employee" + err);
        }
    });
})
module.exports = router;
