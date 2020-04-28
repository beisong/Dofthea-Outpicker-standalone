/**
 * Created by weisong on 16/12/17.
 */

const http = require('http');
const fs = require('fs');

const curDIR = process.env.PWD;

const first_phase_ban_start = 0;
const first_phase_ban_end = 5;

const first_phase_pick_start = 6;
const first_phase_pick_end = 9;

const second_phase_ban_start = 10;
const second_phase_ban_end = 13;

const second_phase_pick_start = 14;
const second_phase_pick_end = 17;

const last_phase_ban_start = 18;
const last_phase_ban_end = 19;

const last_phase_pick_start = 20;
const last_phase_pick_end = 21;

Meteor.methods({
    initHeroes: function () {
        var result = HTTP.call("GET",
            "https://api.opendota.com/api/heroes");

        heroesdata = result.data;

        Heroes.rawCollection().drop();

        for (var i = 0; i < heroesdata.length; i++) {

            var cdn_name = heroesdata[i].name.substring(14);
            heroesdata[i].cdn_name = cdn_name;


            download("http://cdn.dota2.com/apps/dota2/images/heroes/" + cdn_name + "_full.png", curDIR + "/public/heroesimage/" + cdn_name + ".jpg", cdn_name, function () {
            });

            Heroes.insert(
                heroesdata[i]
            );
        }
        console.log(heroesdata.length + "  Heroes inserted");
    },
    initBP: function () {
        let result = Heroes.find().fetch();
        let heroes_count = result.length;

        for (let i = 0; i < heroes_count; i++) {
            for (let j = 0; j < heroes_count; j++) {
                if (i !== j) {
                    BanPick.insert(
                        {"hero": result[i].id, "counter": result[j].id, count: 0}
                    );
                }
            }
        }
        console.log("BP Init");
    },

    testfn: function (matchid) {
    },
    insertMatchBP2: function (matchid) {
        this.unblock();

        var results = HTTP.call("GET", "https://api.opendota.com/api/matches/" + matchid);
        var matchdata = results.data;

        if (matchdata.picks_bans) {          // Some matches picks_ban is null
            var bp_arr = matchdata.picks_bans;

            let B1= [], P1= [], B2= [], P2= [], B3= [], P3 = [];    // Referring to Ban and pick phase 1,2,3

            let h = 0;
            while (!bp_arr[h].is_pick){
                B1.push(bp_arr[h]);
                h++;
            }
            while (bp_arr[h].is_pick){
                P1.push(bp_arr[h]);
                h++;
            }
            while (!bp_arr[h].is_pick){
                B2.push(bp_arr[h]);
                h++;
            }
            while (bp_arr[h].is_pick){
                P2.push(bp_arr[h]);
                h++;
            }
            while (!bp_arr[h].is_pick){
                B3.push(bp_arr[h]);
                h++;
            }
            while (bp_arr[h] && bp_arr[h].is_pick){
                P3.push(bp_arr[h]);
                h++;
            }

            // P1
            for (let i = P1.length-1; i > 0; i--) {
                for (let j = i-1; j >= 0; j--) {
                    if(P1[i].team !== P1[j].team){
                        updateBP(P1[j].hero_id, P1[i].hero_id);
                       // console.log("PICK1) "  + P1[i].hero_id + " Counters " +P1[j].hero_id);
                    }
                }
            }

            // B2
            for (let i = 0; i<B2.length; i++) {
                for(let j = 0; j<P1.length; j++){
                    if(B2[i].team === P1[j].team){
                        updateBP(P1[j].hero_id, B2[i].hero_id);
                        // console.log("BAN2) "  + B2[i].hero_id + " Counters " +P1[j].hero_id);
                    }
                }
            }

            //P2
            for (let i = P2.length-1; i >= 0; i--) {
                if(i>0){
                    for (let j = i-1; j >= 0; j--) {
                        if(P2[i].team !== P2[j].team){
                            updateBP(P2[j].hero_id, P2[i].hero_id );
                            // console.log("PICK2) "  + P2[i].hero_id + " Counters " +P2[j].hero_id);
                        }
                    }
                }
                for (let k = 0; k <P1.length; k++) {
                    if(P2[i].team !== P1[k].team){
                        updateBP(P1[k].hero_id, P2[i].hero_id );
                        // console.log("PICK2) "  + P2[i].hero_id + " Counters " +P1[k].hero_id);
                    }
                }
                for (let l = 0; l <B2.length; l++) {
                    if(P2[i].team === B2[l].team){
                        updateBP(P2[i].hero_id, B2[l].hero_id);
                        // console.log("PICK3) "  + B2[l].hero_id + " Counters " +P2[i].hero_id);
                    }
                }

            }

            // B3
            for (let i = 0; i<B3.length; i++) {
                for(let j = 0; j<P1.length; j++){
                    if(B3[i].team === P1[j].team){
                        updateBP(P1[j].hero_id, B3[i].hero_id );
                        // console.log("BAN3) "  + B3[i].hero_id + " Counters " +P1[j].hero_id);
                    }
                }
                for(let j = 0; j<P2.length; j++){
                    if(B3[i].team === P2[j].team){
                        updateBP(P2[j].hero_id, B3[i].hero_id );
                        // console.log("BAN3) "  + B3[i].hero_id + " Counters " +P2[j].hero_id);
                    }
                }
            }


            //P3
            for (let i = P3.length-1; i >= 0; i--) {
                if(i>0){
                    for (let j = i-1; j >= 0; j--) {
                        if(P3[i].team !== P3[j].team){
                            updateBP(P3[j].hero_id, P3[i].hero_id );
                            // console.log("PICK3) "  + P3[i].hero_id + " Counters " +P3[j].hero_id);
                        }
                    }
                }
                for (let k = 0; k <P1.length; k++) {
                    if(P3[i].team !== P1[k].team){
                        updateBP(P1[k].hero_id, P3[i].hero_id );
                        // console.log("PICK3) "  + P3[i].hero_id + " Counters " +P1[k].hero_id);
                    }
                }
                for (let l = 0; l <P2.length; l++) {
                    if(P3[i].team !== P2[l].team){
                        updateBP(P2[l].hero_id, P3[i].hero_id);
                        // console.log("PICK3) "  + P3[i].hero_id + " Counters " +P2[l].hero_id);
                    }
                }
                for (let m = 0; m <B3.length; m++) {
                    if(P3[i].team === B3[m].team){
                        updateBP(P3[i].hero_id, B3[m].hero_id );
                        // console.log("PICK3) "  + B3[m].hero_id + " Counters " +P3[i].hero_id);
                    }
                }
            }



            // OLD CODE
            // for (var i = 0; i < bp_arr.length; i++) {    //Loop thru BP
            //     if (bp_arr[i].is_pick) {                 //if is pick
            //         var thisteam = bp_arr[i].team;
            //
            //         if(bp_arr[i].order > second_phase_ban_end){                     // if last 3 pick
            //             for (var k = i-1; k >= second_phase_ban_start; k--) {       // if heroes ban before picking -> is counter
            //                 if(!bp_arr[k].is_pick){
            //                     BanPick.update(
            //                       {hero: bp_arr[i].hero_id, counter: bp_arr[k].hero_id},
            //                       {'$inc': {"count": 1}}
            //                     );
            //                 }
            //             }
            //         }
            //
            //         for (var j = i + 1; j < bp_arr.length; j++) {
            //             if (bp_arr[j].team == thisteam) {   // if same team, check ban
            //                 if (!bp_arr[j].is_pick) {
            //                     BanPick.update(
            //                       {hero: bp_arr[i].hero_id, counter: bp_arr[j].hero_id},
            //                       {'$inc': {"count": 1}}
            //                     );
            //                 }
            //             }
            //             else {                              // if diff team, check pick: add to counter
            //                 if (bp_arr[j].is_pick) {
            //                     BanPick.update(
            //                       {hero: bp_arr[i].hero_id, counter: bp_arr[j].hero_id},
            //                       {'$inc': {"count": 1}}
            //                     );
            //                 }
            //             }
            //         }
            //     }
            // }
        }
        // console.log("Parsed BP: " + matchid);
    },
    insertLeagueBP2: function (leaguestring) {
        console.log(leaguestring);
        var league_arr = leaguestring.split(",");
        for (var i = 0; i < league_arr.length; i++) {
            let callstring = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + league_arr[i] + "&key=" + Meteor.settings.steamKey;
            console.log(callstring);
            var result = HTTP.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?league_id=" + league_arr[i] + "&key=" + Meteor.settings.steamKey);
            var leaguedata = result.data;
            var leaguematches = leaguedata.result.matches;

            console.log('Inserting league : ' + league_arr[i] + ', num matches : ' + leaguematches.length);
            var matchcount = 0;
            var t0 = Date.now();
            var totalexcutime;
            leaguematches.forEach(function (oneMatch) {
                Meteor.call("insertMatchBP2", oneMatch.match_id, function (error, results) {
                    var t1 = Date.now();
                    var executionms = t1 - t0;

                    if (executionms < 1000) {    // make sure each api call at least 1 sec ; 60 call / min
                        var sleeptime = 1000 - executionms;
                        sleep(sleeptime);
                    }
                    totalexcutime = Date.now() - t0;
                    t0 = Date.now();
                    if (error) {
                        console.log("Error Fetching :" + oneMatch.match_id);
                        console.log(error.response.statusCode);
                        if (error.response.statusCode === 429) {
                            console.log("Error 429 rate limit exceeded : Sleeping 20s");
                            sleep(20000);
                        }
                    }
                });
                matchcount++;
                console.log(" Outpicker ///  " + matchcount + " ///  MatchID : " + oneMatch.match_id + " in " + totalexcutime + "ms");
            });
            console.log('Finished');
        }
    },
    getBan: function (heroid) {
        var pipeline = [
                {
                    $match: {heroid: +heroid}
                },
                {
                    $unwind: '$ban'
                },
                {
                    $group: {
                        _id: {
                            heroid: '$heroid',
                            ban: '$ban'
                        },
                        ban: {$first: '$ban'},
                        count: {$sum: 1}
                    }
                },
                {
                    $sort: {count: -1}
                },
                {$limit: 32},
                {
                    $project: {
                        _id: 0,
                        ban: 1,
                        count: 1
                    }
                }
            ]
        ;
        var res = Counterpicker.aggregate(
            pipeline
        );
        return res;
    },
    getFriend: function (heroid) {
        var pipeline = [
                {
                    $match: {heroid: +heroid}
                },
                {
                    $unwind: '$friends'
                },
                {
                    $group: {
                        _id: {
                            heroid: '$heroid',
                            friend: '$friends'
                        },
                        friend: {$first: '$friends'},
                        count: {$sum: 1}
                    }
                },
                {
                    $sort: {count: -1}
                },
                {$limit: 32},
                {
                    $project: {
                        _id: 0,
                        friend: 1,
                        count: 1
                    }
                }
            ]
        ;
        var res = Counterpicker.aggregate(
            pipeline
        );
        return res;
    },
    getCounterpick: function (heroid) {
        var pipeline2 = [
            {
                $match: {hero: +heroid}
            },
            {
                $sort: {count: -1}
            },
            {$limit: 32}
        ];
        const results = Promise.await(BanPick.aggregate(pipeline2).toArray());
        return results;
    },
    getPickcount: function (heroid) {
        var pipeline = [
            {
                $match: {heroid: +heroid}
            },
            {
                $group: {
                    _id: {
                        heroid: '$heroid',
                        matchid: '$matchid'
                    },
                    count: {$sum: 1}
                },
                $group: {
                    _id: {
                        heroid: '$heroid',
                    },
                    count: {$sum: 1}
                }
            },
        ];
        const results = Promise.await(Counterpicker.aggregate(pipeline).toArray());
        return results;
    },
    getPickedRate: function () {
        var pipeline = [
            {
                $group: {
                    _id: {
                        counter: '$counter',
                    },
                    count: {$sum: '$count'}
                },
            },
        ];
        const results = Promise.await(BanPick.aggregate(pipeline).toArray());
        return results;
    }
});

download = function (url, dest, cdn_name, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            console.log("Downloaded :: " + cdn_name);
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

sleep = function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


updateBP = function(hero, counteredby){
    BanPick.update(
      {hero: hero, counter: counteredby},
      {'$inc': {"count": 1}}
    );
}