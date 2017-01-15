var csInterface = new window.CSInterface();

window.React = {};
//window.React.SystemPath = csInterface.getSystemPath(SystemPath.USER_DATA);
window.React.ApplicationPath = csInterface.getSystemPath(SystemPath.APPLICATION);

console.log(window);

function loadJSX (fileName) {
	var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/dist/jsx/";
	csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
};

loadJSX('json2.jsx');
