// function iterate () {
// 	var len = activeDocument.layers.length;
// 	for (var i = 0; i < len; i++) {
// 		var layer = activeDocument.layers[i];
// 		activeDocument.activeLayer = layer;
// 		saveCss();
// 	}
// };


function iterate (lSet) {


	alert('Iterate Script reads global destination: ' + globalDestinationVar);
	var destination = globalDestinationVar;

	
	var docCopy = lSet.duplicate();
	var nameArray = [];
	var dupNameObj = {};
	var layerName;

	alert('iterate start');


	(function recurse (lSet) {
		for(var i=lSet.layers.length-1;i>-1; i--){

			activeDocument.activeLayer = lSet.layers[i];
			layerName = activeDocument.activeLayer.name;

			//Check for duplicates and change name
			if (!dupNameObj[layerName]) {
				dupNameObj[layerName] = 1;
			}
			// else if (dupNameObj[layerName] === 1) {
			// 	activeDocument.activeLayer.name = layerName + '-1';
			// 	dupNameObj[layerName] = 2;

			// } 
			else if (dupNameObj[layerName] > 0) {
				activeDocument.activeLayer.name = layerName + '-' + dupNameObj[layerName];
				dupNameObj[layerName] = dupNameObj[layerName] + 1;
			};


			layerName = activeDocument.activeLayer.name;
			
			if(activeDocument.activeLayer.typename == 'LayerSet'){
				
				if(layerName.indexOf('.png') !== -1) {
					alert('exporting layerSET '+layerName+ ' to PNG');

					smartirize();

					nameArray.push(layerName);
					saveCss();
					
				} else if (activeDocument.activeLayer.layers.length>0) {
					recurse(activeDocument.activeLayer);
				};
				
			}
			else {

				if (layerName.indexOf('.png') !== -1) {
					alert('exporting layer '+layerName+ ' to PNG');
					smartirize();
					nameArray.push(layerName);


				} else if (activeDocument.activeLayer.kind == LayerKind.TEXT) {
					var eventObj1 = new CSXSEvent(); 
					eventObj1.type = "outputText";
					eventObj1.data = activeDocument.activeLayer.textItem.contents;
					eventObj1.dispatch();
					
				} else if (activeDocument.activeLayer.kind == LayerKind.NORMAL) {
					nameArray.push(layerName);

				} else if (activeDocument.activeLayer.kind == LayerKind.SMARTOBJECT) {
					rasterize();
					nameArray.push(layerName);
				};
				
				saveCss();				
			}
		}
	})(docCopy);

	alert('iterate complete');

	exportLayer(destination, 'arrayOfLayers', JSON.stringify(nameArray));
	
};


function exportLayer (destination, selection, nameArray) {
	var generatorDesc = new ActionDescriptor();
	generatorDesc.putString (app.stringIDToTypeID ("name"), "reactPkgName");
	// Example of additional parameter passed to the node.js code:
	generatorDesc.putString (app.stringIDToTypeID ("selection"), selection );
	generatorDesc.putString (app.stringIDToTypeID ("destination"), destination );
	generatorDesc.putString (app.stringIDToTypeID ("nameArray"), nameArray );
	var returnDesc = executeAction (app.stringIDToTypeID ("generateAssets"), generatorDesc, DialogModes.NO);
};

function smartirize (){
	//Convert to smart object
	var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
	executeAction( idnewPlacedLayer, undefined, DialogModes.NO );

	rasterize();					
};

function rasterize (){
	var idrasterizeLayer = stringIDToTypeID( "rasterizeLayer" );
	var desc5 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
		var ref4 = new ActionReference();
		var idLyr = charIDToTypeID( "Lyr " );
		var idOrdn = charIDToTypeID( "Ordn" );
		var idTrgt = charIDToTypeID( "Trgt" );
		ref4.putEnumerated( idLyr, idOrdn, idTrgt );
	desc5.putReference( idnull, ref4 );
	var idWhat = charIDToTypeID( "What" );
	var idrasterizeItem = stringIDToTypeID( "rasterizeItem" );
	var idlayerStyle = stringIDToTypeID( "layerStyle" );
	desc5.putEnumerated( idWhat, idrasterizeItem, idlayerStyle );
	executeAction( idrasterizeLayer, desc5, DialogModes.NO );					
};


