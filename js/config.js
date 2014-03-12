/**
 * @author Sandeep {deviator206@gmail.com}
 */


/*
 configurations for the widget container
 tile_contents -  total widgets displayed when the page is loaded.
 It contins objects as mentioned below
 {
		label : 'Lorem Ipsum1', // LABEL of the widget
		content_type : 'img',  // TYPE of widget {As of now not used, but can be used when extending the functionality}
		content : 'img/img1.png', // Content represents the URL for image {As of now images are used in place of widgets} 
		min : 0 // Capturing the minimized state
	}
	
	
init_widget - total widgets available in bottom panel when the page is loaded.	
It contains set of 
{
		label : 'PlusOne', // LABEL
		img : 'img/widget.png' // IMage which can be loaded 

	}
	
new_widget : specific for New Widget control	
		
 * */
var config = {
	total_number_of_tiles : 10,
	tile_contents : [{
		label : 'Lorem Ipsum1',
		content_type : 'img',
		content : 'img/img1.png',
		min : 0
	}, {
		label : 'Lorem Ipsum2',
		content_type : 'img',
		content : 'img/img2.png',
		min : 0
	}, {
		label : 'Lorem Ipsum3',
		content_type : 'img',
		content : 'img/img3.png',
		min : 0

	}, {
		label : 'Lorem Ipsum4',
		content_type : 'img',
		content : 'img/img4.png',
		min : 0
	}, {
		label : 'Lorem Ipsum6',
		content_type : 'img',
		content : 'img/img5.png',
		min : 0
	}, {
		label : 'Lorem Ipsum7',
		content_type : 'img',
		content : 'img/img6.png',
		min : 0
	}],

	init_widget : [{
		label : 'PlusOne',
		img : 'img/widget.png'

	}, {
		label : 'PlusTwo',
		img : 'img/widget.png'

	}],
	new_widget : {
		label : 'New Widget',
		img : 'img/new_widget.png'

	}

}

