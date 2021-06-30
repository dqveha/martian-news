import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MartianNews from './marsAPI.js';



// async function makeApiCall() {
//   const response = await MartianNews.getAPOD();
//   getElements(response);
// }

$(document).ready(function() {

  let promise = MartianNews.getAPOD();
  promise.then(function(response) {
    const body = JSON.parse(response);
    $('.showUrl').text(`Here is your Astronomy Picture of The Day ${body.url}`);
  }
  , function(error) {
    $('.showUrl').text(`SORRY, LOOK OUTSIDE INSTEAD`);
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

console.log(MartianNews);


/*

APOD --> Use towards background image; decrease opacity to make text pop out
InSight --> Mars Weather Service 
Mars Rover Photos --> Have pictures around website

*/


