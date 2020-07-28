const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const {config} = require('./src/app/config');
const app = express();

// Swagger Init
const expressSwagger = require('express-swagger-generator')(app);// eslint-disable-line import/order 
expressSwagger({
	swaggerDefinition: {
   	info: {
   		title: config.SWAGGER_TITLE,
   		description: config.SWAGGER_DESCRIPTION,
   		version: config.SWAGGER_VERSION,
   	},
    	host: config.SWAGGER_API_HOST,
    	consumes: [
   		"application/json"
    	],
    	produces: [
   		"application/json"
    	],
    	schemes: ['https', 'http'],
    	securityDefinitions: {
			JWT: {
				type: 'apiKey',
				scheme: 'bearer',
				in: 'header',
				name: 'Authorization',
				description: "Authentication Token for NodeJS API",
			}
   	}
	},
	basedir: __dirname, //app absolute path
	files: ['./src/app/controllers/*.js'] //Path to the API handle folder
});



// Express Settings
app.use(logger('combined'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname + '/public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('./uploads'));
// CORS Addtiion
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// File Upload Limits
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }))
app.use(bodyParser.json({limit: '50mb'}));



/********* All Routes ******************/
// app.use("/api/v1", api);

// Run static setup
app.use(express.static(__dirname + "/views/build/dist"));
app.get("/", function(req, res) {
	return res.sendFile(path.join(__dirname + "/views/build/dist", "index.html"));
});

app.get('/test',function(req,res){
	res.send("test api ")
})


// Routes Init
app.use('/', require('./src/routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500).send({
   	status: err.status,
   	message: err.message,
  	});
});

module.exports = app;