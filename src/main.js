import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Fantasy} from './fantasy.js';

function displayStats() {
  let fantasyGame = new Fantasy();
  let promise = fantasyGame.getPlayerStats("2017", "12", "QB", "FanstasyPoints");

  promise.then(stats => {
    console.log(stats);
  }, error => {
    console.log(error);
  });
}

$(document).ready(function() {

  displayStats();

});
