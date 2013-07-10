////////////////////////////////////
///  This is the collection of
///  all JSON data parser.
///////////////////////////////////



////////////////////////////////////
/// City Selector
////////////////////////////////////


var loadCitySelectData = function(dataset){
    //select city data for the map initial view setting
    for (i in dataset){

        if (dataset[i].id == id) {

        }

    }
};


////////////////////////////////////
/// Bus Route Color
////////////////////////////////////
var busRouteColorScheme = [
    "#006400",
    "#DC143C",
    "#00008B",
    "#7FFF00",
    "#8B4513",
    "#4169E1",
    "#2E8B57",
    "#B0E0E6",
    "#FFD700",
    "#FF6347",
    "#646464",
    "#FF69B4",
    "#1E90FF",
    "#7FFFD4",
    "#B8860B",
    "#CD5C5C",
    "#FF00FF",
    "#7B68EE",
    "#00FFFF",
    "#98FB98",
    "#D2691E",
    "#80000",
    "#8B008B",
    "#483D8B",
    "#8B8B",
    "#FFFF00",
    "#BDB76B",
    "#FFA500",
    "#FF7F50",
    "#BA55D3",
    "#FF",
    "#87CEFA",
    "#FC7F",
    "#FFDAB5",
    "#6B8E23",
    "#FFA07A",
    "#FF0000",
    "#C0C0C0",
    "#000000",
    "#E6E6E6"
];

////////////////////////////////////
///  Bus Routes Data Loading
///////////////////////////////////

var loadBusRoutesData = function(dataset, layer){



    var marker = new Array();
    var objects = [];

    for (var i in dataset) {
        var busID = dataset[i].Id;
        var busToolTipText = dataset[i].Metadata[0].Value;

        console.log(i);

//        console.log(busID);

        var busLine = dataset[i].Geography.Geographies;

        for (var j in busLine){
//            if (!busLine.hasOwnProperty(i)) continue;

            var busLineRoute = busLine[j].Locations;

            var busRoutePath = new L.polyline(new L.LatLng(50.5, 30.5),
                {color: busRouteColorScheme[i],
                    title: busToolTipText,
                    opacity: 0.9,
                    weight: 5});
            busRoutePath.bindPopup(busToolTipText);

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