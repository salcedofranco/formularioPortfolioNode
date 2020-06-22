
const express = require('express');

const app = express();


const path = require('path');

app.use(require('./routes/index'));

const sendMail = require('./routes/index');

require('dotenv').config()


// Sirve archivos estáticos (lo necesitamos para importar un archivo CSS) 
app.use(express.static('public'))

// Carga el módulo de manillar 
const handlebars = require('express-handlebars');

// Configura nuestra aplicación para usar el motor del manillar 
app.set('view engine', 'hbs');

app.use(express.urlencoded({
  extended:false
}));
app.use(express.json());

//email, subject, text
app.post('/email', (req, res) => {
  //TODO:
  //send email here
  const { subject, email, text } = req.body;
  console.log('Data: ', req.body);

  sendMail(email, subject, text, function(err, data) {
      if (err) {
          res.status(500).json({ message: 'Error'});
      } else {
          res.json({ message: 'Email enviado!'})
      }
  });
  
});

// Establece las configuraciones del manillar 
//app.engine('hbs', handlebars({
   //layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    //extname: 'hbs'
    //}));

    //ACA LLAMAMOS A PLANB.HBS
    app.engine('hbs', handlebars({
        layoutsDir: __dirname + '/views/layouts',
        extname: 'hbs',
        //new configuration parameter
        defaultLayout: 'planB',
        //new configuration parameter
        partialsDir: __dirname + '/views/partials/'
        }));

        //I would like to use a real api but let's use this for the sake of //the simplicity of the article

      


        //ACA LLAMAMOS A INDEX.HBS
//app.get('/', (req, res) => { 
// Sirve el cuerpo de la página aka "main.handlebars" al contenedor // aka "index.handlebars" 
//res.render('main', {layout : 'index'});
//});

        //ACA LLAMAMOS A planb
//app.get('/', (req, res) => {
    //instead of res.render('main', {layout: 'index'});
    //res.render('main');
    //});


      //app.get('/dinamica', (req, res) => {
        //res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true});
        //});

    app.get('/', (req, res) => {
        //Using the index.hbs file instead of planB
        res.render('main', {layout: 'index'});
    });


    //ARCHIVOS DINAMICOS, PASAMOS OBJETOS
    
//app.get('/', (req, res) => {
//res.render('main', {layout: 'index', proPlayer: fakeApi()});
//});


// Establece una ruta básica 
//app.get('/', (req, res) => res.send('Hello World !'));



/** Puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
});