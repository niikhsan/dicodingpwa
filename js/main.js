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

                            document.getElementById('title').innerHTML = 'Competitions';
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

            document.getElementById('title').innerHTML = 'Competitions';
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
                                    <div class="card z-depth-3">
                                        <div class="card-content">
                                        <span class="card-title center-align red darken-1 white-text">${matchTim.group}</span>
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
                                                        <td>${matchTim.score.fullTime.homeTeam}</td>
                                                        <td>VS</td>
                                                        <td>${matchTim.score.fullTime.awayTeam}</td>
                                                        <td>${limit(matchTim.awayTeam.name)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                            <div class="card-action">
                                            <span class="new badge-blue">${matchTim.status}</span>
                                            <a onclick="savMatch(${matchTim.id},'${matchTim.group}','${matchTim.status}','${limit(matchTim.homeTeam.name)}','${limit(matchTim.awayTeam.name)}','${matchTim.score.fullTime.homeTeam}','${matchTim.score.fullTime.awayTeam}')" title="Simpan hasil pertandingan" class="btn-add btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">thumb_up</i></a>
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
                    <div class="card z-depth-3">
                        <div class="card-content">
                        <span class="card-title center-align red darken-1 white-text">${matchTim.group}</span>
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
                                        <td>${matchTim.score.fullTime.homeTeam}</td>
                                        <td>VS</td>
                                        <td>${matchTim.score.fullTime.awayTeam}</td>
                                        <td>${limit(matchTim.awayTeam.name)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="card-action">
                            <span class="new badge-blue">${matchTim.status}</span>
                            <a onclick="savMatch(${matchTim.id},'${matchTim.group}','${matchTim.status}','${limit(matchTim.homeTeam.name)}','${limit(matchTim.awayTeam.name)}','${matchTim.score.fullTime.homeTeam}','${matchTim.score.fullTime.awayTeam}')" title="Simpan hasil pertandingan" class="btn-add btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">thumb_up</i></a>
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

let favMatch = ()=>{
    showLoader();
    let myMatch = getMatches();
    myMatch.then(data=> {
        let myHTML = '';
        data.forEach(myTim => {
            myHTML += `
                    <div class="col s12 m8 l6">
                    <div class="card z-depth-3">
                        <div class="card-content">
                        <span class="card-title center-align red darken-1 white-text">${myTim.group}</span>
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
                                        <td>${myTim.homeTim}</td>
                                        <td>${myTim.scoreHome}</td>
                                        <td>VS</td>
                                        <td>${myTim.scoreAway}</td>
                                        <td>${myTim.awayTim}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="card-action">
                            <span class="new badge-blue">${myTim.status}</span>
                            <a onclick="deleteMatch(${myTim.id},'${myTim.group}','${myTim.status}','${myTim.homeTim}','${myTim.awayTim}','${myTim.scoreHome}','${myTim.scoreAway}')" title="Hapus hasil pertandingan" class="btn-add btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
                            </div>
                        </div>
                    </div>
                `;
        })
        let favHTML ='';
        if(data.length == 0) {
            favHTML +=`
            <div class="row mt-50">
                <h3 class="center-align">No Favorite Match :( </h3>
            </div>
            `;
        }else{
            favHTML +=`
            <div class="row mt-50">${myHTML}</div>
            `;
        }
        document.getElementById('title').innerHTML = 'Favorite Match';
        document.getElementById('main-content').innerHTML = favHTML;
        hideLoader();
    })
}

let dbf = idb.open('pwafootball', 1, upgradeDb => {
    if(!upgradeDb.objectStoreNames.contains('matches')){
        upgradeDb.createObjectStore('matches')
    }
});
let savMatch = (id,group,status,homeTim,awayTim,scoreHome,scoreAway)=>{
    dbf.then(db=>{
        let tx = db.transaction('matches','readwrite');
        let store = tx.objectStore('matches');
        let item = {
            id:id,
            group:group,
            status:status,
            homeTim:homeTim,
            awayTim:awayTim,
            scoreHome:scoreHome,
            scoreAway:scoreAway,
            createdAt: new Date().getTime()
        }
        store.put(item,id);
        return tx.complete;
    }).then(()=>{
        M.toast({html: `Pertandingan ${homeTim} VS ${awayTim} berhasil disimpan!`, classes:`rounded`})
            pushNotification(`Hasil pertandingan ${homeTim} VS ${awayTim} berhasil disimpan`);
         }).catch(()=>{
         M.toast({html: `Gagal Menyimpan Hasil Pertandingan ${homeTim} VS ${awayTim}`, classes:`rounded`})
        pushNotification(`Gagal Menyimpan Hasil Pertandingan ${homeTim} VS ${awayTim}`);
    })
}

let getMatches=()=>{
    return dbf.then(db=>{
        let tx = db.transaction('matches','readonly');
        let store = tx.objectStore('matches');
        return store.getAll();
    })
}

let deleteMatch = (id,group,status,homeTim,awayTim,scoreHome,scoreAway)=> {
    let del = confirm(`Apakah Anda Yakin ingin menghapus pertandingan dari Favorite Match ?`);
    if (del) {
        dbf.then(db => {
            let tx = db.transaction('matches', 'readwrite');
            let store = tx.objectStore('matches');
            store.delete(id);
            return tx.complete;
        }).then(() => {
            favMatch();
            M.toast({html: 'Berhasil Menghapus pertandingan!', classes:'rounded'});
        }).catch(err => {
            console.error('Error: ', err);
        })
    }
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: 'icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}
