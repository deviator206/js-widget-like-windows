/**
 * @author Sandeep {deviator206@gmail.com}
 */

HTMLTemplate = function() {

	this.temporaryCallback = null;
	this.jsonTemplates = {};
	this.bAllTemplateLoaded = false;
	return (window.htmltmpl === undefined) ? this : window.htmltmpl;
}

HTMLTemplate.prototype = {
	/**
	 * Loads all the template and stores it in jsonTemplates
	 * @params {Array.<String>} arrTemplateNames  - list of template that is to loaded and stored once the application begins
	 * @params {String} sType  - type whether they are of type script or through stored set of strings
	 * @params {Method} callBackFunction - triggerd when the loading is complete
	 *  */
	loadTemplate : function(arrTemplateNames, sType, callBackFunction) {
		this.jsonTemplates = {};
		this.temporaryCallback = (callBackFunction != null) ? callBackFunction : null;

		var sContentToBeStored = "";
		if (sType == 'script') {
			for (var nIndex = 0; nIndex < arrTemplateNames.length; nIndex++) {
				var sTemp = document.getElementById(arrTemplateNames[nIndex]);

				sContentToBeStored = sTemp.innerHTML
				this.jsonTemplates[arrTemplateNames[nIndex]] = {};
				this.jsonTemplates[arrTemplateNames[nIndex]].returnContent = sContentToBeStored;
			}
		} else {
			for (var key in arrTemplateNames) {
				sContentToBeStored = arrTemplateNames[key].html;
				this.jsonTemplates[key] = {};
				this.jsonTemplates[key].returnContent = sContentToBeStored;
			}
		}

		this.bAllTemplateLoaded = true;
	},
	/**
	 *rendering the template
	 * @params {String} templateName - indicates the name of template
	 * @params {Object} data - replaces the properties from object to dynamic input expected in template
	 * @return {String} string which is formed after replacing the dynamic variables.
	 *  */
	renderTemplate : function(templateName, data) {
		if (this.bAllTemplateLoaded) {// all template is loaded
			if (this.jsonTemplates.hasOwnProperty(templateName)) {// if property exist
				var sReturn = this.jsonTemplates[templateName].returnContent
				if (data != null || data != undefined) {
					var objT = this.clone(this.jsonTemplates);
					var sTempContent = this.constructData(data, objT[templateName].returnContent);
					sReturn = (sTempContent == undefined) ? "" : sTempContent;
				}
				return sReturn;
			}
		}
	},
	clone : function(obj) {
		if (obj == null || typeof (obj) != 'object')
			return obj;
		var temp = obj.constructor();
		// changed
		for (var key in obj)
		temp[key] = this.clone(obj[key]);
		return temp;
	},

	constructData : function(data, target) {
		var returnString = undefined
		var sTemp = target;
		for (var key in data) {
			var searchingKey = key.toLowerCase();
			searchingKey = '<%' + searchingKey + '%>'
			var nIndex = sTemp.indexOf(searchingKey);
			if (nIndex != -1) {
				sTemp = String(sTemp).replace(searchingKey, data[key]);
			}

		}
		returnString = sTemp
		return returnString;
	}
};

window.htmltmpl = new HTMLTemplate();

/***/

DomManipulation = function() {

	return (window.dMisc === undefined) ? this : window.dMisc;
}

DomManipulation.prototype = {
	addEventListener : function(ID, evtType, handler, type) {
		/*
		 We can provide.. provision for checking the IE and accordingly change event to attachEvent
		 */
		var docEle, i;
		switch(type) {
			case 'class':
				docEle = document.getElementsByClassName(ID);
				for ( i = 0; i < docEle.length; i++) {
					docEle[i].addEventListener(evtType, handler);
				}
				break;
			default:
				docEle = document.getElementById(ID);
				docEle.addEventListener(evtType, handler);
				break;
		}
	}
}

window.dMisc = new DomManipulation();

