var csInterface = new window.CSInterface();

window.React = {};
//window.React.SystemPath = csInterface.getSystemPath(SystemPath.USER_DATA);
window.React.ApplicationPath = csInterface.getSystemPath(SystemPath.APPLICATION);

console.log(window);
