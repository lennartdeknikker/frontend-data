[![Netlify Status](https://api.netlify.com/api/v1/badges/c4d10ccf-41ae-4b4f-8b1b-8bc978f6786d/deploy-status)](https://app.netlify.com/sites/frosty-bardeen-0cc821/deploys)

# Indonesian Ancestor Statues Map
this repo contains my assignment material for the course [Frontend Data](https://github.com/cmda-tt/course-19-20). The assignment entails visualizing data obtained from the Museum Volkenkunde's objects database using the [D3 Library](https://github.com/d3/d3).

I've tried to build it in a way this code can at a later stadium be used to show any kind of objects on any kind of map, keeping in mind the [key concepts of functional programming](https://github.com/lennartdeknikker/functional-programming/wiki/About-functional-programming-in-JavaScript). Right now, the application makes it possible to only browse Indonesian objects, by searching for a keyword. The objects are then shown on a map with dots corresponding in size to the amounts of objects found at certain locations. 

## Concept
The key idea behind this application is to enable visitors of the [Museum Volkenkunde](https://www.volkenkunde.nl/) to explore the (Indonesian) collection online. For now it seemed best to focus on one location first, so the application just works for Indonesian objects. Users can search for keywords and explore the origin locations of the objects on a map. The map shows at what locations objects are found and how many. Users can also click on the points shown on the map to get a more detailed list and pictures of the objects found there. More information on the concept can be found in the [wiki](https://github.com/lennartdeknikker/frontend-data/wiki/Concept).

Check out the live demo [here](https://volkenkunde.lenn4rt.com/)

## Screenshots
Users can browse the map of Indonesia, search for objects and see those projected on the map.
![screenshot1](https://github.com/lennartdeknikker/frontend-data/blob/master/wiki-resources/screenshots/screenshot3.png)
To get more detail on certain objects, users can click the dots that appear to see what specific objects are found there.

![screenshot7](https://github.com/lennartdeknikker/frontend-data/blob/master/wiki-resources/screenshots/screenshot7.png)

To see more screenshots showing all functionalities in depth, check out [this page](https://github.com/lennartdeknikker/frontend-data/wiki/Screenshots) in the wiki.

## Usage
1. clone this repo using `git clone https://github.com/lennartdeknikker/frontend-data.git`
2. Use `npm install` to install dependencies.
3. You can get the application running using `npm run dev`. or build the application using `npm run build`.

## Settings
Right now, there's a few settings to make it easier to work with different data, but I plan to have the code automatically adapt to different datasets or maps. Currently these settings are stored in `settings.json`. These can be changed to get the application running with other .geoJson files or different datasets.

```json
{
	"init": {
		"targetDiv": "#map_container",
		"endpoint": "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-29/sparql",
		"keyWord": "",
		"mapJson": "https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json",
		"svgSize": ["100%", "100%"]
	},
	"render": {
		"scaleExtent": [0.5, 20],
		"dataExtent": [0, 1]
	},
	"projection": {
		"center": [120, -5],
		"scale": 1400,
		"translation": [2, 2.6]
	},
	"legend": {
		"enabled": true,
		"targetDiv": "#legend",
		"height": "6.5em",
		"width": "150px"
	}
}

```

## Wiki
The whole process of building the application and more in depth information on the queries that obtain the used data is found in [the wiki](https://github.com/lennartdeknikker/frontend-data/wiki).

## Used Data
The data used in this application is provided by the [Museum Volkenkunde](https://www.volkenkunde.nl/). They recently published their collection data. The data is obtained using [SPARQL](https://en.wikipedia.org/wiki/SPARQL) queries. The query used in this example is part of the code and can easily be changed to obtain different data to plot on the map. More information on the used data and queries can be found in the [wiki](https://github.com/lennartdeknikker/frontend-data/wiki/)

## References
This application is built with:
- [the D3 Library](https://github.com/d3/d3)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [scss](https://sass-lang.com/)

### Helpful documentation sources
- [d3InDepth](https://www.d3indepth.com/)
- [ObservableHQ](https://observablehq.com/)
- [bl.ocks.org](https://bl.ocks.org/)
- [Tutorials Point](https://www.tutorialspoint.com/d3js/d3js_installation.htm)
- [Aligned Left](https://alignedleft.com/tutorials/d3/adding-elements/)

## plagiarism and Acknowledgements
I started off with [Ivan Ha](https://github.com/ivan-ha)'s [d3-hk-map](https://github.com/ivan-ha/d3-hk-map/blob/development/hongkong.js) to get acquainted with mapping data using the [D3 library](https://github.com/d3/d3). This has been very helpful to get the zoom functionality working and making it possible to select different areas on the map as well.

Currently the application uses [Rifani Frestiyanto](https://github.com/rifani)'s [geoJson files](https://github.com/rifani/geojson-political-indonesia).
