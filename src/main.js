// imports
import "babel-polyfill";
import { AddDataVisualisation } from './datavis/index';
import { loadData } from './datavis/data';

document.querySelector('#search_input').addEventListener('keypress', function (e) {
  let keyWord;
  let key = e.which || e.keyCode;
  if (key === 13) {
    keyWord = this.value;
    loadMapWithItemType(keyWord);
  }
});

function loadMapWithItemType(keyWord) {
  // application settings
  const settings = {
    init: {
      targetDiv: '#map_container',
      endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-29/sparql",
      keyWord: keyWord,
      mapJson: 'https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json',
      svgSize: ['100%', '100%']
    },
    render: {
      scaleExtent: [.5, 20],
      minValueInData: 3,
      maxValueInData: 200
    },
    projection: {
      center: [120,-5],
      scale: 1600,
      translation: [window.innerWidth / 1.8, window.innerHeight/2.3]
    }
  }

  AddDataVisualisation(settings);
}

