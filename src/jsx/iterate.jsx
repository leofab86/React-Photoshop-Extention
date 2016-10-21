function iterate () {
	var len = activeDocument.layers.length;
    for (var i = 0; i < len; i++) {
        var layer = activeDocument.layers[i];
        activeDocument.activeLayer = layer;
        saveCss();
    }
};
