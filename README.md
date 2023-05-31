# 打飞机Demo
## 打飞机Demo

#### 0.准备工作

版本：Cocos Creater2.0.4 在官网下载后，用Cocos Dashboard导入管理

编辑器：VS Code，用TypeScript语言

素材：B站，码云

#### 1.BackGround模块（背景）

用两块相同的背景拼接出二倍于Canvas的尺寸，放在空节点bgNode上

确定bg的运动方向为向下运动，代码如下

~~~javascript
update(dt) {
        for (let bgNode of this.node.children) {
            bgNode.y -= 1000 * dt
            if (bgNode.y < -850) {
                bgNode.y += 850*2
            }
        }
    }
~~~

#### 2.Bullet模块（子弹）

2.1将bullet图片拖入层级管理器，加上刚性碰撞模块（box.Collider）

2.2将bullet模块拖入资源管理器，生成预制体（Prefub）拖入层级管理器，删除原模块

2.3确定bullet的运动方向向上，运动速度为800*dt

~~~javascript
export default class bulletControl extends cc.Component {
    @property
    speed:number=800
    start () {}
    update (dt) {
        this.node.y += this.speed * dt
        if(this.node.y >820 ){
            this.node.destroy()
        }
    }
   onCollisionEnter(other){
        console.log('子弹碰撞了');
        if(other.tag == 1){
            //销毁敌人
            other.getComponent(enemyControl).ondie()
            //销毁自己
            this.node.destroy()
        }
}
~~~

#### 3.Player模块（飞机）

将player的图片拖入场景，给其加上刚性碰撞模块

在代码中导入bullet预制体

~~~javascript
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
~~~

#### 4.Enemy模块

将enemy拖入层级管理器，敌机向下运动，并于 y<0 后销毁

~~~javascript
@ccclass
export default class enemyControl extends cc.Component {
    isalive:boolean =true
    start () {}
    update (dt) {
        if(this.isalive){this.node.y -= 300 *dt}
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
~~~

#### 5.EnemyManager模块（敌机生成）

在enemy节点上生成次级空节点enemyManager，将enemy节点生成预制体后删除，用代码实现敌机用上方随机X轴生成

~~~javascript
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
~~~




