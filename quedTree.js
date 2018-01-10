const ARRAY_SIZE = 4;

function item(maxX, maxY, minX, minY) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.minX = minX;
    this.minY = minY;
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
        for (let node of this.quedArray) {
            if (item.maxX == node.maxX && item.minX == node.minX
                && item.maxY == node.maxY && item.minY == node.minY)
                return console.timeEnd('search time : ');

            else if ((center.centerX < node.maxX && center.centerX > node.minX)
                && (center.centerY < node.maxY && center.centerY > node.minY))
                return node.search(item, center);
                
            else
                return console.timeEnd('nothing : ');
        }
    }

}

item.prototype = {
    devide: function (item) {

    },
    getCenter: function (item) {
        return {
            centerX: this.maxX - this.minX,
            centerY: this.maxY - this.minY
        }
    }
}