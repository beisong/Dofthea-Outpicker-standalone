/**
 * Created by weisong on 16/12/17.
 */
Template.registerHelper('getHeroesName', function (heroid) {
    if (heroid) {
        var res = Heroes.findOne({id: +heroid});
        // console.log(Session.get('heroesinfo'));
        if (res) {
            return res.cdn_name;
        }

    }
});

Template.registerHelper('getPickRate', function (heroid) {
    if (heroid) {
        let pickRate = localStorage.getItem('pickRate_' + heroid);
        // console.log(pickRate);
        return pickRate;
    }
});
