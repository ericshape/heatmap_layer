/*
 multi layer libs in Backbone js
 */

/////////////////////////////////
////  Add reference. 
/////////////////////////////////
///<reference path="GetVehicleLoad_2012-03-01_tram_120mn.js"/>
///<reference path="Cities.xml"/>

/*
 multi layer libs in Backbone js
 */
////////////////////////////////////
///  Configuration File Loading
///////////////////////////////////
//var Config = require('../../src/config.js').Config;
//var config = new Config('config_example.js');
//console.log(config.get('server.port'));

/////////////////////////////////
///  Read the JSON file for the configuration
////////////////////////////////



/////////////////////////////////
///  slider rendering
////////////////////////////////

$(document).ready(function () {
    $("#basemapslider").slider({
        animate: true,
        value: 1,
        min: 0,
        max: 1,
        step: 0.1,
        slide: function (event, ui) {
//            mapquest.setOpacity(ui.value);
//            nysdop.setOpacity(1 - ui.value);
        }
    });
    $("#zoomslider").slider({
        animate: true,
        orientation: "vertical",
        value: 12,
        min: 0,
        max: 20,
        step: 1,
        slide: function (event, ui) {
            heatmapData.mapView.draw()
        }
    });
    $(function () {
        $("button", ".layers").button();
        $("button", ".layers").click(function () {
            $("#layersdialog").dialog("open");
            return false;
        });
    });
    $.fx.speeds._default = 1000;
    $(function () {
        $("#layersdialog").dialog({
            autoOpen: false,
            title: "Cities",
            show: "fold"
        });
    });
});



/////////////////////////////////
///  Load XML file heleper function
////////////////////////////////
// If the xml is null, return the error information.
var checkXMLDocObj = function (xmlFile) {
    var xmlDoc = loadXMLDoc(xmlFile);
    if (xmlDoc == null) {
        alert('There is error to get xml file!');
    }

    return xmlDoc;
};

////////////////////////////////////
///  Bus Stops Data Loading
///////////////////////////////////

var busController = function(){

};



////////////////////////////////////
///  Bus Stops Data Loading
///////////////////////////////////

var loadBusStopsData = function(dataset, layer){

//    var marker = new Array();

    dataset.forEach(function(d) {
//        marker.push(new L.marker([d.Y, d.X], {title: d.Metadata[0].Value}));

        var marker = new L.marker([d.Y, d.X], {title: d.Metadata[0].Value});
        layer.addLayer(marker);
    });

//    L.layerGroup(marker)
//        .addTo(layer);
};

////////////////////////////////////
///  Draw Bus Moving
///////////////////////////////////


var drawBus = function (animationlayer, timestamp_id, timestamp_number, marker) {

    items = timestamp_hashtable[timestamp_number[timestamp_id]];

    //                   console.log(items);

    // creat the animation layer


    //pushing items into array each by each and then add markers
    for (var j = 0; j < items.length; j++) {
        var LamMarker = new L.marker([items[j].lat, items[j].lon]);
        marker.push(LamMarker);

    }



    L.layerGroup(marker)
        .addTo(animiationlayer);


    setTimeout(function () {

        //clear layers
        animiationLayer.clearLayers();

        //clear marker
        marker.length = 0;

        if (timestamp_number_id < timestamp_number.length) {
            timestamp_number_id++;
            drawBus(timestamp_number_id);
        }
    }, 100);

//    settime = function () {
//
//        //clear layers
//        animiationLayer.clearLayers();
//
//        //clear marker
//        marker.length = 0;
//
//        if (timestamp_number_id < timestamp_number.length) {
//            timestamp_number_id++;
//            drawBus(timestamp_number_id);
//        }
//    };

};



////////////////////////////////////
// Bus Animation Layer definition
///////////////////////////////////
var timestamp_hashtable = new Array();

var loadData = function (animiationLayer, id) {

    var animationlayer = animiationLayer;

    var routeLines = [];

    ////////////////////////////////////////////////////
    //// load bus animation data  ////////
    ////////////////////////////////////////////////////
    //var url = '../Heatmap_sample/GetVL-30mn-First100.json';

    // var json_data = {};

    //		var json_data_heatmap = [];

    //        $.getJSON( function(BusMoveData) {
    //change the xrce data format to heatmap data format
    //                console.log(BusMoveData);

    var i = 0;

    var j = 0;

    var bus_route = L.polyline([[48.70159329801663, 6.211237829048656]]);

    var pre_timestamp = 0;
    var cur_timestamp = 0;
    var LanLat_Array;

    $.each(BusMoveData, function (arrayID, value) {
        //number of entity in the JSON file.
        i++;

        var time_string = value.Date.replace(/\(|\)/g, "");

        cur_timestamp = time_string.substr(5, 13);

        if (cur_timestamp == pre_timestamp) {
            LanLat_Array.push({ "lat": value.Y, "lon": value.X });
        }
        else {
            if (LanLat_Array != null) {
                timestamp_hashtable[pre_timestamp] = LanLat_Array;
            }
            pre_timestamp = cur_timestamp;
            LanLat_Array = new Array();
        }

    });

    //                console.log(timestamp_hashtable);


    /*create array:*/
    var marker = new Array();
    var timestamp_number = [];
    var timestamp_number_id = 0;

    for (k in timestamp_hashtable) {

        timestamp_number.push(k);
    };

//    drawBus(animationlayer, timestamp_number_id, timestamp_number, marker);

};



// Define the heatmpaData
var heatmapData = heatmapData || {};

/////////////////////////
// heatmapData Model
////////////////////////
heatmapData.data = Backbone.Model.extend({
    defauts: {
        lat: -37.8833,
        lon: 145.167,
        value: 1
    }
});

/////////////////////////////
// heatmapData Collection
////////////////////////////
var heatmapDataList = Backbone.Collection.extend({
    // reference to the data model
    model: heatmapData.data,

    // store it in the local namespace storage
    //					localStorage: new Store('heatmapData-backbone'),

    // filter down the list when it complete
    completed: function () {
        return this.filter(function (heatmapdata) {
            return heatmapdata.get('completed');
        });
    },

    // Filter down the list to only heatmap that are still not finished.
    remaining: function () {
        return this.without.apply(this, this.completed());
    }

});


var heatmapdata_list = new heatmapDataList();

var map;

////////////////////////////////////
/// setMapView
////////////////////////////////////
var setMapView = function(id){

    console.log(id);

    // iteration the cities.json and find the matached ID
    for (var k in citiesSelectData.ArrayOfCity.City){
        // find the matched id
        var currentCityData =  citiesSelectData.ArrayOfCity.City[k];
        if (id == currentCityData.Id){

            var cityCenterLat = (parseFloat(currentCityData.MinBound.Locations.Location.Y) +
                                parseFloat(currentCityData.MaxBound.Locations.Location.Y))/2.0;
            var cityCenterLng = (parseFloat(currentCityData.MinBound.Locations.Location.X) +
                                parseFloat(currentCityData.MaxBound.Locations.Location.X))/2.0;

            var cityCenterLatLng = new L.LatLng(cityCenterLat, cityCenterLng);

            var cityMaxZoomLevel = currentCityData.MaxZoomLevels;

            map.setView(cityCenterLatLng, 13);
            map.setMaxBounds(new L.latLngBounds(new L.LatLng(currentCityData.MinBound.Locations.Location.Y, currentCityData.MinBound.Locations.Location.X),
                                            new L.LatLng(currentCityData.MaxBound.Locations.Location.Y, currentCityData.MaxBound.Locations.Location.X)));

        }
    }
};

//////////////////////////////
// heatmapData View
/////////////////////////////
heatmapData.mapView = Backbone.View.extend({
    // binding existed html element
    el: '#map',

    initialize: function () {

        // console output the file
//        var xmlDoc = checkXMLDocObj("Cities.xml");
//        var messages = xmlDoc.getElementsByTagName("TileUrls");
//
//        var tileIndex = xmlDoc.getElementsByTagName("TileUrls")[0].childNodes;
//        var tileContent = xmlDoc.getElementsByTagName("TileUrls")[0].firstChild;
//
//        console.log(tileIndex.length);
//
//        for (var i = 0; i < tileIndex.length; i++) {
//            console.log(tileContent.textContent);
//            tileContent = tileContent.nextSibling;
//        }
//
//        tileContent = xmlDoc.getElementsByTagName("TileUrls")[0].firstChild.nextSibling;

        //////////////////////////
        /// Map Tile Layer Config
        /////////////////////////

        var whiteOnBlackLayer = L.tileLayer(
            'http://spider:56721/WhiteOnBlack/{z}/{x}/{y}.png ', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );

        var blackOnWhiteLayer = L.tileLayer(
            'http://spider:56721/BlackOnWhite/{z}/{x}/{y}.png ', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );

        var dayEagleLayer = L.tileLayer(
            'http://spider:56721/DayEagle/{z}/{x}/{y}.png ', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );

        var nightHawkLayer = L.tileLayer(
            'http://spider:56721/NightHAWK/{z}/{x}/{y}.png ', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );

        var blackOnBlackLayer = L.tileLayer(
            'http://spider:56721/BlackOnBlack/{z}/{x}/{y}.png ', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );

        var colorFullLayer = L.tileLayer(
            'http://spider:56721/ColorFull/{z}/{x}/{y}.png ', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );


        var cloudmadeLayer = L.tileLayer(
            'http://{s}.tile.cloudmade.com/ad132e106cd246ec961bbdfbe0228fe8/997/256/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }
        );

        ////////////////////////////
        ////  Bus Routes Display
        ////////////////////////////

        var busRoutesLayer = L.layerGroup();

        loadBusRoutesData(getRoutes, busRoutesLayer);



        ////////////////////////////
        ////  Bus Stops Display
        ////////////////////////////

        var busStopsLayer = L.markerClusterGroup({maxClusterRadius: 40});;

        loadBusStopsData(getStops, busStopsLayer);


        /////////////////////////////////
        /// Bus Move Animation Layer
        ////////////////////////////////
        var animationLayer =  L.layerGroup();

        loadData(animationLayer, 4);


        /////////////////////////////////
        ///  Every Station Load Heatmap
        /////////////////////////////////
        var heatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 10, absolute: false },
            //radius: { value: 20, absolute: false },
            opacity: 0.9,
            gradient: {
                0: "rgba(255, 255, 255, 0)",
                0.1: "rgba(53, 52, 61, 180)",
                0.2: "rgba(0, 234, 242, 220)",
                0.4: "rgba(0, 180, 65, 220)",
                0.6: "rgba(220, 252, 20, 220)",
                0.8: "rgba(255, 100, 0, 220)",
                1: "rgba(255, 1, 1, 220)"
            }
        });

        // heatmap data set
        heatmapLayer.setData_X_Y(getEveryStationLoadData);





        ///////////////////////////////
        ///  travel time Heatmap
        //////////////////////////////

        var travelTimeLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 20, absolute: false },
            //radius: { value: 20, absolute: false },
            opacity: 0.9,
            gradient: {
                0.01: "rgba(255, 255, 255, 0)",
                0.1: "rgba(53, 52, 61, 180)",
                0.2: "rgba(0, 234, 242, 220)",
                0.4: "rgba(0, 180, 65, 220)",
                0.6: "rgba(220, 252, 20, 220)",
                0.8: "rgba(255, 100, 0, 220)",
                1: "rgba(255, 1, 1, 220)"
            }
        });

        // heatmap data set
        travelTimeLayer.setData_X_Y_Min(travelTime);


        ///////////////////////////////
        ///  Find Destination Heatmap
        //////////////////////////////

        var findDestinationLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 20, absolute: false },
            //radius: { value: 20, absolute: false },
            opacity: 0.9,
            gradient: {
                0: "rgba(255, 255, 255, 0)",
                0.1: "rgba(53, 52, 61, 180)",
                0.2: "rgba(0, 234, 242, 220)",
                0.4: "rgba(0, 180, 65, 220)",
                0.6: "rgba(220, 252, 20, 220)",
                0.8: "rgba(255, 100, 0, 220)",
                1: "rgba(255, 1, 1, 220)"
            }
        });

        // heatmap data set
        findDestinationLayer.setData_X_Y(findDestination);




        ////////////////////////////
        /// Base Map Layer setting.
        ////////////////////////////

        map = new L.Map('map', {
            center: new L.LatLng(48.68, 6.17),
            zoom: 13,
            layers: [cloudmadeLayer]
        });

        // make accessible for debugging
        heatmapdata_listshow = heatmapdata_list;


        ////////////////////////////////////
        ///  put variable outside for debug
        ////////////////////////////////////
        heatmap_layer = heatmapLayer;
        animation_layer = animationLayer;
        busstops_layer = busStopsLayer;
        busroute_layer = busRoutesLayer;


        //////////////////////////////////
        /// Bus icon setting
        /////////////////////////////////
        var bikeIcon = L.icon({
            iconUrl: 'marker-bike-green-shadowed.png',
            iconSize: [25, 39],
            iconAnchor: [12, 39],
            shadowUrl: null
        });

        ///////////////////////////////
        /// Base Layer Setting
        //////////////////////////////
        var baseMaps = {
            'Cloudmade Layer': cloudmadeLayer,
            'Xtile: ColorFull': colorFullLayer,
            'Xtile: WhiteOnBlack':whiteOnBlackLayer,
            'Xtile: BlackOnWhite': blackOnWhiteLayer,
            'Xtile: DayEagle': dayEagleLayer,
            'Xtile: NightHawk': nightHawkLayer,
            'Xtile: BlackOnBlack': blackOnBlackLayer
        };


        ////////////////////////////
        /// Overlayer Setting
        ///////////////////////////
        var overlayMaps = {
            'Heatmap': heatmapLayer,
            'Animation': animationLayer,
            'Travel Time': travelTimeLayer,
            'Find Destination': findDestinationLayer,
            'Bus Stops': busStopsLayer,
            'Bus Routes': busRoutesLayer
        };


        ////////////////////////////
        /// Control Layer Setting
        ////////////////////////////
        var controls = L.control.layers(baseMaps, overlayMaps, { collapsed: true });
        controls.addTo(map);
    }


});



//make a instance for the heatmap_mapview launch
var heatmap_mapView = new heatmapData.mapView();



