////////////////////////////////////
///  This is the collection of
///  all JSON data parser.
///////////////////////////////////


////////////////////////////////////
///  Bus Routes Data Loading
///////////////////////////////////

var loadBusRoutesData = function(dataset, layer){


    var marker = new Array();


    var objects = [];

    for (var i in dataset) {
        var busID = dataset[i].Id;
        var busToolTipText = dataset[i].Metadata[0].Value;

//        console.log(busID);

        var busLine = dataset[i].Geography.Geographies;

        for (var j in busLine){
//            if (!busLine.hasOwnProperty(i)) continue;

            var busLineRoute = busLine[j].Locations;

            var busRoutePath = new L.polyline(new L.LatLng(50.5, 30.5));

            busLineRoute.forEach(function(d) {

                busRoutePath.addLatLng([d.Y, d.X]);

//                console.log(d.Y + ' ' + d.X);
            });

            marker.push(busRoutePath);

        }
    }

    L.layerGroup(marker)
        .addTo(layer);

};