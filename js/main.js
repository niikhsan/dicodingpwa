function hideLoader(){
    document.getElementById('progress').style.display='none';
}

function showLoader(){
    document.getElementById('loader').innerHTML=`
    <div class="load center-align" id="progress">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-red">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function limit(word, separator = ' ') {
    if (word.length <= 10) return word;
    return word.substr(0, word.lastIndexOf(separator, 12));
}

let showStandings = ()=>{
    showLoader();
    if ('caches' in window){
        caches.match(`${base_url}competitions/${liga_ID}/standings?standingType=HOME`,{
            headers:{
                'X-Auth-Token' : API_KEY
            }
            })
            .then(response=>{
                if(response) {
                    response.json()
                        .then(data => {
                            let str = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
                            data = JSON.parse(str);

                            let dataHTML ='';
                            data.standings.forEach(standing=>{
                                let standingHTML ='';
                                standing.table.forEach(res=>{
                                    standingHTML +=`
                                    <tr>
                                    <td class="center-align">${res.position}</td>
                                    <td class="center-align"><img src="${res.team.crestUrl || 'icon192.png'}" alt="${res.team.name}" class="responsive-img" width="30"></td>
                                    <td>${res.team.name}</td>
                                    <td class="center-align">${res.playedGames}</td>
                                    <td class="center-align">${res.won}</td>
                                    <td class="center-align">${res.draw}</td>
                                    <td class="center-align">${res.lost}</td>
                                    <td class="center-align">${res.goalsFor}</td>
                                    <td class="center-align">${res.goalsAgainst}</td>
                                    <td class="center-align">${res.goalDifference}</td>
                                    <td class="center-align">${res.points}</td>
                                    </tr>
                                    `;
                                })

                                dataHTML +=`
                                <div class="row mt-50">
                                <div class="col s12">
                                    <h2 class="left-align title group">${standing.group}</h2>
                                </div>
                                    <div class="col s12 z-depth-3">
                                        <table class="highlight striped responsive-table">
                                            <thead>
                                                <tr>
                                                    <th>Position</th>
                                                    <th>Logo</th>
                                                    <th>Team</th>
                                                    <th>Played</th>
                                                    <th>Won</th>
                                                    <th>Draw</th>
                                                    <th>Lost</th>
                                                    <th>GF</th>
                                                    <th>GA</th>
                                                    <th>GD</th>
                                                    <th>Points</th>
                                                </tr>
                                            </thead>
                                            <tbody>${standingHTML}</tbody>
                                        </table>
                                    </div>
                                </div>
                                `;
                            })

                            document.getElementById('title').innerHTML = 'Premier League - Standings';
                            document.getElementById('main-content').innerHTML = dataHTML;
                            hideLoader();
                        })
                        .catch(err => console.log(err));
                }
            })

        let standings = getStanding();
        standings.then(data=>{
            let str = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
            data = JSON.parse(str);

            let dataHTML ='';
            data.standings.forEach(standing=>{
                let standingHTML ='';
                standing.table.forEach(res=>{
                    standingHTML +=`
                    <tr>
                    <td class="center-align">${res.position}</td>
                    <td class="center-align"><img src="${res.team.crestUrl || 'icon192.png'}" alt="${res.team.name}" class="responsive-img" width="30"></td>
                    <td>${res.team.name}</td>
                    <td class="center-align">${res.playedGames}</td>
                    <td class="center-align">${res.won}</td>
                    <td class="center-align">${res.draw}</td>
                    <td class="center-align">${res.lost}</td>
                    <td class="center-align">${res.goalsFor}</td>
                    <td class="center-align">${res.goalsAgainst}</td>
                    <td class="center-align">${res.goalDifference}</td>
                    <td class="center-align">${res.points}</td>
                    </tr>
                    `;
                })

                dataHTML +=`
                <div class="row mt-50">
                <div class="col s12">
                    <h2 class="left-align title group">${standing.group}</h2>
                </div>
                    <div class="col s12 z-depth-3">
                        <table class="highlight striped responsive-table">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Logo</th>
                                    <th>Team</th>
                                    <th>Played</th>
                                    <th>Won</th>
                                    <th>Draw</th>
                                    <th>Lost</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>${standingHTML}</tbody>
                        </table>
                    </div>
                </div>
                `;
            })

            document.getElementById('title').innerHTML = 'Premier League - Standings';
            document.getElementById('main-content').innerHTML = dataHTML;
            hideLoader();
        })
    }
}

let showSchedule = ()=>{
    showLoader();
    if ('caches' in window) {
        caches.match(`${base_url}competitions/${liga_ID}/matches`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        })
            .then(response=>{
                if(response) {
                    response.json()
                        .then(data => {
                            let str = JSON.stringify(data).replace(/http:/g, 'https:');
                            data = JSON.parse(str);

                            let html ='';
                            data.matches.forEach(matchTim =>{
                                html +=`
                                    <div class="col s12 m8 l6">
                                    <div class="card blue-grey darken-1 z-depth-3">
                                        <div class="card-content white-text">
                                        <span class="card-title center-align red darken-1">${matchTim.group}</span>
                                            <table class="centered highlight">
                                                <thead>
                                                    <tr>
                                                        <th>Home</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th>Away</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>${limit(matchTim.homeTeam.name)}</td>
                                                        <td>${matchTim.score.fullTime.awayTeam}</td>
                                                        <td>VS</td>
                                                        <td>${matchTim.score.fullTime.awayTeam}</td>
                                                        <td>${limit(matchTim.awayTeam.name)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                            <div class="card-action">
                                            <a href="#" class="left-align">This is a link</a>
                                            <a class="btn-add btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            })
                            let matchHTML ='';
                            matchHTML +=`
                            <div class="row mt-50">${html}</div>
                            `;

                            document.getElementById('title').innerHTML = 'UEFA Champions League';
                            document.getElementById('main-content').innerHTML = matchHTML;
                            hideLoader();
                        })
                        .catch(err => console.log(err));
                }
            })

        let matches = getMatch();
        matches.then(data=>{
            let str = JSON.stringify(data).replace(/http:/g, 'https:');
            data = JSON.parse(str);

            let html ='';
            data.matches.forEach(matchTim =>{
                html +=`
                    <div class="col s12 m8 l6">
                    <div class="card blue-grey darken-1 z-depth-3">
                        <div class="card-content white-text">
                        <span class="card-title center-align red darken-1">${matchTim.group}</span>
                            <table class="centered highlight">
                                <thead>
                                    <tr>
                                        <th>Home</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Away</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${limit(matchTim.homeTeam.name)}</td>
                                        <td>${matchTim.score.fullTime.awayTeam}</td>
                                        <td>VS</td>
                                        <td>${matchTim.score.fullTime.awayTeam}</td>
                                        <td>${limit(matchTim.awayTeam.name)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="card-action">
                            <a href="#" class="left-align">This is a link</a>
                            <a class="btn-add btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                            </div>
                        </div>
                    </div>
                `;
            })
            let matchHTML ='';
            matchHTML +=`
            <div class="row mt-50">${html}</div>
            `;

            document.getElementById('title').innerHTML = 'UEFA Champions League';
            document.getElementById('main-content').innerHTML = matchHTML;
            hideLoader();
            })
    }

}

let favSchedule = ()=>{

}

let dbPromise = idb.open('football', 1, upgradeDB => {
    if(!upgradeDB.objectStoreNames.contains('teams')){
        upgradeDB.createObjectStore('teams')
    }
});
