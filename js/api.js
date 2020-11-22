const API_KEY = '02481c1bcf234328a97af1232afdf044';
const liga_ID = 2001;
let base_url = "https://api.football-data.org/v2/";
let standingHome = `${base_url}competitions/${liga_ID}/standings?standingType=HOME`;
let match = `${base_url}competitions/${liga_ID}/matches`;

let status = res => {
    if(res.status !== 200){
        console.log(`Error : ${res.status}`);
        return Promise.reject(new Error(res.statusText()));
    }else{
        return Promise.resolve(res);
    }
}

let json = response=>{
    return response.json();
}

let error = error=>{
    console.log(`Error: ${error}`);
}

let getStanding = ()=>{
    return fetch(standingHome,{
            headers:{
                'X-Auth-Token' : API_KEY
            }
        })
        .then(status)
        .then(json);
}

let getMatch = ()=>{
    return fetch(match,{
        headers:{
            'X-Auth-Token' : API_KEY
        }
    })
        .then(status)
        .then(json);
}



