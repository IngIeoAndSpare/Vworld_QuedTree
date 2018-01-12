window.addEventListener('load', init);
const SIZE = 0.25;
var INSERT_NUMBER;

//TODO : 좌표 적당히 지정  (backX, backY, frontX, frontY)
/*
 시작 좌표 37.2907675,125.4591496  [13966048.648829132, 4479713.895347519]
 끝 좌표   34.7324634,130.0639961 [14478657.81639032, 4127583.163641331]
 [[x, y], [x + SIZE, y], [x + SIZE, y + SIZE], [x, y + SIZE]];
*/
var tree = new QuedTree(new item(14478657.81639032, 4127583.163641331, 13966048.648829132, 4479713.895347519));

var v_map;
var vectorSourceForData;
var vectorLayerForData;
var vectorSourceForRbush;
var vectorLayerForRbush;

var checkWorker;
var useWorker;

function init() {
    vw.ol3.MapOptions = {
        basemapType: vw.ol3.BasemapType.GRAPHIC,
        controlDensity: vw.ol3.DensityType.EMPTY,
        interactionDensity: vw.ol3.DensityType.BASIC,
        controlsAutoArrange: true,
        homePosition: vw.ol3.CameraPosition,
        initPosition: vw.ol3.CameraPosition,
    };
    v_map = new vw.ol3.Map(document.getElementById('vmap'), vw.ol3.MapOptions);

    vectorSourceForData = new ol.source.Vector({ projection: 'EPSG:4326', wrapX: false });
    vectorLayerForData = new ol.layer.Vector({ source: vectorSourceForData });

    vectorSourceForRbush = new ol.source.Vector({ projection: 'EPSG:4326', wrapX: false });
    vectorLayerForRbush = new ol.layer.Vector({ source: vectorSourceForRbush });

    v_map.addLayer(vectorLayerForData);
    v_map.addLayer(vectorLayerForRbush);
    document.getElementById('test').addEventListener('click', testHendler);

    //--------test
    v_map.addEventListener('click', function (e) {
        let coorder = e.coordinate;
        console.log(coorder);
    });

}


function testHendler() {
    INSERT_NUMBER = (!document.getElementById('insertNumber').value ? 10 : Number(document.getElementById('insertNumber').value));
    console.time('inset ' + INSERT_NUMBER + 'data  ');
    startDraw();
    console.timeEnd('inset ' + INSERT_NUMBER + 'data  ');
}

function startDraw() {
    if (checkWorker && useWorker) {
        let worker = new Wokrer('draw.js');
    }
    else {
        for (let i = 0; i < INSERT_NUMBER; i++) {
            let randCoor = randClusterPoint();
            let convertCoor = convertPoint(randCoor);
            draw(convertCoor, vectorLayerForData, vectorSourceForData, '#3399CC', '#ffffff');
        }
    }

}

function search(e) {
    console.time('1 pixel search');
    tree.search({
        minX: e.clientX,
        minY: e.clientY,
        maxX: e.clientX + SIZE,
        maxY: e.clientY + SIZE
    });
    console.timeEnd('1 pixel search');
}
