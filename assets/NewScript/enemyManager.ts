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
export default class enemyManager extends cc.Component {

    @property(cc.Prefab)
    enemyPre:cc.Prefab

    start () {
        this.schedule(()=>{
            let enemy = cc.instantiate(this.enemyPre)
            enemy.setParent(cc.director.getScene())
            enemy.y =this.node.y
            enemy.x =Math.random()*400 + 40
        },0.5)

        
    }

    // update (dt) {}
}
