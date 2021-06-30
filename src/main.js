import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MartianNews from './marsAPI.js';

// function getWeather(response) {
//   if (response) {
//     $('.mars-photos').text(`Here are your photos of Mars! ${response.photos[0].img_src}`);
//   } else {
//     $('.showErrors').text(`There was an error: ${response}`);
//   }
// }

// async function makeApiCall() {
//   const response = await MartianNews.getAPOD();
//   getElements(response);
// }

$(document).ready(function() {

  let promise1 = MartianNews.getAPOD();
  promise1.then(function(response) {
    const body = JSON.parse(response);
    $('.video').html(`Here is your Astronomy Picture of The Day:  <iframe width="560" height="315" src=${body.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
  }
  , function(error) {
    $('.showUrl').text(`SORRY, LOOK OUTSIDE INSTEAD`);
    console.log(error);
  });

  let promise2 = MartianNews.getMarsPhotos();
  promise2.then(function(response) {
    const photo = JSON.parse(response);
    $('.showPhotos').html(`Here is your Mars Photo: <img src=${photo.photos[0].img_src}>`);
  }
  , function(error) {
    $('.showPhotos').text(`ERROR ALIEN INVASION!`);
    console.log(error);
  });

  MartianNews.getMarsWeather()
    .then(function(response){
      console.log(response)
      if (response) {
        $('.mars-weather').text(`Here is your Astronomy Picture of The Day ${response.soles["0"].max_temp}`);
        console.log(response)
      } else {
        $('.showErrors').text(`There was an error: ${response}`);
      }
    });
});

//