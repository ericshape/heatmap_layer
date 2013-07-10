var citiesSelectData = {
  "ArrayOfCity": {
    "City": [
      {
        "Id": "2",
        "Name": "Nancy",
        "MinBound": {
          "Id": "4c96bfb6-7f01-42dd-a5c2-b7e979541d53",
          "Locations": {
            "Location": {
              "Y": "48.5827",
              "X": "5.9495"
            }
          },
          "IsClosedArea": "false"
        },
        "MaxBound": {
          "Id": "c35553df-b22b-45da-862f-ab78a73d88da",
          "Locations": {
            "Location": {
              "Y": "48.7888",
              "X": "6.4138"
            }
          },
          "IsClosedArea": "false"
        },
        "DefaultStartDate": "2012-03-01T03:00:00",
        "DefaultEndDate": "2012-05-01T03:00:00",
        "CityLogoFilePath": "/Xerox.CityDashboard;Component/Themes/Images/nancy.png",
        "MaxZoomLevels": "17",
        "Services": {
          "string": [
            "NetworkService",
            "OriginDestinationService",
            "ProfilerService",
            "StationLoadService",
            "TravelTimeService",
            "TripPlannerService",
            "VehicleLoadService",
            "SimulatorService"
          ]
        },
        "TileUrls": {
          "string": [
            "http://spider:56721/ColorFull/{0}/{1}/{2}.png",
            "http://spider:56721/WhiteOnBlack/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnWhite/{0}/{1}/{2}.png",
            "http://spider:56721/DayEagle/{0}/{1}/{2}.png",
            "http://spider:56721/NightHAWK/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnBlack/{0}/{1}/{2}.png",
            "http://dolent.grenoble.xrce.xerox.com/GeoServer/tiles/{0}/{1}/{2}.png",
            "http://services.open.xerox.com/WebApp.svc/OpenStreetMapTiles/{0}/{1}/{2}.png",
            "http://mt1.google.com/vt/lyrs=m@169000000&hl=en&src=api&x={1}&y={2}&z={0}"
          ]
        },
        "DaoSettings": {
          "DaoSetting": [
            {
              "DbContextFactoryClassFullName": "Xerox.CityDashboard.XrceDao.Context.MtupDbContextFactory",
              "DaoProviderClassFullName": "Xerox.CityDashboard.XrceDao.Provider.GtfsDaoProvider",
              "DsnConnectionString": "Data Source={0};Initial Catalog=ACSTransportationNancy2012Draft;{1};MultipleActiveResultSets=true"
            },
            {
              "DbContextFactoryClassFullName": "Xerox.CityDashboard.XrceDao.Context.MtupDbContextFactory",
              "DaoProviderClassFullName": "Xerox.CityDashboard.XrceDao.Provider.DemandDaoProvider",
              "DsnConnectionString": "Data Source={0};Initial Catalog=ACSTransportationNancy2012Draft;{1};MultipleActiveResultSets=true"
            }
          ]
        },
        "TripPlannerUrl": "http://valbuche:51000/"
      },
      {
        "Id": "3",
        "Name": "Rochester",
        "MinBound": {
          "Id": "dbf79cc9-bb5d-4d2d-9358-1ffca5d0ab2b",
          "Locations": {
            "Location": {
              "Y": "42.96798",
              "X": "-77.985077"
            }
          },
          "IsClosedArea": "false"
        },
        "MaxBound": {
          "Id": "cebafca0-c72c-4b60-bdd4-ea7349d1041d",
          "Locations": {
            "Location": {
              "Y": "43.373611",
              "X": "-77.22702"
            }
          },
          "IsClosedArea": "false"
        },
        "DefaultStartDate": "2011-01-01T00:00:00",
        "DefaultEndDate": "2012-04-06T00:00:00",
        "CityLogoFilePath": "/Xerox.CityDashboard;Component/Themes/Images/rochester.png",
        "MaxZoomLevels": "17",
        "Services": {
          "string": [
            "NetworkService",
            "ScheduleAdherenceService"
          ]
        },
        "TileUrls": {
          "string": [
            "http://spider:56721/ColorFull/{0}/{1}/{2}.png",
            "http://spider:56721/WhiteOnBlack/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnWhite/{0}/{1}/{2}.png",
            "http://spider:56721/DayEagle/{0}/{1}/{2}.png",
            "http://spider:56721/NightHAWK/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnBlack/{0}/{1}/{2}.png",
            "http://dolent.grenoble.xrce.xerox.com/GeoServer/tiles/{0}/{1}/{2}.png",
            "http://services.open.xerox.com/WebApp.svc/OpenStreetMapTiles/{0}/{1}/{2}.png",
            "http://mt1.google.com/vt/lyrs=m@169000000&hl=en&src=api&x={1}&y={2}&z={0}"
          ]
        },
        "DaoSettings": {
          "DaoSetting": [
            {
              "DbContextFactoryClassFullName": "Xerox.CityDashboard.XrceDao.Context.MtupDbContextFactory",
              "DaoProviderClassFullName": "Xerox.CityDashboard.XrceDao.Provider.GtfsDaoProvider",
              "DsnConnectionString": "Data Source={0};Initial Catalog=ACSTransportationRochester;{1};MultipleActiveResultSets=true"
            },
            {
              "DbContextFactoryClassFullName": "Xerox.CityDashboard.XrceDao.Context.MtupDbContextFactory",
              "DaoProviderClassFullName": "Xerox.CityDashboard.XrceDao.Provider.DemandDaoProvider",
              "DsnConnectionString": "Data Source={0};Initial Catalog=ACSTransportationRochester;{1};MultipleActiveResultSets=true"
            },
            {
              "DbContextFactoryClassFullName": "Xerox.CityDashboard.ServiceQualityDao.Context.ServiceQualityDbContextFactory",
              "DaoProviderClassFullName": "Xerox.CityDashboard.ServiceQualityDao.ServiceQualityDaoProvider",
              "DsnConnectionString": "Data Source={0};Initial Catalog=ACSTransportationQoSRochester;{1};MultipleActiveResultSets=true"
            }
          ]
        },
        "TripPlannerUrl": "https://graphsolver.services.open.xerox.com/"
      },
      {
        "Id": "4",
        "Name": "Los Angeles",
        "MinBound": {
          "Id": "5a85e23d-b4fd-4182-9199-1b31d9cfe705",
          "Locations": {
            "Location": {
              "Y": "34.028193",
              "X": "-118.291168"
            }
          },
          "IsClosedArea": "false"
        },
        "MaxBound": {
          "Id": "9251642c-6258-45b3-8055-7ef516e88eb9",
          "Locations": {
            "Location": {
              "Y": "34.085649",
              "X": "-118.188858"
            }
          },
          "IsClosedArea": "false"
        },
        "DefaultStartDate": "2012-05-01T00:00:00",
        "DefaultEndDate": "2012-09-19T00:00:00",
        "CityLogoFilePath": "/Xerox.CityDashboard;Component/Themes/Images/la.png",
        "MaxZoomLevels": "18",
        "Services": {
          "string": [
            "MeterService",
            "SensorService",
            "BlockfaceService",
            "GeoCoderService",
            "OccupancyService"
          ]
        },
        "TileUrls": {
          "string": [
            "http://spider:56721/ColorFull/{0}/{1}/{2}.png",
            "http://spider:56721/WhiteOnBlack/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnWhite/{0}/{1}/{2}.png",
            "http://spider:56721/DayEagle/{0}/{1}/{2}.png",
            "http://spider:56721/NightHAWK/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnBlack/{0}/{1}/{2}.png",
            "http://dolent.grenoble.xrce.xerox.com/GeoServer/tiles/{0}/{1}/{2}.png"
          ]
        }
      },
      {
        "Id": "6",
        "Name": "Blagnac",
        "MinBound": {
          "Locations": {
            "Location": {
              "Y": "43.62856",
              "X": "1.3616"
            }
          },
          "IsClosedArea": "false"
        },
        "MaxBound": {
          "Locations": {
            "Location": {
              "Y": "43.64326",
              "X": "1.38402"
            }
          },
          "IsClosedArea": "false"
        },
        "DefaultStartDate": "2012-12-02T00:00:00",
        "DefaultEndDate": "2013-03-14T23:59:59",
        "CityLogoFilePath": "/Xerox.CityDashboard;Component/Themes/Images/blagnac.png",
        "MaxZoomLevels": "18",
        "Services": {
          "string": [
            "TopologyService",
            "ActivityService",
            "ZoneOccupancyService",
            "DurationService",
            "RevenueService"
          ]
        },
        "TileUrls": {
          "string": [
            "http://spider:56721/ColorFull/{0}/{1}/{2}.png",
            "http://spider:56721/WhiteOnBlack/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnWhite/{0}/{1}/{2}.png",
            "http://spider:56721/DayEagle/{0}/{1}/{2}.png",
            "http://spider:56721/NightHAWK/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnBlack/{0}/{1}/{2}.png",
            "http://a.tile.openstreetmap.org/{0}/{1}/{2}.png",
            "http://mt1.google.com/vt/lyrs=m@169000000&hl=en&src=api&x={1}&y={2}&z={0}",
            "https://services.open.xerox.com/WebApp.svc/OpenStreetMapTiles/{0}/{1}/{2}.png",
            "https://mt1.google.com/vt/lyrs=m@169000000&hl=en&src=api&x={1}&y={2}&z={0}"
          ]
        },
        "DaoSettings": {
          "DaoSetting": {
            "DbContextFactoryClassFullName": "Xerox.CityDashboard.ParkingDao.Context.ParkingDbContextFactory",
            "DaoProviderClassFullName": "Xerox.CityDashboard.ParkingDao.ParkingDaoProvider",
            "DsnConnectionString": "Data Source={0};Initial Catalog=ParkingBlagnac-18032013;{1};MultipleActiveResultSets=true"
          }
        },
        "TripPlannerUrl": "https://graphsolver.services.open.xerox.com/"
      },
      {
        "Id": "7",
        "Name": "Bordeaux",
        "MinBound": {
          "Locations": {
            "Location": {
              "Y": "44.78086028131498",
              "X": "-0.666046142578125"
            }
          },
          "IsClosedArea": "false"
        },
        "MaxBound": {
          "Locations": {
            "Location": {
              "Y": "44.90500972765334",
              "X": "-0.49850463867187494"
            }
          },
          "IsClosedArea": "false"
        },
        "DefaultStartDate": "2013-01-27T00:00:00",
        "DefaultEndDate": "2013-05-02T23:59:59",
        "CityLogoFilePath": "/Xerox.CityDashboard;Component/Themes/Images/bordeaux.png",
        "MaxZoomLevels": "18",
        "Services": {
          "string": [
            "TopologyService",
            "ActivityService",
            "ZoneOccupancyService",
            "DurationService",
            "RevenueService"
          ]
        },
        "TileUrls": {
          "string": [
            "http://spider:56721/ColorFull/{0}/{1}/{2}.png",
            "http://spider:56721/WhiteOnBlack/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnWhite/{0}/{1}/{2}.png",
            "http://spider:56721/DayEagle/{0}/{1}/{2}.png",
            "http://spider:56721/NightHAWK/{0}/{1}/{2}.png",
            "http://spider:56721/BlackOnBlack/{0}/{1}/{2}.png",
            "http://a.tile.openstreetmap.org/{0}/{1}/{2}.png",
            "http://mt1.google.com/vt/lyrs=m@169000000&hl=en&src=api&x={1}&y={2}&z={0}",
            "https://services.open.xerox.com/WebApp.svc/OpenStreetMapTiles/{0}/{1}/{2}.png",
            "https://mt1.google.com/vt/lyrs=m@169000000&hl=en&src=api&x={1}&y={2}&z={0}"
          ]
        },
        "DaoSettings": {
          "DaoSetting": {
            "DbContextFactoryClassFullName": "Xerox.CityDashboard.ParkingDao.Context.ParkingDbContextFactory",
            "DaoProviderClassFullName": "Xerox.CityDashboard.ParkingDao.ParkingDaoProvider",
            "DsnConnectionString": "Data Source={0};Initial Catalog=ParkingBordeaux;{1};MultipleActiveResultSets=true"
          }
        },
        "TripPlannerUrl": "https://graphsolver.services.open.xerox.com/"
      }
    ]
  }
}