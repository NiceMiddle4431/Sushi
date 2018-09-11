var PlayScene = cc.Scene.extend({
    sushiSprites: null,
    score: 0,
    time: 60,
    timeLabel: null,
    scoreLabel: null,
    ctor: function () {
        this._super();
        //精灵数组
        this.sushiSprites = [];
        //背景
        var bgLayout = new BGLayout();
        this.addChild(bgLayout);
        //分数面板
        this.scoreLabel = new cc.LabelTTF("分数:" + this.score, "楷体", 45);
        this.scoreLabel.x = cc.winSize.width - 150;
        this.scoreLabel.y = cc.winSize.height - 50;
        this.addChild(this.scoreLabel);
        //时间面板
        this.timeLabel = new cc.LabelTTF("时间:" + this.time, "楷体", 45);
        this.timeLabel.x = cc.winSize.width - cc.winSize.width + 150;
        this.timeLabel.y = cc.winSize.height - 50;
        this.addChild(this.timeLabel);
        //添加Sushi
        this.schedule(this.Sushi, 0.7, 80, 0);
        //检测没点击的Sushi并消除
        this.schedule(this.removeSushi, 0.3, 1000, 0);
        //时间数值减少
        this.schedule(this.subTime,1,59,1);
    },
    //增加Sushi，位置随机，同时放入数组中，并添加掉落动画
    Sushi: function () {
        var sushi = new SushiSprite();
        sushi.x = sushi.width / 2 + (cc.winSize.width - sushi.width) * cc.random0To1();
        sushi.y = cc.winSize.height - sushi.height / 2;
        this.addChild(sushi);
        this.sushiSprites.push(sushi);
        var moveTo = cc.moveTo(3, cc.p(sushi.x, 60));
        sushi.runAction(moveTo);
    },
    //对数组中的Sushi检测，低于70的移除
    removeSushi: function () {
        for (var i = 0; i < this.sushiSprites.length; i++) {
            if (130 >= this.sushiSprites[i].y) {
                this.sushiSprites[i].removeFromParent();
                this.sushiSprites[i] = undefined;
                this.sushiSprites.splice(i, 1);
                i = i - 1;
                console.log(this.sushiSprites[i]);
            }
        }
    },
    //更新分数面板
    addScort: function () {
        this.score++;
        this.scoreLabel.setString("分数:" + this.score);
        console.log(this.score);
    },
    //更新时间
    subTime: function () {
        this.time--;
        this.timeLabel.setString("时间:"+this.time);
    }
});
    //添加背景
var BGLayout = cc.Layer.extend({
    onEnter: function () {
        this._super();
        var bg_png = new cc.Sprite(res.backGround_png);
        bg_png.x = cc.winSize.width / 2;
        bg_png.y = cc.winSize.height / 2;
        this.addChild(bg_png);
    }
})
