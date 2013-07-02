////////////////////////////////////
///  This is the collection of
///  all JSON data parser.
///////////////////////////////////


////////////////////////////////////
/// Bus Route Color
////////////////////////////////////
var busRouteColorScheme = [
        "#6400",
        "#DC143C",
        "#8B",
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
        "#FFFF",
        "#98FB98",
        "#D2691E",
        "#800000",
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
        "#0",
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
                {color: busRouteColorScheme[i-1],
                    title: busToolTipText,
                    opacity: 1.0,
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