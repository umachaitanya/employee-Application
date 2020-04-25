require('./models/db');

let express = require('express');
let app = express();

const path = require('path');
const exhbs = require('express-handlebars');
const _handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const employeeController = require('./controllers/employeeController');

app.set('views', path.join(__dirname, './views/'));

app.engine('hbs', exhbs(
    {
        extname: 'hbs',
        defaultLayout: 'mainLayout',
        layoutsDir: __dirname + '/views/layouts',
        handlebars: allowInsecurePrototypeAccess(_handlebars)
    }));
app.set('view engine', 'hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use('/employee', employeeController);

// app.use((req,res,next)=>{
//     console.log(`${new Date().toString()} => ${req.originalUrl}`);
//     next();
// });

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.info(`Server listening to ${PORT}`));

