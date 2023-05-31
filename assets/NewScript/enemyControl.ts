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
export default class enemyControl extends cc.Component {
    isalive:boolean =true
    start () {

    }

    update (dt) {

        if(this.isalive){
        this.node.y -= 300 *dt
        }
        
        if(this.node.y < 0){

            // console.log('敌机已销毁');
            
            this.node.destroy()
        }

    }
    ondie(){
        this.isalive = false
        cc.loader.loadRes("enemy0_die",cc.SpriteFrame,(err,res)=>{
            this.node.getComponent(cc.Sprite).spriteFrame =res
        })
        setTimeout(()=>{this.node.destroy()},300
            
        )
    }
}
