let express = require('express');
let app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
  next()
})

//Data base
const sequelize = require('./database/index');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


require('./controller/userController')(app);
require('./controller/immobileController')(app);
require('./controller/contractsController')(app);
require('./controller/clientController')(app);
require('./controller/paymentController')(app);
//require('./middleweres/auth')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000 pf!');
});

