export class Fantasy {

  constructor() {

  }

  getPlayerStats(season, week, position, sort) {
    return new Promise((resolve, reject) => {

      let request = new XMLHttpRequest();
      let url = `https://api.fantasydata.net/v3/nfl/stats/JSON/GameLeagueLeaders/2017/12/QB/FantasyPoints`;
      console.log(process.env.API_KEY);



      request.onload = function() {
        if(request.status == 200) {
          resolve(request.response);
        } else {
          reject(request.statusText);
        }
      }

      request.open("GET", url, true);
      request.setRequestHeader("Ocp-Apim-Subscription-Key", process.env.API_KEY)
      request.send();

    });
  }
}
