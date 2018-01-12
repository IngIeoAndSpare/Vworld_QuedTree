const ARRAY_SIZE = 4;

function item(maxX, maxY, minX, minY) {
    this.maxX = maxX;                   //minPoint -----
    this.maxY = maxY;                   //   |             |
    this.minX = minX;                   //   |             |
    this.minY = minY;                   //   |     ----- maxPoint
}

function QuedTree(item) {
    this.item = item;
    this.leaf = true;
    this.quedArray = new Array();
}

QuedTree.prototype = {

    insert: function (item) {
        if (this.quedArray.length == ARRAY_SIZE) {
            if (this.leaf) {
                this.share();
            }
            let itemCenter = item.getCenter();
            for (let node of this.quedArray) {
                if ((itemCenter.centerX < node.maxX && itemCenter.centerX > node.minX)
                    && (itemCenter.centerY < node.maxY && itemCenter.centerY > node.minY))
                    return node.insert(item);
                ''
            }
        }
        else
            this.quedArray.push(item);

    },
    search: function (item, center) {
        let offset = 0;

        for (let node of this.quedArray) {
            if (item.maxX == node.maxX && item.minX == node.minX
                && item.maxY == node.maxY && item.minY == node.minY)
                return console.timeEnd('search time : ');

            else if ((center.centerX < node.item.maxX && center.centerX > node.item.minX)
                && (center.centerY < node.item.maxY && center.centerY > node.item.minY) && !(this.leaf))
                return node.search(item, center);

            else
                return console.timeEnd('nothing : ');
            ''
        }
    },
    share: function () {
        this.leaf = false;

        let nodeCenter = this.item.getCenter();
        let tempDataArray = this.quedArray.slice();

        let itemCoodinater = [new item(nodeCenter.centerX, nodeCenter.centerY, this.item.minX, this.item.minY), //2사분면
                              new item(this.item.maxX, nodeCenter.centerY, nodeCenter.centerX, this.item.minY), //1사분면
                              new item(nodeCenter.centerX, this.item.maxY, this.item.minX, nodeCenter.centerY), //3사분면
                              new item(this.item.maxX, this.item.maxY, nodeCenter.centerX, nodeCenter.centerY)] //4사분면
        ''
        for (let i = 0; i < ARRAY_SIZE; i++) {
            this.quedArray[i] = new QuedTree(itemCoodinater[i]);
            let offset = 0;
            for (let item of tempDataArray) {
                if ((item.centerX < this.quedArray[i].item.maxX && item.centerX > this.quedArray[i].item.minX)
                    && (item.centerY < this.quedArray[i].item.maxY && item.centerY > this.quedArray[i].item.minY)) {
                    this.quedArray[i].quedArray.push(item);
                    tempDataArray.splice(offset, 1);
                    break;
                }
                offset++;
            }
        }
    },

}

item.prototype = {

    getCenter: function () {
        return {
            centerX: Number(((this.maxX + this.minX) / 2).toFixed(9)),
            centerY: Number(((this.maxY + this.minY) / 2).toFixed(9))
        }
    }
}