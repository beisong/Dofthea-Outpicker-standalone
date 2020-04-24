/**
 * Created by weisong on 16/12/17.
 */
Template.registerHelper('getHeroesName', function (heroid) {
    if (heroid) {
        var res = Heroes.findOne({id: +heroid});
        if (res) {
            console.log("localized_name");
            console.log(res.localized_name);
            return res.localized_name;
        }
    }
});

Template.registerHelper('getHeroesCDNName', function (heroid) {
    if (heroid) {
        var res = Heroes.findOne({id: +heroid});
        if (res) {
            return res.cdn_name;
        }
    }
});
