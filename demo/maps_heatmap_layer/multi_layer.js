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
///  Load XML file heleper function
////////////////////////////////
// If the xml is null, return the error information.
checkXMLDocObj = function (xmlFile) {
    var xmlDoc = loadXMLDoc(xmlFile);    https://www.macupdate.com/
    if (xmlDoc == null) {
        alert('There is error to get xml file!');
    }

    return xmlDoc;
}


////////////////////////////////////
//Animation Layer definition
///////////////////////////////////
var timestamp_hashtable = new Array();

var loadData = function (map, animiationLayer, id) {

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
    }


    var drawBus;
    drawBus = function (timestamp_id) {

        items = timestamp_hashtable[timestamp_number[timestamp_id]];

        //                   console.log(items);

        // creat the animation layer


        //pushing items into array each by each and then add markers
        for (var j = 0; j < items.length; j++) {
            var LamMarker = new L.marker([items[j].lat, items[j].lon]);
            marker.push(LamMarker);

        }



        L.layerGroup(marker)
            .addTo(animiationLayer);


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

    };

    drawBus(timestamp_number_id);

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



        var animationLayer = L.layerGroup();


        var heatmapLayer = L.TileLayer.heatMap({
            // radius could be absolute or relative
            // absolute: radius in meters, relative: radius in pixels
            radius: { value: 15000, absolute: true },
            //radius: { value: 20, absolute: false },
            opacity: 0.8,
            gradient: {
                0.45: "rgb(0,0,255)",
                0.55: "rgb(0,255,255)",
                0.65: "rgb(0,255,0)",
                0.95: "yellow",
                1.0: "rgb(255,0,0)"
            }
        });

        //Add heatmap data to grenoble area for debug.
        for (var i = 1; i < 100; i++) {
            testData.data.push({
                lat: i * 0.01 + 48.68,
                lon: i * 0.01 + 6.17,
                value: i
            });
        }

        heatmapLayer.setData_X_Y(getEveryStationLoadData);

        var map = new L.Map('map', {
            center: new L.LatLng(48.68, 6.17),
            zoom: 13,
            layers: [colorFullLayer, heatmapLayer, animationLayer]
        });

        // make accessible for debugging
        heatmapdata_listshow = heatmapdata_list;

        heatmap_layer = heatmapLayer;
        animation_layer = animationLayer;

        loadData(map, animationLayer, 4);

        var bikeIcon = L.icon({
            iconUrl: 'marker-bike-green-shadowed.png',
            iconSize: [25, 39],
            iconAnchor: [12, 39],
            shadowUrl: null
        });

        var baseMaps = {
            'Cloudmade Layer': cloudmadeLayer,
            'Xtile: ColorFull': colorFullLayer,
            'Xtile: WhiteOnBlack':whiteOnBlackLayer,
            'Xtile: BlackOnWhite': blackOnWhiteLayer,
            'Xtile: DayEagle': dayEagleLayer,
            'Xtile: NightHawk': nightHawkLayer,
            'Xtile: BlackOnBlack': blackOnBlackLayer
        };


        //add control part:
        var overlayMaps = {
            'Heatmap': heatmapLayer,
            'Animation': animationLayer
        };
        var controls = L.control.layers(baseMaps, overlayMaps, { collapsed: true });
        controls.addTo(map);
    }


});



//make a instance for the heatmap_mapview launch
var heatmap_mapView = new heatmapData.mapView();




//    loadData(4);
//
//    var bikeIcon = L.icon({
//        iconUrl: 'marker-bike-green-shadowed.png',
//        iconSize: [25, 39],
//        iconAnchor: [12, 39],
//        shadowUrl: null
//    });

//    var config = {
//        tileUrl : 'http://{s}.tile.cloudmade.com/ad132e106cd246ec961bbdfbe0228fe8/997/256/{z}/{x}/{y}.png',
//        //tileUrl : 'http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr/{z}/{x}/{y}.png',
//        overlayTileUrl : 'http://{s}.tile.cloudmade.com/ad132e106cd246ec961bbdfbe0228fe8/997/256/{z}/{x}/{y}.png',
////      overlayTileUrl : 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
//        tileAttrib : 'Routing powered by <a href="http://opentripplanner.org/">OpenTripPlanner</a>, Map tiles &copy; Development Seed and OpenStreetMap ',
//        initLatLng : new L.LatLng(48.7015,6.2112), // Nancy
//        initZoom : 13
//    };
//
//    var map = L.map('map', {minZoom: config.minZoom, maxZoom: config.maxZoom});
//
//    map.addLayer(new L.TileLayer(config.tileUrl, {attribution: config.tileAttrib}));
//    map.addLayer(new L.TileLayer(config.overlayTileUrl));
//    map.setView(config.initLatLng, config.initZoom);
