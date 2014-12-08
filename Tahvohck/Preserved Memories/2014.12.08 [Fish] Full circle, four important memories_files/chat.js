
//function loadnewchat(section,returnurl,overridemod) {
//    if (window.XMLHttpRequest){
//	    // code for IE7+, Firefox, Chrome, Opera, Safari
//	    xmlhttp=new XMLHttpRequest();
//    } else {
//	    // code for IE6, IE5
//	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    chattimer = setTimeout(function(){
//	loadnewchat(section,returnurl,overridemod)}
//    , 4000);
//    xmlhttp.onreadystatechange=function(){
//	if (xmlhttp.readyState==4 && xmlhttp.status==200 && chatrefreshesleft > 0){
//	    var returntext = xmlhttp.responseText;
//	    if (returntext.length > 1){
//		document.getElementById("chat_"+section).innerHTML = returntext;
//		var updateplayers = document.getElementById("typedisplay"+section).innerHTML.split(',');
//		stopAllTyping(section);
//		for(var i=0; i<updateplayers.length; i++){
//		    playerIsTyping(updateplayers[i],section);
//		}
//	    }
//	} else if (chatrefreshesleft <= 0){
//	    document.getElementById("chat_ajax_message_"+section).style.display="";
//	    document.getElementById("chat_ajax_message_"+section).innerHTML = 'Auto-update has timed out.  Click any link to re-enable auto-update chat.';
//	    clearTimeout(chattimer);
//	}
//    }
//    xmlhttp.open("GET","ajaxchat.php?section="+section+"&returnurl="+returnurl+"&overridemod="+overridemod,true);
//    xmlhttp.send();
//    chatrefreshesleft -= 1;
//}

function jsreltime(currenttime,autoreload){
    var elements = document.getElementsByTagName('span');
    for (var i=0; i<elements.length; i++) {
	if (elements[i].getAttribute('commenttime')){
	    var commenttime = elements[i].getAttribute('commenttime');
	    var secondsago = currenttime-commenttime;
	    var daysago = parseInt(secondsago/86400);
	    var hoursago = parseInt(secondsago/3600);
	    var minutesago = parseInt(secondsago/60);
	    var timedisplay;

	    if (daysago >= 1){
		var remaininghours = hoursago-(daysago*24);
		timedisplay = '<span class=\'colDkMagenta\'>'+leadingZeros(daysago,2)+'</span>d<span class=\'colDkYellow\'>'+leadingZeros(remaininghours,2)+'</span>h';
	    } else if (hoursago >= 1){
		var remainingminutes = minutesago-(hoursago*60);
		timedisplay = '<span class=\'colDkYellow\'>'+leadingZeros(hoursago,2)+'</span>h<span class=\'colDkCyan\'>'+leadingZeros(remainingminutes,2)+'</span>m';
	    } else if (minutesago >= 1){
		var remainingseconds = secondsago-(minutesago*60);
		timedisplay = '<span class=\'colDkCyan\'>'+leadingZeros(minutesago,2)+'</span>m<span class=\'colDkRed\'>'+leadingZeros(remainingseconds,2)+'</span>s';
	    } else {
		timedisplay = '<span class=\'colDkCyan\'>00m<span class=\'colDkRed\'>'+leadingZeros(secondsago,2)+'</span>s';
	    }

	    elements[i].innerHTML='<span style=\'font-family: Courier New, Courier, monospace;\'>['+timedisplay+']</span>';
	}
    }
    if (autoreload){
	currenttime++;
	setTimeout(function(){jsreltime(currenttime,autoreload)}, 1000);
    }
}

function playerIsTyping(acctid,section){
    var elements = document.getElementsByTagName('span');
    for (var i=0; i<elements.length; i++) {
	if (elements[i].getAttribute('onlinestatus_acctid')==acctid && elements[i].getAttribute('chatsection')==section){
	    elements[i].style.display="none";
	} else if (elements[i].getAttribute('typingstatus_acctid')==acctid && elements[i].getAttribute('chatsection')==section){
	    elements[i].style.display="";
	}
    }
}

function stopAllTyping(section){
    var elements = document.getElementsByTagName('span');
    for (var i=0; i<elements.length; i++) {
	if (elements[i].getAttribute('onlinestatus_acctid')>=1 && elements[i].getAttribute('chatsection')==section){
	    elements[i].style.display="";
	} else if (elements[i].getAttribute('typingstatus_acctid')>=1 && elements[i].getAttribute('chatsection')==section){
	    elements[i].style.display="none";
	}
    }
}

function showStaticNames(){
    var elements = document.getElementsByTagName('span');
    for (var i=0; i<elements.length; i++) {
	if (elements[i].getAttribute('staticname')){
	    elements[i].innerHTML=elements[i].getAttribute('staticname');
	}
    }
}

//function typedisplay(section,acctid,oldchars){
//    newchars = document.getElementById('input'+section).value;
//    if (newchars.length>2){
//	alert(newchars);
//    }
//    
//    document.getElementById("typedisplay"+section).innerHTML = section;
//
//    if (window.XMLHttpRequest){
//	    // code for IE7+, Firefox, Chrome, Opera, Safari
//	    txmlhttp=new XMLHttpRequest();
//    } else {
//	    // code for IE6, IE5
//	    txmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    txmlhttp.onreadystatechange=function(){
//	    if (txmlhttp.readyState==4 && txmlhttp.status==200){
////		    var updateplayers = txmlhttp.responseText.split(',');
////		    for(var i=0; i<updateplayers.length; i++){
////			playerIsTyping(updateplayers[i]);
////		    }
//		    document.getElementById("typedisplay"+section).innerHTML = txmlhttp.responseText;
//	    }
//	    setTimeout(function(){typedisplay(section,acctid,newchars)}, 1000);
//    }
//    if (oldchars.length<newchars.length){
//	    txmlhttp.open("GET","typeindicator.php?section="+section+"&updateplayer=".acctid,true);
//    } else {
//	    txmlhttp.open("GET","typeindicator.php?section="+section+"&updateplayer=0",true);
//    }
//    txmlhttp.send();
//}