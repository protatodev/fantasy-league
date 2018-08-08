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
      $("#statsTable").append(`<tr class="tableRow" id="${newStats[i].PlayerID}"><td><a href="#">${newStats[i].Name}</a></td>
                                   <td>${newStats[i].Team}</td>
                                   <td>${newStats[i].Position}</td>
                                   <td>${newStats[i].Touchdowns}</td>
                                   <td>${newStats[i].FantasyPoints}</td>
                                   <td>${newStats[i].OpponentPositionRank}</td>
                                   <td>${newStats[i].WindSpeed}</td>


                                   </tr>`);
    }
  }, error => {
    console.log(error);
  });
}

function clearTable() {
  $(".tableRow").each(function() {
    this.remove();
  });
}

$(document).ready(function() {

  $("#entryForm").submit((event) => {
    event.preventDefault();
    clearTable();
    let season = $("#season").val();
    let week = $("#week").val();
    let position = $("#position").val();
    displayStats(season, week, position);
  });

});
