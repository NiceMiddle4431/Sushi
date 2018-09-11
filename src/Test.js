var Test = cc.Layer.extend({
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.sushi_plist, res.sushi_png);
        var sushi = new cc.Sprite("#sushi_1n.png");
        sushi.x = cc.winSize.width / 2;
        sushi.y = cc.winSize.height / 2;
        this.addChild(sushi);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.reverseControlPoints(target.getBoundingBox(), pos)) {
                    console.log("点击到了");
                    var frames = [];

                    for (var i = 0; i < 11; i++) {
                        var frame = cc.spriteFrameCache.getSpriteFrame("sushi_1n_" + i + ".png");
                        cc.log(frame);
                        frames.push(frame);
                    }
                    console.log(frames);
                    var animation = new cc.Animation(frames, 0.15);
                    var animate = cc.animate(animation);
                    sushi.runAction(animate);
                    console.log("动画执行");
                }
            }
        })
        cc.eventManager.addListener(listener, sushi);
    },
    onEnter: function () {
        this._super();

    }

})