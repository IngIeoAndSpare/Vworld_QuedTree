function convertPoint(coorSet) {
    let offset = 0;
    let tempArray = [];
    for (let item of coorSet) {
        tempArray[offset] = ol.proj.transform([item[1], item[0]], 'EPSG:4326', 'EPSG:3857');
        offset++;
    }
    pushDataOnRbus(tempArray);
    return tempArray;
}

//maxX, maxY, minX, minY
function pushDataOnRbus(coor) {

    tree.insert(new item(coor[0][0], coor[0][1], coor[2][0], coor[2][1]));
    //vectorSourceForRbush = new ol.source.Vector({ projection: 'EPSG:4326', wrapX: false });
    //vectorLayerForRbush = new ol.layer.Vector({ source: vectorSourceForRbush });
    //treeVisual(tree.data);

}

function treeVisual(node) {
    let item = {
        maxX: node.maxX,
        maxY: node.maxY,
        minX: node.minX,
        minY: node.minY
    }
    let coorSet = [[item.minX, item.minY], [item.maxX, item.minY], [item.maxX, item.maxY], [item.minX, item.maxY]];
    draw(coorSet, vectorLayerForRbush, vectorSourceForRbush, '#11cc00', undefined);
    if (!node.leaf) {
        for (let children of node.children) {
            if (children.leaf == undefined)
                continue;
            else
                treeVisual(children);
            ''
        }
    }
}


function draw(coorSet, layer, src, stColor, flColor) {

    var polygonGeom = new ol.geom.Polygon([coorSet]);
    var feature = new ol.Feature({ geometry: polygonGeom });
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: stColor
        }),
        fill: new ol.style.Fill({
            color: flColor
        })
    });

    feature.setStyle(style);
    src.addFeature(feature);
}

function getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(7);
}
/*
 시작 좌표 37.2907675,125.4591496
 끝 좌표   34.7324634,130.0639961
*/
function randClusterPoint() {
    var x = Number(getRandomArbitrary(39.6295437, 32.9409019)),
        y = Number(getRandomArbitrary(124.4191746, 132.2879115));

    return [[x, y], [x + SIZE, y], [x + SIZE, y +SIZE], [x , y + SIZE]];
}
