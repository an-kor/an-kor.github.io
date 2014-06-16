App.showIntro = function(){
    if (!window.localStorage || !window.localStorage.getItem("instructionsShown")){
        var template = T.byId('instructions-template').innerHTML;
        template = template.replace('%TITLE%', Messages.instructionsTitle);
        template = template.replace('%MSG_H%', Messages.instructionsHorizontal);
        template = template.replace('%MSG_V%', Messages.instructionsVertical);
        T.byId('page-on-top').innerHTML = template;
        T.byId('page-on-top').style.display = 'block';
    }
};
App.hideIntro = function(){
    try{
        window.localStorage.setItem("instructionsShown", 1);
    } catch(e) {}
    T.byId('page-on-top').innerHTML = '';
    T.byId('page-on-top').style.display = 'none';
};