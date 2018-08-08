import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Fantasy} from './fantasy.js';

function displayStats(year,week,position) {
  let fantasyGame = new Fantasy();
  let promise = fantasyGame.getPlayerStats(year, week, position, "FantasyPoints");
  promise.then(stats => {
    let newStats = JSON.parse(stats);

    for(let i = 0; i < 10; i++) {
      $("#statsTable").append(`<tr><td>${newStats[i].Name}</td>
                                   <td>${newStats[i].Team}</td></tr>`);
    }

    console.log(newStats);
    console.log(newStats[0].Name);
  }, error => {
    console.log(error);
  });
}

$(document).ready(function() {

  $("#entryForm").submit((event) => {
    event.preventDefault();
    let season = $("#season").val();
    let week = $("#week").val();
    let position = $("#position").val();
    displayStats(season, week, position);
  });

});
