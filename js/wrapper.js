/**
 * @author Sandeep{deviator206@gmail.com}
 * 
 *  Page build from scratch with only JAVASCRIPT
 */

//application namespace to avoid cluttering global name
var dApp = dApp || {};

dApp.ApplicationWrapper = function() {

	window.htmltmpl.loadTemplate(['basic_tile_structure', 'footer_widget_figure'], 'script')
	this.initTile();
	this.drawTiles(config.tile_contents);
	this.drawFooter();
	this.initializePopUp();
	this.mCurrentMinimizedSelected = -1;
	return this;
}

dApp.ApplicationWrapper.prototype = {
	// Drawing the Tiles in center panel
	drawTiles : function(arrContent) {
		var nIndex = 0, sHTML = "", docFrag, mParentDocFrag, nColCounter = 0;
		mParentDocFrag = document.createElement("div");
		document.getElementById('tile_holder').innerHTML = "";
		for ( nIndex = 0; nIndex < arrContent.length; nIndex++) {
			
			nColCounter++;
			sHTML += window.htmltmpl.renderTemplate('basic_tile_structure', {
				dom_id : nIndex,
				label : arrContent[nIndex].label,
				content : (arrContent[nIndex].content_type == "img") ? "<img src='" + arrContent[nIndex].content + "'/>" : "LOREUIM",
				min_opacity : (arrContent[nIndex].min === 0) ? 1 : 0

			});
			if (nColCounter === 3) {
				nColCounter = 0;
				docFrag = document.createElement("div");
				docFrag.innerHTML = sHTML;
				mParentDocFrag.appendChild(docFrag);
				sHTML = "";
			}
		}

		if (sHTML !== "") {
			nColCounter = 0;
			docFrag = document.createElement("div");
			docFrag.innerHTML = sHTML;
			mParentDocFrag.appendChild(docFrag);
			sHTML = "";
		}

		document.getElementById('tile_holder').appendChild(mParentDocFrag);

		var that = this;
		window.dMisc.addEventListener('btn-close', 'click', function(evt) {
			var mName = evt.target.parentElement.parentElement.parentElement.id;
			var nIndex = Number(String(mName).split("_")[1]);
			config.init_widget.push({
				label : config.tile_contents[nIndex].label,
				img : 'img/widget.png'
			});
			config.tile_contents.splice(nIndex, 1);
			that.drawTiles(config.tile_contents)
			that.reDrawWidgets();

		}, 'class');

		window.dMisc.addEventListener('btn-minimize', 'click', function(evt) {
			var mName = evt.target.parentElement.parentElement.parentElement.id;
			var nIndex = Number(String(mName).split("_")[1]);
			config.tile_contents[nIndex].min = 1;
			//document.getElementById(mName).childNodes[3].style.opacity ="0"
			var docEl = window.dMisc.getElementByClassName('panel-content-wrapper', mName)
			docEl.style.opacity = "0";

		}, 'class');

	},
	// initialization of the TILES
	initTile : function(i) {
		var that = this;
		window.dMisc.addEventListener('tile_holder', 'drop', function(evt) {
			evt.preventDefault();
			that.addNewTile(that.mCurrentMinimizedSelected, config.init_widget[that.mCurrentMinimizedSelected], true);
			that.mCurrentMinimizedSelected = -1;

		});

		window.dMisc.addEventListener('tile_holder', 'dragover', function(evt) {
			evt.preventDefault();

		});
	},
	// Drawing the basic footer 
	drawFooter : function() {
		this.reDrawWidgets();
		this.manipultateFooter({
			target : {
				innerHTML : 'Collapse'
			}
		})
		window.dMisc.addEventListener('footer-collapse-btn', 'click', this.manipultateFooter.bind(this), 'class');
	},
	// Redrawing the footer widgets
	reDrawWidgets : function() {
		var i, sHTML = "";
		//default addon
		for ( i = 0; i < config.init_widget.length; i++) {
			sHTML += window.htmltmpl.renderTemplate('footer_widget_figure', {
				dom_id : i,
				dom_id_img : "img_" + i,
				widget_name : config.init_widget[i].label,
				widget_img : config.init_widget[i].img

			});
		}

		//default
		sHTML += window.htmltmpl.renderTemplate('footer_widget_figure', {
			dom_id : 'default',
			dom_id_img : 'default_img',
			widget_name : config.new_widget.label,
			widget_img : config.new_widget.img
		});

		document.getElementById('footer_widget_container').innerHTML = "";
		document.getElementById('footer_widget_container').innerHTML = sHTML;

		window.dMisc.addEventListener('widget-component', 'click', this.minimizedWidgetClicked.bind(this), 'class');
		window.dMisc.addEventListener('widget-component', 'drag', this.dragInit.bind(this), 'class');


	},
	// Adding new Tile - either by new widget or dragging the widget
	addNewTile : function(nID, data, spliceCheck) {
		config.tile_contents.push({
			label : data.label,
			content : 'img/img2.png',
			content_type : 'img',
			min : 0
		});
		this.drawTiles(config.tile_contents)
		if (spliceCheck !== undefined)
			config.init_widget.splice(nID, 1);

		this.reDrawWidgets();

	},
	// basic initialzation required for POPUP
	initializePopUp : function() {
		var that = this;
		document.getElementById('popup_holder').style.display = "none";
		window.dMisc.addEventListener('popup-background', 'click', function() {
			that.hidePopUp();
		}, 'class');

		window.dMisc.addEventListener('popup_cancel_btn', 'click', function() {
			that.hidePopUp();
		});

		window.dMisc.addEventListener('popup_add_btn', 'click', function() {
			that.addNewTile(config.tile_contents.length, {
				label : document.getElementById('txt_wiget_name').value
			});
			that.hidePopUp();
		});
	},
	//show up the popup
	showPopUp : function() {
		document.getElementById('popup_holder').style.display = "block";
	},
	// hiding and  resetting the popup
	hidePopUp : function() {
		document.getElementById('popup_holder').style.display = "none";
		document.getElementById('txt_wiget_name').value = "";
		document.getElementById('txt_wiget_code').value = "";
	},
	
	//Initialize the drag 
	dragInit : function(evt) {
		this.mCurrentMinimizedSelected = Number(String(evt.target.id).split("_")[1])
		//ev.dataTransfer.setData("Text", ev.currentTarget.id);

	},
	// clicked on New Widget
	minimizedWidgetClicked : function(evt) {
		switch(evt.currentTarget.id) {
			case 'default':
				this.showPopUp();
				break;
			default:
				this.hidePopUp();
				break;

		}

	},
	// open | collapse functionality of the FOOTER component
	manipultateFooter : function(evt) {
		if (evt.target !== undefined) {
			var sT = (evt.target.innerHTML).replace(/\s+/g, '');
			if (sT === "Collapse") {
				// collapse
				document.getElementById('text_portal_footer_sec_1').style.display = "block";
				document.getElementById('text_portal_footer_sec_2').style.display = "none";
			} else {
				//open
				document.getElementById('text_portal_footer_sec_1').style.display = "none";
				document.getElementById('text_portal_footer_sec_2').style.display = "block";
			}
		}
	}
}



/*
 onLoad
 * */
window.addEventListener("load", function() {
	//creating an instance and initiating the app
	document.getElementById("main_wrapper").style.width = (window.innerWidth - 20) + "px";
	document.getElementById("main_wrapper").style.height = (window.innerHeight - 20) + "px";

	var gApp = new dApp.ApplicationWrapper();

})


/*
 For logging the errors
 * */

window.addEventListener("error", function(errorObject) {
	console.log("type:" + errorObject.error + "\nmsg :" + errorObject.message + "\nlineNo:" + errorObject.lineno + "\nfilename:" + errorObject.filename)

})