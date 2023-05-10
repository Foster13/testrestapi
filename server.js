const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//parse app/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//panggil router
var routes = require('./router');
routes(app);

app.listen(3000, () => {
    console.log(`Server started on port`);
});