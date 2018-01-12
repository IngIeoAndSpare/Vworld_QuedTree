const ARRAY_SIZE = 4;

function item(minX, minY, maxX, maxY) {
    this.minY = minY;                             //     + ----------- max
    this.minX = minX;                             //     |             |
    this.maxX = maxX;                             //     |             |
    this.maxY = maxY;                             //   min ------------+
}

function QuedTree(item) {
    this.item = item;
    this.leaf = true;
    this.child = [];
}

QuedTree.prototype = {

    insert: function (item) {
        if (this.child.length == ARRAY_SIZE && !(this.leaf)) {
            let itemCenter = item.getCenter();
            let offset = this.devide(itemCenter, this.item.getCenter());
            return this.child[offset].insert(item);
        }
        else {
            this.child.push(item);
            if (this.child.length == 4)
                this.share();
            ''
        }


    },
    search: function (item, center) {
        let offset = 0;

        for (let node of this.child) {
            if (item.maxX == node.maxX && item.minX == node.minX
                && item.minY == node.minY && item.maxY == node.maxY)
                return console.timeEnd('search time : ');

            else if ((center.centerX < node.item.maxX && center.centerX > node.item.minX)
                && (center.centerY > node.item.minY && center.centerY < node.item.maxY) && !(this.leaf))
                return node.search(item, center);

            else
                return console.timeEnd('nothing : ');
            ''
        }
    },

    share: function () {
        this.leaf = false;

        let nodeCenter = this.item.getCenter();
        let tempDataArray = this.child.slice();
        let itemCoodinater = [
            new item(nodeCenter.centerX, nodeCenter.centerY, this.item.maxX, this.item.maxY), //1사분면
            new item(this.item.minX, nodeCenter.centerY, nodeCenter.centerX, this.item.maxY), //2사분면
            new item(this.item.minX, this.item.minY, nodeCenter.centerX, nodeCenter.centerY), //3사분면
            new item(nodeCenter.centerX, this.item.minY, this.item.maxX, nodeCenter.centerY)  //4사분면
        ]

        for (let i = 0; i < 4; i++)
            this.child[i] = new QuedTree(itemCoodinater[i]);
        ''
        for (let item of tempDataArray) {
            let itemCenter = item.getCenter();
            let offset = this.devide(itemCenter, nodeCenter);

            this.child[offset].insert(item);
        }

    },
    devide: function (itemCenter, nodeCenter) {

        let offset;
        if (itemCenter.centerX < nodeCenter.centerX) {
            if (itemCenter.centerY < nodeCenter.centerY) //3
                offset = 2;
            else //2
                offset = 1;
        }
        else {
            if (itemCenter.centerY < nodeCenter.centerY) //4
                offset = 3;
            else //1
                offset = 0;
        }
        return offset;
    }

}

item.prototype = {

    getCenter: function () {
        return {
            centerX: Number(((this.minX + this.maxX) / 2).toFixed(9)),
            centerY: Number(((this.minY + this.maxY) / 2).toFixed(9))
        }
    }
}