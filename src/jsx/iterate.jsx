// function iterate () {
// 	var len = activeDocument.layers.length;
// 	for (var i = 0; i < len; i++) {
// 		var layer = activeDocument.layers[i];
// 		activeDocument.activeLayer = layer;
// 		saveCss();
// 	}
// };


function iterate (lSet) {
	for(var i=0;i<lSet.layers.length; i++){
		activeDocument.activeLayer = lSet.layers[i];
		if(activeDocument.activeLayer.typename == 'LayerSet'){
			if(activeDocument.activeLayer.layers.length>0){
				iterate(activeDocument.activeLayer);
			}
		}
		else {
			if (activeDocument.activeLayer.kind == LayerKind.TEXT) {
				var eventObj1 = new CSXSEvent(); 
			    eventObj1.type = "outputText";
			    eventObj1.data = activeDocument.activeLayer.textItem.contents;
			    eventObj1.dispatch();
			};
			saveCss();
		}
	}
};