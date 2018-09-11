var StartScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        var backGround_png = new StartLayout();
        this.addChild(backGround_png);
        var startMenu = new StartMenu();
        this.addChild(startMenu);
    }
});

var StartLayout = cc.Layer.extend({
    onEnter: function () {
        this._super();
        var bG = new cc.Sprite(res.backGround_png);
        var size = cc.winSize;
        bG.x = size.width / 2;
        bG.y = size.height / 2;
        this.addChild(bG);
    }
});
//开始菜单设置
var StartMenu = cc.Layer.extend({
    ctor: function () {
        this._super();
        var startItem = new cc.MenuItemImage(
            res.start_N_png, res.start_S_png,
            function () {
                // cc.log("Menu is cilcked")
                cc.director.runScene(new cc.TransitionFade(1, new PlayScene()))//使用导演过渡场景
            }, this)
        var startMenu = new cc.Menu(startItem);
        var size = cc.winSize;
        startMenu.x = size.width / 2;
        startMenu.y = size.height / 2;
        this.addChild(startMenu, 1);
        }
});
