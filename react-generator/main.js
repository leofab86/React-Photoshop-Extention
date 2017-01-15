(function() {
	"use strict"

	var pkg = require("./package");

	var fs = require('fs');
	var PNG = require('pngjs').PNG;
	var WebSocketServer = require('ws').Server; 
	var concat = require('concat-stream');

	// var PLUGIN_ID = pkg.name;
	var MENU_NAME = pkg.name;
	var MENU_LABEL = "React";

	console.log('before Init');
	console.log(MENU_NAME)
 
	var CUSTOM_PORT = 63422;

	var REACT_HOST;
	if (process.env.GEN_ENV == "development") {
		REACT_HOST = "http://127.0.0.1:6000";
	}else{
		REACT_HOST = "http://127.0.0.1:6001"; 
	}
	console.log("REACT_HOST " + REACT_HOST);


	var _document = null; 
	var _generator = null,
		_currentDocumentId = null,
		_config = null;

	var index2id = {};
	var index2name = {};
	var name2index = {};

	exports.init = function(generator, config){
		console.log('init start');
		//console.log(generator);
		_generator = generator;
		_config = config;

		_generator.addMenuItem(MENU_NAME, MENU_LABEL, true, false).then(function() {
			console.log("React Menu success.");
		}, function() {
			console.log("React Menu failure.");
		});


		_generator.onPhotoshopEvent("generatorMenuChanged", function(event) {  
			console.log('onPhotoshopEvent "generatorMenuChanged');
			// Ignore changes to other menus
			var menu = event.generatorMenuChanged;
			if (!menu || menu.name !== MENU_NAME) {
				console.log('menu name problem');
				return;
			}

			var path = event.generatorMenuChanged.destination;
			console.log(path);
			var selection = event.generatorMenuChanged.selection;

			_generator.getDocumentInfo(null).then(function (document) {
				_document = document;
				console.log(_document);			
				
				(function buildLayers (doc) {
					index2id[doc.index]= doc.id;
					index2name[doc.index] = doc.name;
					name2index[doc.name] = doc.index;


					if (doc.layers) {
						for (var i=0; i<doc.layers.length; i++) {
							buildLayers(doc.layers[i])
						};
					};
				})(_document);				
				console.log(name2index);
			

				if (selection === 'arrayOfLayers') {
					var nameArray = JSON.parse(event.generatorMenuChanged.nameArray);
					console.log(nameArray);

					// for (var x=0; x<40; x++) {
					// 	var pngPath = path + "/test"+x+".png";
					// 	var layerSpec = {
					// 		firstLayerIndex: x,
					// 		lastLayerIndex: x
					// 	};
					// 	exportLayerPng(_document, layerSpec, pngPath);
					// };

					
					for (var x=0; x<nameArray.length; x++) {
						var name = nameArray[x];
						
						console.log('Exporting ' + name);
						
						var index = name2index[name];
						var pngPath = path + "/" + name + ".png";

						var layerSpec = {
							firstLayerIndex: index,
							lastLayerIndex: index
						};

						exportLayerPng(_document, layerSpec, pngPath);

					};
				
				} else if (selection === 'selectedLayer') {

					(function exportSelection () {

						var selectionIndex = _document.selection[0];
						var id = index2id[selectionIndex];
						var name = index2name[selectionIndex];

						console.log(name + ' identified as selection: preparing to export');

						var pngPath = path + "/" + name + ".png";

						exportLayerPng(_document, id, pngPath);

					})();

				};	
			
			});

			//var startingMenuState = _generator.getMenuState(menu.name);
			//console.log("React menu event %s, starting state %s and %s", stringify(event), stringify(startingMenuState));


		});



		// var http = require('http');
		// var server = http.createServer(function(request, response) {});
		// server.listen(CUSTOM_PORT, '127.0.0.1');
		// console.log('listening at 127.0.0.1:'+CUSTOM_PORT);
		// var wss = new WebSocketServer({server: server});

		// wss.on('connection', function connection(ws) {
		// 	console.log('React connected on port %s.', CUSTOM_PORT);
		// 	ws.on('message', function incoming(message) {
		// 	    try {
		// 	        console.log('React received a message:');
		// 	        console.log(message);
		// 	        var parsedMessage = JSON.parse(message);
		// 	        console.log(parsedMessage);
		// 	        // Same timestamp should cascade through all upload params as it is used to identify Version.
		// 	        //if (parsedMessage.host) REACT_HOST = parsedMessage.host;
		// 	        // var params = {
		// 	        //         type: 'document_upload',
		// 	        //         api_key: parsedMessage.api_key,
		// 	        //         project_id: parsedMessage.project_id,
		// 	        //         document_id: parsedMessage.document_id,
		// 	        //         timestamp: parsedMessage.timestamp 
		// 	        // };

		// 	        // if (parsedMessage.message == "specctr_upload") {
		// 	        //     uploadDocumentPng(params);
		// 	        // }

		// 	        // if (parsedMessage.message == "specctr_upload_layer") {
		// 	        //     var layerParams = _.extend(params, {
		// 	        //         type: 'layer_upload',
		// 	        //         layer_id: parsedMessage.layer_id,
		// 	        //         layer_index: parsedMessage.layer_index
		// 	        //     });
		// 	        //     uploadLayerPng(layerParams);
		// 	        // }
		// 	    }catch(e){
				
		// 	    }
		// 	});
		// });
	}





	// /*********** HELPERS ***********/


	function savePixmap(pixmap){
		var pixels = pixmap.pixels;
		var len = pixels.length,
			channels = pixmap.channelCount;

		// convert from ARGB to RGBA, we do this every 4 pixel values (channelCount) 
		for(var i=0;i<len;i+=channels){
			var a = pixels[i];
			pixels[i]   = pixels[i+1];
			pixels[i+1] = pixels[i+2];
			pixels[i+2] = pixels[i+3];
			pixels[i+3] = a;
		}

		// init a new PNG
		var png = new PNG({
			width: pixmap.width,
			height: pixmap.height
		});

		// set pixel data
		png.data = pixmap.pixels;

		return png;
	}

	function exportLayerPng (_document, layerId, path) {
		_generator.getPixmap(_document.id, layerId, {}).then(function(pixmap){
			console.log("React got Pixmap for layer Id:" + layerId + " - "+pixmap.width+" x "+pixmap.height);
			var png = savePixmap(pixmap);

			var concatStream = concat(function(pngBuffer) {
				var wstream = fs.createWriteStream(path);
				wstream.write(pngBuffer);
				wstream.end();
			});

			png.pack().pipe(concatStream);

			console.log('finished');

		});

	}

	function stringify(object) {
		try {
			return JSON.stringify(object, null, "    ");
		} catch (e) {
			console.error(e);
		}
		return String(object);
	}
}())
