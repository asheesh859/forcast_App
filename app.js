const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const request = require('postman-request');


const publicDir = path.join(__dirname, '\public');
const partialPath = path.join(__dirname, './template/partials');
const viewsPath = path.join(__dirname, './template/views');

app.use(express.static(publicDir));
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

const port = 8000;

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Wether',
    name: 'Dev Asheesh'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Dev Asheesh'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    helpMsg: 'this is helpfull text !',
    name: 'Dev Asheesh'
  })
})
app.get('/wether', (req, res) => {
  try {
    if (!req.query.address) {
      return res.send({
        error: 'You must provide an address'
      })
    }
    if (!req.query.country) {
      return res.send({
        error: 'You must provide country'
      })
    }
    const Current_location = req.query.address || 'Delhi'
    const country = req.query.country || 'India'

    const url = `http://api.weatherapi.com/v1/current.json?key=4ba791ba9cb04a12b21195838241804&q=${Current_location} ${country}&aqi=yes`
    request(url, (error, response, body) => {
      const ParseData = JSON.parse(body);
      const country = ParseData.location.country;
      const region = ParseData.location.region;
      const latitude = ParseData.location.lat;
      const longitute = ParseData.location.lon;
      const timeZone = ParseData.location.tz_id
      const DateAndTime = ParseData.location.localtime;
      const temp_c = ParseData.current.temp_c;
      const temp_f = ParseData.current.temp_f;
      const text = ParseData.current.condition.text;

      return res.send({
        country: country,
        region: region,
        latitude: latitude,
        longitute: longitute,
        timeZone: timeZone,
        DateAndTime: DateAndTime,
        temp_c: temp_c,
        temp_f: temp_f,
        text: text

      })
    });

  } catch (error) {
    return res.send({ error: error.message })
  }

})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dev Asheesh',
    errorMessage: 'Page not found'
  })
})
app.listen(port, () => {
  console.log('express server start at 8000 port');
})










