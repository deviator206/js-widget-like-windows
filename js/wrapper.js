/**
 * @author Sandeep{deviator206@gmail.com}
 */

//application namespace to avoid cluttering global name
var dApp = dApp || {};

dApp.ApplicationWrapper = function() {

	window.htmltmpl.loadTemplate(['basic_tile_structure', 'footer_widget_figure'], 'script')
	this.drawTiles(config.tile_contents);
	this.drawFooter();
	return this;
}

dApp.ApplicationWrapper.prototype = {
	drawTiles : function(arrContent) {
		var nIndex = 0, sHTML = "", docFrag, mParentDocFrag, nColCounter = 0;
		mParentDocFrag = document.createElement("div");
		for ( nIndex = 0; nIndex < arrContent.length; nIndex++) {
			console.log(nIndex);
			nColCounter++;
			sHTML += window.htmltmpl.renderTemplate('basic_tile_structure', {
				dom_id : nIndex,
				label : arrContent[nIndex].label,
				content : (arrContent[nIndex].content_type == "img") ? "<img src='" + arrContent[nIndex].content + "'/>" : "LOREUIM"

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

		window.dMisc.addEventListener('btn-close', 'click', function(evt) {
			var mName = evt.target.parentElement.parentElement.parentElement.id;
			console.log(mName);

		}, 'class');

		window.dMisc.addEventListener('btn-minimize', 'click', function(evt) {
			var mName = evt.target.parentElement.parentElement.parentElement.id;
			console.log(mName);

		}, 'class');

	},

	drawFooter : function() {

		this.reDrawWidgets();
		this.manipultateFooter({
			target : {
				innerHTML : 'Collapse'
			}
		})
		window.dMisc.addEventListener('footer-collapse-btn', 'click', this.manipultateFooter.bind(this), 'class');
	},
	reDrawWidgets : function() {
		var i, sHTML = "";
		//default addon
		for ( i = 0; i < config.init_widget.length; i++) {
			sHTML += window.htmltmpl.renderTemplate('footer_widget_figure', {
				dom_id : i,
				widget_name : config.init_widget[i].label,
				widget_img : config.init_widget[i].img

			});
		}
		
		
		
		document.getElementById('footer_widget_container').innerHTML = "";
		document.getElementById('footer_widget_container').innerHTML = sHTML;
		
		
		//default 
		sHTML = window.htmltmpl.renderTemplate('footer_widget_figure', {
			dom_id : i,
			widget_name : config.new_widget.label,
			widget_img : config.new_widget.img
		});
		
		
		document.getElementById('default_widget_container').innerHTML = "";
		document.getElementById('default_widget_container').innerHTML = sHTML;
		

	},
	manipultateFooter : function(evt) {
		console.log(evt.target);
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

window.addEventListener("load", function() {
	//creating an instance and initiating the app
	document.getElementById("main_wrapper").style.width = (window.innerWidth - 20) + "px";
	document.getElementById("main_wrapper").style.height = (window.innerHeight - 20) + "px";

	var gApp = new dApp.ApplicationWrapper();

})

window.addEventListener("error", function(errorObject) {
	console.log("type:" + errorObject.error + "\nmsg :" + errorObject.message + "\nlineNo:" + errorObject.lineno + "\nfilename:" + errorObject.filename)

})