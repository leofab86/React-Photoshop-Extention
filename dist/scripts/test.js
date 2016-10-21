var csInterface = new window.CSInterface();

window.React = {};
window.React.SystemPath = csInterface.getSystemPath(SystemPath.USER_DATA);

console.log(window);
