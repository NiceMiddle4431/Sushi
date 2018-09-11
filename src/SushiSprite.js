var SushiSprite = cc.Sprite.extend({

    //判断是否是被点击消除
    ctor: function () {
        //添加雪碧图到精灵缓冲池
        cc.spriteFrameCache.addSpriteFrames(res.sushi_plist);
        this._super("#sushi_1n.png");
        this.addTouchEventListener();//添加单点触摸事件
    },
    addTouchEventListener: function () {
        var touchListener =  cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();//触碰点的坐标
                var target = event.getCurrentTarget();//
                //检测碰撞
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.getParent().addScort();//分数更新
                    //雪碧图存放
                    var spriteframes = [];
                    for(var i = 0;i<11;i++) {
                        var frame = cc.spriteFrameCache.getSpriteFrame("sushi_1n_" + i + ".png");
                        spriteframes.push(frame);
                    }
                    target.stopAllActions();//停止之前的全部动画
                    //添加成帧动画
                    var animation = new cc.Animation(spriteframes,0.03);
                    var animate = new cc.animate(animation);
                    // target.runAction(animate);

                    //实现序列动作，先将target.removeFromParent()用CallFun包装成一个动作，然后使用sequenece
                    var removeFromParen = cc.callFunc(function () {
                        target.removeFromParent();
                    });
                    var sequence = cc.sequence(animate,removeFromParen);
                    target.runAction(sequence);

                    return true;
                }

                return false;
            },

        })
        cc.eventManager.addListener(touchListener, this);
    }
})