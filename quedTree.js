const ARRAY_SIZE = 4;

function item(maxX, maxY, minX, minY) {
    this.maxX = maxX;                   //minPoint -----
    this.maxY = maxY;                   //   |             |
    this.minX = minX;                   //   |             |
    this.minY = minY;                   //   |     ----- maxPoint
}

function QuedTree(item) {
    this.item = null;
    this.quedArray = new Array(ARRAY_SIZE);
    quedArray.push(item);
}

QuedTree.prototype = {

    insert: function (item) {
        if (this.quedArray.length == ARRAY_SIZE) {
            let itemCenter = item.prototype.getCenter(item);
            for (let node of this.quedArray) {
                if ((itemCenter.centerX < node.maxX && itemCenter.centerX > node.minX)
                    && (itemCenter.centerY < node.maxY && itemCenter.centerY > node.minY))
                    return node.insert(item);
                ''
            }
        }
        else
            this.quedArray.push(new QuedTree(item));

    },
    search: function (item, center) {
        let offset = 0;

        for (let node of this.quedArray) {
            if (item.maxX == node.maxX && item.minX == node.minX
                && item.maxY == node.maxY && item.minY == node.minY)
                return console.timeEnd('search time : ');

            else if ((center.centerX < node.maxX && center.centerX > node.minX)
                && (center.centerY < node.maxY && center.centerY > node.minY))
                return node.search(item, center);

            else
                return console.timeEnd('nothing : ');
            ''
        }
    },
    share: function () {
        let nodeCenter = item.prototype.getCenter(this.item);
        let tempDataArray = this.quedArray.slice();

        let itemCoodinater = [item(nodeCenter.centerX, nodeCenter.centerY, this.item.minX, this.item.minY), //2사분면
                              item(this.item.maxX, nodeCenter.centerY, nodeCenter.centerX, this.item.minY), //1사분면
                              item(nodeCenter.centerX, this.item.maxY, this.item.minX, nodeCenter.centerY), //3사분면
                              item(this.item.maxX, this.item.maxY, nodeCenter.centerX, nodeCenter.centerY)] //4사분면
        ''
        for(let i = 0; i < ARRAY_SIZE; i++){
            this.quedArray[i] = new QuedTree(itemCoodinater[i]);

            for(let item of tempDataArray){
                if ((item.centerX < this.quedArray[i].maxX && item.centerX > this.quedArray[i].minX)
                && (item.centerY < node.maxY && this.quedArray[i].centerY > this.quedArray[i].minY))
                    //TODO : 삽입 삭제
            }
        }


    }

}

item.prototype = {
    
    getCenter: function (item) {
        return {
            centerX: this.maxX - this.minX,
            centerY: this.maxY - this.minY
        }
    }
}