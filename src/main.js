import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Fantasy} from './fantasy.js';

function fetchPlayer(playerID) {
  let fantasyGame = new Fantasy();
  let promise = fantasyGame.getPlayerDetails(playerID);

  promise.then(player => {
    let newPlayer = JSON.parse(player);
    document.getElementById("playerPhoto").src=newPlayer.PhotoUrl;
    document.getElementById("playerName").innerHTML = newPlayer.FirstName + " " + newPlayer.LastName;
    document.getElementById("playerTeam").innerHTML = newPlayer.Team;
    document.getElementById("playerPosition").innerHTML = newPlayer.Position;
    document.getElementById("playerCollege").innerHTML = newPlayer.College;
    document.getElementById("playerExperience").innerHTML = newPlayer.Experience;
    document.getElementById("playerHeight").innerHTML = newPlayer.Height;
    document.getElementById("playerWeight").innerHTML = newPlayer.Weight;
    document.getElementById("playerBirthdate").innerHTML = newPlayer.BirthDate;



  }, error => {
    console.log(error);
  });
}

function displayStats(year,week,position) {
  let fantasyGame = new Fantasy();
  let promise = fantasyGame.getPlayerStats(year, week, position, "FantasyPoints");
  
  promise.then(stats => {
    let newStats = JSON.parse(stats);

    for(let i = 0; i < 10; i++) {
      $("#statsTable").append(`<tr class="tableRow">
                                   <td class="nameClickable" id="${newStats[i].PlayerID}">${newStats[i].Name}</td>
                                   <td>${newStats[i].Team}</td>
                                   <td>${newStats[i].Position}</td>
                                   <td>${newStats[i].Touchdowns}</td>
                                   <td>${newStats[i].FantasyPoints}</td>
                                   </tr>`);
    }

    $(".nameClickable").each(function() {
      $(this).click(function() {
        fetchPlayer(this.id);
      });
    });

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
