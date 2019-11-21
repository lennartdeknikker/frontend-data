// imports
import "babel-polyfill";
import { AddDataVisualisation } from './datavis/index';

  const settings = {
    init: {
      targetDiv: '#map_container',
      endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-29/sparql",
      keyWord: "",
      mapJson: 'https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json',
      svgSize: ['100%', '100%']
    },
    render: {
      scaleExtent: [.5, 20],
      dataExtent: [3, 200]
    },
    projection: {
      center: [120,-5],
      scale: 1600,
      translation: [window.innerWidth / 1.8, window.innerHeight/2.3]
    },
    legend: {
      targetDiv: "#legend",
      width: "30em",
      height: "8em"
    }
  }

  AddDataVisualisation(settings);

