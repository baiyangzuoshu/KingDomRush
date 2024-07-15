import { Component, error, instantiate, Mask, Prefab, ScrollView, Size, UITransform, v2, v3, Vec3, _decorator } from "cc";
// import { CCPoolManager } from "../pool/CCPoolManager";

const { ccclass, property, requireComponent } = _decorator;

@ccclass
@requireComponent(ScrollView)
/**
 * 1. listview 思想
 * 2. 根据item的宽高和content的宽高还有间距计算列数或者行数
 * 3. 会打断合批
 */
export default class GridListView extends Component {

    //预制体文件
    @property(Prefab)
    public Prefab: Prefab = null;

    //如果使用对象池，需要自己做好初始化工作
    @property
    poolKey: string = ''

    @property({
        type: Component.EventHandler,
        displayName: "内容处理函数"
    })
    public delegate = new Component.EventHandler();


    @property({
        type: Component.EventHandler,
        displayName: "初始化结束"
    })
    initFinish = new Component.EventHandler();    

    @property({
        type: Component.EventHandler,
        displayName: "更新函数"
    })
    delegateUpdate = new Component.EventHandler();

    //道具总个数
    @property
    public totalCount: number = 0;

    @property
    public spaceX: number = 5;

    @property
    public spaceY: number = 5;

    //缓存对象
    protected buffList: Node[] = []

    protected ScrollView: ScrollView;

    //ScrollView 的content 
    protected content: Node|any;

    //当前显示的内容
    protected items: any[] = [];

    //最后的位置
    protected lastContentPos: number = 0;

    //根据计算获得的content的宽度或者高度
    protected contentSize: number = 0;
    //位置指针
    protected position_back: number = 0;
    //位置指针
    protected position_front: number = 0;

    protected offset: number = 0;

    //可见区域的宽或者高
    protected bufferSize: number = 0;

    //道具宽或者高+间距
    protected itemSize: number = 0;

    protected spaceSize: number = 0;


    protected bufferZone: number = 0;

    //默认是一行或者一列
    protected cellNum: number = 1;

    //需要显示的行数或者列数 根据道具总数和 每行显示个数得到
    protected needCount: number = 0;

    onLoad(): void {
        if (this.poolKey) {
            // log("使用对象池 ", this.poolKey)
            // CCPoolManager.instance().init(this.poolKey,this.Prefab,6);
        }
        this.ScrollView = this.getComponent(ScrollView)
        if (this.ScrollView && this.Prefab) {
            this.content = this.ScrollView.content;
            this.content.removeAllChildren()
            this.ScrollView.node.on('scrolling', this.updateItem, this);
            this.init();
        }
    }

    startA(): void {
        if (this.poolKey) {
            // log("使用对象池 ", this.poolKey)
            // CCPoolManager.instance().init(this.poolKey,this.Prefab,6);
        }
        this.ScrollView = this.getComponent(ScrollView)
        if (this.ScrollView && this.Prefab) {
            this.content = this.ScrollView.content;
            this.content.removeAllChildren()
            this.ScrollView.node.on('scrolling', this.updateItem, this);
            this.init();
        }
    }



    onDestroy(): void {
        this.clear();
    }


    //长度改变后的 重置
    reset(totalCount: number): void {
        this.ScrollView.stopAutoScroll();
        //没有用到对象池，所以当内容比之前少的时候需要移除，所以就直接移除了。
        this.clear();
        this.totalCount = totalCount;
        this.init();
        if (this.ScrollView.vertical) {
            this.ScrollView.scrollToTop();
        } else {
            this.ScrollView.scrollToLeft();
        }
    }

    //主动调用更新内容
    updateItems(): void {
        if (this.delegateUpdate) {
            for (let index = 0; index < this.items.length; index++) {
                let element = this.items[index];
                this.delegateUpdate.emit([element]);
            }
        }
    }

    protected clear(): void {
        if (this.items && this.items.length > 0) {
            this.items.forEach(element => {
                // element.opacity = 0;
                this.setItemActive(element, false)
                this.putItem(element);
            });
        }
        this.items.length = 0;
    }

    //回收节点
    protected putItem(item) {
        if (this.poolKey) {
            // CCPoolManager.instance().put(item)
        } else {
            this.buffList.push(item)
        }

    }

    //获得节点 可以修改为通过对象池获取。
    protected getItem():Node|any|null {
        if (this.poolKey) {
            // return CCPoolManager.instance().get(this.poolKey)
        } else {
            if (this.Prefab) {
                return this.buffList.length > 0 ? this.buffList.shift() : instantiate(this.Prefab)
            } else {
                error(' 预制体没有赋值 ')
                return null;
            }
        }
    }

    protected init() {
        // log('========init===============')
        this.initParam()
        this.addItems()
    }

    /**
     * 初始化用到的参数
     */
    protected initParam() {
        // log('道具总数   ', this.totalCount)
        // let bufferSize = 0;// 显示区域的大小。
        this.position_back = -1;
        this.position_front = 0;
        let temp = this.getItem()
        this.itemSize = 0;
        let visibleWidth: number = 0;
        let view: Node|any = null;
        for (let index = 0; index < this.ScrollView.node.children.length; index++) {
            const element = this.ScrollView.node.children[index];
            if (element.getComponent(Mask)) {
                view = element;
                break;
            }
        }

        if (!view) {
            error('不能没有Mask组件')
            return;
        }

        let ui = this.content;
        let tranUI = ui.getComponent(UITransform)
        let tranTemp = temp.getComponent(UITransform)
        let tranView = view.getComponent(UITransform)
        let contentSize = tranUI.contentSize;
        let tempSize = tranTemp.contentSize;
        let viewSize = tranView.contentSize;
        if (this.ScrollView.vertical) { //垂直
            this.itemSize = (tempSize.height + this.spaceY);
            this.spaceSize = (tempSize.width + this.spaceX);
            this.bufferSize = viewSize.height;

            tranUI.setContentSize(new Size(viewSize.width,contentSize.height));
            tranUI.setAnchorPoint(v2( 0.5,1));
            this.content.setPosition(v3(0,viewSize.height / 2));
            visibleWidth = contentSize.width;

        } else { //水平
            this.itemSize = (tempSize.width + this.spaceX);
            this.spaceSize = (tempSize.height + this.spaceY);
            this.bufferSize = viewSize.width;
            tranUI.setContentSize(new Size(contentSize.width,viewSize.height));
            tranUI.setAnchorPoint(v2( 0,0.5));
            this.content.setPosition(v3(viewSize.width / 2,0));
            visibleWidth = contentSize.height;
        }


        this.cellNum = Math.floor(visibleWidth / this.spaceSize)
        if (this.cellNum <= 0) {
            this.cellNum = 1;
        }
        // log('可视区域宽度  ', visibleWidth, ' 道具宽度+间距 ', this.itemSize, '  应该显示列数 ', this.cellNum)
        this.putItem(temp)

        this.bufferSize += this.itemSize;// 多生成一个用于平滑显示。
        let size = Math.floor(this.totalCount / this.cellNum);

        this.needCount = this.totalCount % this.cellNum != 0 ? size + 1 : size;
        // log('应该显示行数：   ', this.needCount)
        this.contentSize = this.needCount * this.itemSize;

        if (this.ScrollView.vertical) {//垂直
            tranUI.setContentSize(new Size(contentSize.width,this.contentSize));
        } else { //水平
            tranUI.setContentSize(new Size(this.contentSize,contentSize.height));
        }

        this.ScrollView.scrollTo(v2(0, 1), 0);
    }

    /**
     * 添加道具
     */
    protected addItems() {
        // log('=========addItems1============')
        let bufferSize = this.bufferSize;
        let size = Math.floor(bufferSize / this.itemSize);
        //实际需要显示的行数或者列数
        let spawnCount = bufferSize % this.itemSize == 0 ? size : size + 1;
        if (spawnCount > this.needCount) {
            spawnCount = this.needCount;
        }
        // log('实际显示行数   ', spawnCount)
        let letx = 0
        if (this.ScrollView.vertical) {
            letx = 0 - ((this.cellNum - 1) * this.spaceSize) / 2;
        } else {
            letx = ((this.cellNum - 1) * this.spaceSize) / 2;
        }

        for (let i = 0; i < spawnCount; i++) {
            this.position_back++;
            for (let j = 0; j < this.cellNum; j++) {
                let item: Node|any = this.getItem()
                let tanItem = item.getComponent(UITransform)
                this.addChild(item);
                this.items.push(item);
                let size = tanItem.contentSize;
                let pos = this.position_back * this.cellNum + j
                if (pos >= this.totalCount) {
                    // item.opacity = 0;
                    this.setItemActive(item, false)
                } else {
                    if (this.ScrollView.vertical) {
                        let posy = -(size.height + this.spaceY) * (0.5 + i)
                        let posx = letx + (size.width + this.spaceX) * j;
                        this.setItemPosition(item, posx, posy)
                    } else {
                        let posx = (size.width + this.spaceX) * (0.5 + i)
                        let posy = letx - (size.height + this.spaceY) * j;
                        this.setItemPosition(item, posx, posy)
                    }
                    this.delegate.emit([this, pos, item]);
                }
            }
        }

        let s = this.items.length / this.cellNum;
        s = this.items.length % this.cellNum == 0 ? s : s + 1;
        this.offset = this.itemSize * s;
        this.bufferZone = this.bufferSize / 2;
        if(this.initFinish){
            this.initFinish.emit([this])
        }

        // console.log('=============addItems2=================', this.items.length)
        if(this.items.length > 0){
            // log('=============addItems3============', this.items[0].position)
        }
    }

    protected setItemPosition(item: Node|any, posx: number, posy: number, posz: number = 0) {
        item.setPosition(posx, posy,posz);
    }

    protected setItemPositionX(item: Node|any, x: number): void {
        let pos = item.position
        item.setPosition(x, pos.y,pos.z);
    }
    protected setItemPositionY(item: Node|any, y: number): void {
        let pos = item.position
        item.setPosition(pos.x, y,pos.z);
    }

    // protected setItemOpacity(item: Node, opacity) {
    //     item.opacity = opacity
    // }

    protected setItemActive(item: Node|any, flag:boolean) {
        item.active = flag;
    }

    protected addChild(item) {
        if (!item.parent) {
            this.content.addChild(item);
        } else {
            this.setItemActive(item, true)
        }
    }

    protected getPositionInView(item:Node|any): Vec3 { // get item position in ScrollView's node space
        let worldPos = item.worldPosition;
        let viewPos = this.ScrollView.node.worldPosition
        // let viewPos = this.ScrollView.node.convertToNodeSpaceAR(worldPos);
        let resPos  = v3(worldPos.x - viewPos.x, worldPos.y - viewPos.y,0)
        return resPos;
    }

    protected updateItem() {
        let items = this.items;
        let isDown = false;
        if (this.ScrollView.vertical) {
            isDown = this.ScrollView.content.position.y < this.lastContentPos; //   
        } else {
            isDown = this.ScrollView.content.position.x > this.lastContentPos; //
        }
        // log('=======isDown==========',isDown,this.bufferZone,this.contentSize,this.offset)
        for (let i = 0; i < this.items.length; i += this.cellNum) {
            //把每一列或者每一行的第一个道具拿出来做比较
            if (items[i]) {
                // console.log('=========updateItem==========',items[i].position)
                let viewPos:Vec3 = this.getPositionInView(items[i]);
                // console.log('=========updateItem1==========',viewPos)
                // console.log(' i =====  ', i)
                if (this.ScrollView.vertical) {
                    if (isDown) {
                        if (viewPos.y < - this.bufferZone && items[i].position.y + this.offset < 0) {
                            this.position_front--;
                            this.position_back--;
                            for (let j = 0; j < this.cellNum; j++) {
                                let item: Node|any = items[i + j]
                                if (item) {
                                    this.setItemPositionY(item, item.position.y + this.offset)
                                    let pos = this.position_front * this.cellNum + j;
                                    if (!item.active) {
                                        this.setItemActive(item, true)
                                    }
                                    this.delegate.emit([this, pos, item]);
                                }
                            }
                        }
                    } else {
                        if (viewPos.y > this.bufferZone && items[i].position.y - this.offset > -this.contentSize) {
                            this.position_front++;
                            this.position_back++;
                            // log('======向下滑动=========',viewPos.y,this.bufferZone,items[i].position.y,this.offset,this.contentSize)
                            for (let j = 0; j < this.cellNum; j++) {
                                const item = items[i + j];
                                if (item) {
                                    this.setItemPositionY(item, item.position.y - this.offset)
                                    let pos = this.position_back * this.cellNum + j
                                    if (pos >= this.totalCount) {
                                        this.setItemActive(item, false)
                                    } else {
                                        if (!item.active) {
                                            this.setItemActive(item, true)
                                        }
                                        this.delegate.emit([this, pos, item]);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (isDown) {//向右滑动
                        if (viewPos.x > this.bufferZone && items[i].position.x - this.offset > 0) {
                            this.position_front--;
                            this.position_back--;
                            for (let j = 0; j < this.cellNum; j++) {
                                const item = items[i + j];
                                if (item) {
                                    if (!item.active) {
                                        this.setItemActive(item, true)
                                    }
                                    this.setItemPositionX(item, item.position.x - this.offset)
                                    this.delegate.emit([this, this.position_front * this.cellNum + j, item]);
                                }
                            }
                        }
                    } else {
                        if (viewPos.x < - this.bufferZone && items[i].position.x + this.offset < this.contentSize) {
                            // console.log('======向左滑动=========')
                            this.position_front++;
                            this.position_back++;
                            for (let j = 0; j < this.cellNum; j++) {
                                const item = items[i + j];
                                if (item) {
                                    this.setItemPositionX(item, item.position.x + this.offset)
                                    let pos = this.position_back * this.cellNum + j
                                    if (pos >= this.totalCount) {
                                        this.setItemActive(item, false)
                                    } else {
                                        if (!item.active) {
                                            this.setItemActive(item, true)
                                        }
                                        this.delegate.emit([this, pos, item]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.ScrollView.vertical) {
            this.lastContentPos = this.ScrollView.content.position.y;
        } else {
            this.lastContentPos = this.ScrollView.content.position.x;
        }
    }

    /**
     * 移动到指定行或者列
     * 时间不能为 0
     * @param pos 从 0 开始 
     * @param time 
     */
    scrollToOffset(pos: number, time: number = 1): void {
        if (!this.ScrollView) {
            return;
        }
        let offset = v2()
        if (this.ScrollView.vertical) {
            offset.y = pos * this.itemSize;
        } else {
            offset.x = pos * this.itemSize;
        }
        this.ScrollView.scrollToOffset(offset, time)
    }

    /**
     * 移动到底部
     * 时间不能为 0
     * @param time 
     */
    scrollToBottom(time: number = 1) {
        if (!this.ScrollView) {
            return;
        }
        this.ScrollView.scrollToBottom(time)
    }

    /**
     * 移动到顶部
     * 时间不能为 0
     * @param time 
     */
    scrollToTop(time: number = 1) {
        if (!this.ScrollView) {
            return;
        }
        this.ScrollView.scrollToTop(time)
    }
    /**
     * 删除指定节点。
     * 更新此节点后的所有节点
     * 根据剩余节点的个数调整位置。
     * @param item 
     */
    remove(item: Node) {

    }
}