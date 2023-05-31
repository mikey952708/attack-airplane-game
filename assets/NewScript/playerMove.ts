// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class playerMove extends cc.Component {

    @property(cc.Prefab)
    bulletPre:cc.Prefab=null

    start () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            this.node.setPosition(event.getLocation())   
        })
        this.schedule(()=>{
            let bullet = cc.instantiate(this.bulletPre)
        bullet.setParent(cc.director.getScene())
        bullet.x = this.node.x
        bullet.y = this.node.y + 60},0.5)

        cc.director.getCollisionManager().enabled =true
        



    }

    update (dt) {
      

    }
}
