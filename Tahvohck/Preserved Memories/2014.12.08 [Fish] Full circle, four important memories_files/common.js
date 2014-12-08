
function toggleHide(id) {
	if (document.getElementById(id).style.display == "none") {
		document.getElementById(id).style.display = "";
	} else {
		document.getElementById(id).style.display = "none";
	}
}

function leadingZeros(number, length) {
    var str = '' + number;
    while (str.length < length) {
	str = '0' + str;
    }
    return str;
}

function persistentCollapse(xcsection){
    if (document.getElementById(xcsection).style.display == "none") {
        //save setting, inform user
        saveXCSetting(xcsection,'collapse');
    } else {
        //temporary collapse
        document.getElementById(xcsection).style.display = "none";
//        $("#"+xcsection).hide("slow");
    }
}

function persistentExpand(xcsection){
    if (document.getElementById(xcsection).style.display == "none") {
        //temporary expand
        document.getElementById(xcsection).style.display = "";
//        $("#"+xcsection).show("slow");
    } else {
        //save setting, inform user
        saveXCSetting(xcsection,'expand');
    }
}

function saveXCSetting(xcsection,xcstate){
    if (window.XMLHttpRequest){
        // code for IE7+, Firefox, Chrome, Opera, Safari
        savesetting=new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        savesetting=new ActiveXObject("Microsoft.XMLHTTP");
    }
    savesetting.onreadystatechange=function(){
        if (savesetting.readyState==4 && savesetting.status==200){
            //alert player that the save was successful
            if (xcstate=="expand"){
                var opposingstate = "collapse";
            } else {
                var opposingstate = "expand";
            }
            document.getElementById("saveXCSettingLink_"+xcsection+"_"+xcstate).style.border = '1px dotted #330000';
            document.getElementById("saveXCSettingLink_"+xcsection+"_"+opposingstate).style.border = 'none';
//            alert(savesetting.responseText);
            if (savesetting.responseText.length > 1){
                alert(savesetting.responseText);
            }
        }
    }
    savesetting.open("GET","ajax_savexcsetting.php?xcsection="+xcsection+"&xcstate="+xcstate,true);
    savesetting.send();
}