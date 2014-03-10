/**
 * @author Sandeep{deviator206@gmail.com}
 */

//application namespace to avoid cluttering global name
var dApp = dApp || {};

dApp.ApplicationWrapper = function() {

	window.htmltmpl.loadTemplate(['basic_tile_structure'], 'script')
	this.drawTiles(config.tile_contents);
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
				label:arrContent[nIndex].label,
				content:(arrContent[nIndex].content_type=="img")?"<img src='" +arrContent[nIndex].content+ "'/>":"LOREUIM"
				
				
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