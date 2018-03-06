const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err)
      console.log(err.message);
  });
  
  next();
});

hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('upperCase', (text="") => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/json', (req, res) => {
  res.send({
    title: 'Title',
    body: 'Content',
    data: {
      'info': 'content'
    }
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'Unable to handle request'
  });
});


app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
  
});