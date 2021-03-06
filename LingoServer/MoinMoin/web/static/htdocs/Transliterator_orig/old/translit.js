﻿/**************************************************************************************************************************
************************************        Romákßarí Transliteration Logic.       **********************************************
* The Transliteration interface contains the core logic of transliteration. It is a simple search and replace function    *
* It does not contain the interface logic, but accesses abstracted functions from the interface logic to access.          *
* The Transliterator does not need to know what the fields are called, and how they are set.                              *
**************************************************************************************************************************/
/*
function strreplace(temp,xx,yy){
	if(xx == yy) return temp;
	var index=temp.indexOf(xx);
	while(index != -1){
		temp=temp.replace(xx,yy);
		index = temp.indexOf(xx);
	}
	return temp;
}
*/

function strreplace(temp, xx, yy){
	return temp.replace(new RegExp(String(xx).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),yy);
}


function trans2dev(textinp,langmode,scriptcon){

	for (var  i=0; i<transtbl1.length ; i++){		temp=strreplace(temp,transtbl1[i][0],transtbl1[i][1]);	}
	if(langmode=='sanskrta'){
		for (var  i=0; i<transtbls1.length ; i++){		temp=strreplace(temp,transtbls1[i][0],transtbls1[i][1]);	}
		document.getElementById("status").innerHTML+="trans Sanskrit"+transtbls1.length;
	}
	if(langmode=='hindi'){
		for (var  i=0; i<transtbl1hin.length ; i++){		temp=strreplace(temp,transtbl1hin[i][0],transtbl1hin[i][1]);	}
		
	}
	if(scriptcon=='anusvar'){
	  document.getElementById("status").innerHTML+=transanu.length;
		for (var  i=1; i<transanu.length ; i++){		temp=strreplace(temp,transanu[i][0],transanu[i][1]);	
		  document.getElementById("status").innerHTML+=transanu[i][0]+" "+transanu[i][1]+"\n";
		}
	}
	for (var  i=0; i<transtbl2.length ; i++){		temp=strreplace(temp,transtbl2[i][0],transtbl2[i][1]);	}
	if(langmode=='sanskrta'){
		for (var  i=0; i<transtbls3.length ; i++){		temp=strreplace(temp,transtbls3[i][0],transtbls3[i][1]);	}
	}
	for (var  i=0; i<transtbl3.length ; i++){		temp=strreplace(temp,transtbl3[i][0],transtbl3[i][1]);	}
	document.getElementById("status").innerHTML=langmode;
	document.getElementById("status").innerHTML+=scriptcon;
	
	/*Modes to be checked are language conventions. To be updated when interface is completed*/
	
	
	if(langmode=='hindi'){
		for (var  i=0; i<transtblhin.length ; i++){		temp=strreplace(temp,transtblhin[i][0],transtblhin[i][1]);	}
		
	}
	
	return(temp);
}


function doublecheck(textinp,script,direction){
  /*This function checks if a letter has been repeated many times. This may or may not include a halanta-type symbol occuring between them.
  This mode is useful - for example with the Tashdíd mode in Arabic (Sukún is the halanta) or the Addhak mode in Panjábí. It replaces the doubled letter with preceeding halanta with a ² .
	Direction indicates whether the adhak or tashdid has to be expanded (1), or the expanded form has to be replaced by doubler symbol(0).
*/ 
var temp=textinp;
switch(script){
	case 'persoarabic' :
		if(direction==1){
			for (var  i=0; i<transurdud.length ; i++){		temp=strreplace(temp,transurdud[i][0],transurdud[i][1]);	}
		}
		else {
			for (var  i=0; i<transurdud.length ; i++){		temp=strreplace(temp,transurdud[i][1],transurdud[i][0]);	}
		}
		break;
	case 'guramukhi' :
		if(direction==1){
			for (var  i=0; i<transgurud.length ; i++){		temp=strreplace(temp,transgurud[i][0],transgurud[i][1]);	}
		}
		else {
			for (var  i=0; i<transgurud.length ; i++){		temp=strreplace(temp,transgurud[i][1],transgurud[i][0]);	}
		}
		break;
	}
return temp;
}

function transtext_rmdv(id) {
	if(id == 0){
		id=Checkcurrentscript();
		} else{
			document.getElementById("target_script").innerHTML = document.getElementById(id).innerHTML;
		}
	var temp2=document.getElementById("source_textarea").value;
/*To be removed */
/*Fillers section. The system detects only space as whitespace or word boundaries. This other characters are 'cushioned' with spaces temporarily*/
	temp="੿ "+temp2+" ੿";
	temp=strreplace(temp,"\t"," ⁩ ");
	temp=strreplace(temp,"\n"," ﬅ ");
/*For now, we deal with lower case only. for IAST etc., we shall see*/
	temp=temp.toLowerCase();

/*Done with the cushioning*/

	var scriptcon=Checkscribalcon();
	var langmode=Checklangmode();
/**/
document.getElementById("target_dialect").innerHTML = langmode;
	document.getElementById("target_textarea").dir="ltr";
	switch(id){
		case 'devanagari' :
			temp=trans2dev(temp,langmode,scriptcon);
			document.getElementById("target_textarea").lang="sa";
			break;
		case 'eastnagari' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transban.length ; i++){		temp=strreplace(temp,transban[i][0],transban[i][1]);	}
		/*placeholder for Bangla, Assamese, Bishnupriya modes */
			
			break;
		case 'oriya' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transori.length ; i++){		temp=strreplace(temp,transori[i][0],transori[i][1]);	}
			break;
		case 'guramukhi' :
		/*disambiguate the modes*/
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transguru.length ; i++){		temp=strreplace(temp,transguru[i][0],transguru[i][1]);	}
			temp=doublecheck(temp,id,1);
			break;
		case 'gujarati' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transguj.length ; i++){		temp=strreplace(temp,transguj[i][0],transguj[i][1]);	}
			break;
		case 'kannada' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transkan.length ; i++){		temp=strreplace(temp,transkan[i][0],transkan[i][1]);	}        
			break;
		case 'tamil' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transtam.length ; i++){		temp=strreplace(temp,transtam[i][0],transtam[i][1]);
			}
			break;
		case 'telugu' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transtel.length ; i++){		temp=strreplace(temp,transtel[i][0],transtel[i][1]);	}
			break;
		case 'malayalam' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transmal.length ; i++){		temp=strreplace(temp,transmal[i][0],transmal[i][1]);	}        
			break;
		case 'sinhala' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transsin.length ; i++){		temp=strreplace(temp,transsin[i][0],transsin[i][1]);	}
		        break;
/*Indic script section ends here*/
		case 'persoarabic' :
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transurdu.length ; i++){		temp=strreplace(temp,transurdu[i][0],transurdu[i][1]);	}
		temp=doublecheck(temp,id,1);
			break;
		case 'iast' :
		        temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transiast.length ; i++){		temp=strreplace(temp,transiast[i][0],transiast[i][1]);	}
			break;
		case 'ipa' :
		        temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transipa.length ; i++){		temp=strreplace(temp,transipa[i][0],transipa[i][1]);	}
			break;
		case 'tengwar' :
			temp=strreplace(temp,".","ˆ");
			temp=strreplace(temp,"!","›");
			temp=trans2dev(temp,langmode,scriptcon);
			for (var  i=0; i<transteng.length ; i++){		temp=strreplace(temp,transteng[i][0],transteng[i][1]);	}
	
		default :
			;
	}
	temp=temp.replace(/^\u0020/,"");
	temp=temp.replace(/ # /g,"\n");
	/*Remove cushioning*/
        temp=strreplace(temp,'੿ ','');
	temp=strreplace(temp,' ੿','');
	temp=strreplace(temp,'੿ ','');
	temp=strreplace(temp,' ﬅ ',"\n");
	temp=strreplace(temp,'ﬅ',"\n");
	temp=strreplace(temp," ⁩ ","\t");
/*Removed*/
	document.getElementById("currentscript").value=id;
	document.getElementById("target_textarea").value=temp;
	return 0;
}

function dvrm() {
	var id=Checkcurrentscript();
	var temp=document.getElementById("target_textarea").value;
	var deva=0;
	switch (id){ /*Absence of Capital/Small letters - inherit Devanagari script*/
		case 'eastnagari' :
			for (var  i=0; i<transban.length ; i++){		temp=strreplace(temp,transban[i][1],transban[i][0]);	}
			deva=1;
			break;
		case 'oriya' :
			for (var  i=0; i<transori.length ; i++){		temp=strreplace(temp,transori[i][1],transori[i][0]);	}
			deva=1;
			break;
		case 'sinhala' :
			for (var  i=0; i<transsin.length ; i++){		temp=strreplace(temp,transsin[i][1],transsin[i][0]);	}
			deva=1;
			break;
		case 'malayalam' :			
			for (var  i=0; i<transmal.length ; i++){		temp=strreplace(temp,transmal[i][1],transmal[i][0]);	}
			deva=1;
			break;
		case 'kannada' :
			for (var  i=0; i<transkan.length ; i++){		temp=strreplace(temp,transkan[i][1],transkan[i][0]);	}
			deva=1;
			break;
		case 'telugu' :
			for (var  i=0; i<transtel.length ; i++){		temp=strreplace(temp,transtel[i][1],transtel[i][0]);	}
			deva=1;
			break;
		case 'gujarati' :
			for (var  i=0; i<transguj.length ; i++){		temp=strreplace(temp,transguj[i][1],transguj[i][0]);	}
			deva=1;
			break;
		case 'tamil' :
			for (var  i=0; i<transtam.length ; i++){		temp=strreplace(temp,transtam[i][1],transtam[i][0]);	}
			deva=1;
			break;
		case 'persoarabic' :
			for (var  i=0; i<translaturdu.length ; i++){		temp=strreplace(temp,translaturdu[i][1],translaturdu[i][0]);	}
			deva=1;
			break;
		case 'guramukhi' :
			temp=doublecheck(temp,'\u0A71','\u0A4D',1);
			for (var  i=0; i<transguru.length ; i++){		temp=strreplace(temp,transguru[i][1],transguru[i][0]);	}
			deva=1;
			break;
		case 'tengwar' :
			for (var  i=0; i<transteng.length ; i++){		temp=strreplace(temp,transteng[i][1],transteng[i][0]);	}
			deva=1;
			break;
			temp=strreplace(temp,"ˆ",".");
			temp=strreplace(temp,"›","!");
			break;
		case 'devanagari' :
			deva=1;
			break;
		default :
	}
	if(deva==1){
		for (var  i=0; i<transrom.length ; i++){		temp=strreplace(temp,transrom[i][0],transrom[i][1]);	}
		if(Checklangmode()=='sanskrta'){
			for (var  j=0; j<transsanrom.length ; j++){ temp=strreplace(temp,transsanrom[j][0],transsanrom[j][1]);	 }
		}else 		if(Checklangmode()=='hindi'){
			for (var  j=0; j<transhinrom.length ; j++){ temp=strreplace(temp,transhinrom[j][0],transhinrom[j][1]);	temp=temp+'hindí';}
		} 
	}
	switch(id) {
	/*Capital/Small letters present. So Devanagari script is not used. Alphabetic scripts */
		default:
	}
	
	document.getElementById("source_textarea").value=temp;
	return;
}

