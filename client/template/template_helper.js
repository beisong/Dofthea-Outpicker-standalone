/**
 * Created by weisong on 16/12/17.
 */
Template.registerHelper('getHeroesName', function (heroid) {
    if (heroid) {
        var res = Heroes.findOne({id: +heroid});
        if (res) {
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
