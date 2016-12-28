function addDocument() {
	alert('poop');
	app.documents.add();
	alert('peepee');

	try {
	    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
	} catch (e) {
	    alert(e);
	}
	 
	if (xLib) {
	    var eventObj = new CSXSEvent();
		eventObj.type = "test";
		eventObj.data = 'poop';
	    eventObj.dispatch();
	    alert('kaka');
	}


	

};
