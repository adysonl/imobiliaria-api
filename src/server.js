let express = require('express');
let app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, content-disposition")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})

//Data base
const sequelize = require('./database/index');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const a = express.static('./public');
console.log(a);
app.use('/static', a);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


require('./controller/user.controller')(app);
require('./controller/property.controller')(app);
require('./controller/contract.controller')(app);
require('./controller/client.controller')(app);
require('./controller/payment.controller')(app);
//require('./middleweres/auth')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000 pf!');
});

