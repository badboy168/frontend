var init = function () {
    var scripts = ["base/config", 'lib/purl', "base/net",'lib/mui', 'user/home'];
    var oHead = document.getElementsByTagName('HEAD').item(0);
    for(var i=0;i<scripts.length;i++)
    {
        var oScript= document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src= "js/" + scripts[i] + ".js";
        oHead.appendChild( oScript);
    }
}




window.onload = function () {

}
