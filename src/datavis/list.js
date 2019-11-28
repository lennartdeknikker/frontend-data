import * as d3 from 'd3';
import { generateButtonIn, generateDivIn } from './utilities';

// generates the list header
function generateListHeader(target, objects) {
	target
		.append('h3')
		.text(`Lijst met ${objects.amount} objecten uit ${objects.placeName}`);

	const buttonsDiv = generateDivIn(target, 'buttons');
	const viewButtonsDiv = generateDivIn(buttonsDiv, 'view-buttons');

	generateButtonIn(viewButtonsDiv, 'image-button', 'Afbeeldingen');
	generateButtonIn(viewButtonsDiv, 'list-button', 'details');
	generateButtonIn(buttonsDiv, 'scroll-to-top', 'Terug naar boven');

	return target;
}

// generates the list view
function generateListView(targetDiv, objects) {
	const ol = targetDiv.append('ol').attr('class', 'item-list list-view');
	const list = ol
		.selectAll('li')
		.data(objects.values)
		.enter()
		.append('li')
		.attr('class', 'list-item')
		.text(d => d.title.value);
	const subItemList = list.append('ul').attr('class', 'sub-item-list');
	list
		.append('a')
		.attr('target', '_blank')
		.attr('href', d => `${d.imageLink.value}`)
		.append('img')
		.attr('src', d => `${d.imageLink.value}`)
		.attr('class', 'object-image-list');
	subItemList.append('li').text(d => `ID code: ${d.identifierSample.value}`);
	subItemList.append('li').text(d => `Grootte: ${d.extent.value}`);
	subItemList
		.append('li')
		.text(
			d => `Vindplaats: ${d.placeName.value} (${d.lat.value}, ${d.long.value})`
		);
	document.getElementById('list-button').classList.add('selected');
}

// generates the image view
function generateImageView(targetDiv, objects) {
	const objectList = targetDiv
		.append('div')
		.attr('class', 'object-list image-view');
	objectList
		.selectAll('.object')
		.data(objects.values)
		.enter()
		.append('div')
		.attr('class', 'object')
		.append('img')
		.attr('class', 'object-image')
		.attr('src', d => d.imageLink.value);
	document.getElementById('image-button').classList.add('selected');
}

// Generates the list view in any given target element.
function generateListFor(target, objects, view) {
	if (d3.select('.list-container')) d3.select('.list-container').remove();
	const targetDiv = generateDivIn(d3.select(target), 'list-container');
	// generates the list header and buttons
	generateListHeader(targetDiv, objects);
	// generates either the list view or the image view depending on the given type
	if (view === 'list') {
		generateListView(targetDiv, objects);
	} else {
		generateImageView(targetDiv, objects);
	}
}

// Function generating a listing of certain data, shown either as a list of images or as details list.
// It adds a button to toggle between both view types.
function showListFor(data, type) {
	// create the html showing the list,
	generateListFor(document.querySelector('.info'), data, type);
	// document.querySelector('.info').innerHTML = generateHtmlListFor(data, type);
	// add event handlers to the buttons toggling the view type and the 'scroll-to-top' button,
	document.getElementById('list-button').addEventListener('click', () => {
		showListFor(data, 'list');
	});
	document.getElementById('image-button').addEventListener('click', () => {
		document.getElementById('image-button').classList.add('selected');
		showListFor(data, 'image');
	});
	document.getElementById('scroll-to-top').addEventListener('click', () => {
		document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
	});
	// add a handler to each image to enlarge those when clicked.
	document.querySelectorAll('.object-image').forEach(objectImage =>
		objectImage.addEventListener('click', () => {
			if (objectImage.classList.contains('selected-image'))
				objectImage.classList.remove('selected-image');
			else {
				document
					.querySelectorAll('.object-image')
					.forEach(item => item.classList.remove('selected-image'));
				objectImage.classList.add('selected-image');
			}
		})
	);
}

export { showListFor };
