import * as d3 from 'd3';
import { generateButtonIn, generateDivIn } from './utilities';

// generates the list header
function generateListHeader(target, objects) {
	target
		.append('h3')
		.text(`List of ${objects.amount} objects found at ${objects.placeName}`);

	const buttonsDiv = generateDivIn(target, 'buttons');
	const viewButtonsDiv = generateDivIn(buttonsDiv, 'view-buttons');

	generateButtonIn(viewButtonsDiv, 'image-button', 'images');
	generateButtonIn(viewButtonsDiv, 'list-button', 'details');
	generateButtonIn(buttonsDiv, 'scroll-to-top', 'back to top');

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
	subItemList.append('li').text(d => `Identifier: ${d.identifierSample.value}`);
	subItemList.append('li').text(d => `Extent: ${d.extent.value}`);
	subItemList
		.append('li')
		.text(
			d =>
				`Origin location: ${d.placeName.value} (${d.lat.value}, ${
					d.long.value
				})`
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

export { generateListFor };
