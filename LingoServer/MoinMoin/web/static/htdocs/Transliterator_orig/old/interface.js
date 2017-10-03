﻿/**************************************************************************************************************************
************************************        Romákßarí Interface Logic.       **********************************************
* The Interface javascript is bound to the interface.                                                                     *
* It does not contain the transliterator logic, but contains abstracted functions for the transliteration logic to access.*
* The Transliterator does not need to know what the fields are called, and how they are set.                              *
**************************************************************************************************************************/
var loaded=0;
var active_section='';
var active_script='';
var messgid='';
function setstyle(style,lang){
	
	return(0);
}
function getsetvalue(box,getorset,boxvalue){
	var tbox='source_textarea';
	if(box=='target'){
		tbox='target_textarea';
	}
	if(getorset=='get'){
		return(document.getElementById(tbox).value);
	}
	else{
		document.getElementById(tbox).value=boxvalue;
	}
	return(0);
}
function statusupdate(id){
  var message;
if(id==0){ id=messgid;}
  switch(id){
    case 'nindic' :
	            message='<p><b>North Indian Brahmi based scripts. These scripts mostly have straight strokes and a common lineage. </p>';
          break; 
	            case 'devanagari' :
	            message='<p>Devanagari is the dominant Indian script with many languages written in it. <br/>It is the standard script for Sanskrta, Hindi, Marathi, Nepali and Konkani. It is also used in a limited way for kashmiri.<br/>Modes decide how the writup is transliterated </p>';	
	break; 
	            case 'anusvar' :
           	            message='<p>Removes the nasal half-consonant that preceeds a consonant of the same type and replaces it with anusvara.</p>';
	break; 
	            case 'generic_dev' :
	            message='<p>Direct Transliteration, without modifications</p>';
	break; 
	            case 'sanskrta' :
  	            message='<p>Inherits Generic mode, with Sandhi transformations at end of words, according to rules of Sanskrta. Candrabindu is a strong Anusvara</p>';
	break; 
	            case 'hindi' :
	            message='<p>Inherits Generic mode, with transformations to match what is expected in Hindí. <br/>The Virama or halanta at end of words is removed. <br/>Candrabindu indicates nasalized vowel. Candrabindu becomes anusvara when it is difficult to place over a mátrá</p>';
	break; case 'marathi' :
	            message='<p>Inherits generic mode. Virama or halanta at end of words is removed</p>';
	break; case 'nepali' :
	break; case 'konkani' :
				message='<p>The official script for Kongkañí was recently standardized to Devanágarí. <br/>Kongkañí has many sounds that other Indian languages lack. Romákßarí is able to describe them all.</p>';
	            break; 
	            case 'kashmiri' :
	            break; 
	            case 'eastnagari' : 
	            message='<p>East Indian script, used for Bengali and Assamese languages. It is also used to write Sanskrta.</p>';
	break; case 'bangla' :
	            message='<p>Direct Transliteration, without modifications</p>';
	break; case 'assamese' :
	            message='<p>Direct Transliteration. Some mappings are different - eg. R is different.</p>';
	break; case 'manipuri' :
	            message='<p>Direct Transliteration, without modifications.</p>';
          break; case 'guramukhi' :
	            message='<p>Script used in Indian Punjab. Holy script of the Sikhs.</p>';
	break; case 'addhak' :
	           message='<p>Guramukhi uses a doubler modification called Addhak. This mode turns it on, so double-consonants are denoted by addhak</p>';
          break; case 'gujarati' :
	          message='<p>Gujarati script is similar to devanágarí with the absence of the top line. A mode may be needed to differenciate it from the generic mode</p>';
          break; case 'oriya' :
	          message='<p>Oriya script is a rounded version of the Bangla script, although it looks at first sight like a south-Indian rounded script.</p>';
    break; 
	  case 'sindic' : 
	            message='<p><b>South Indian Brahmi based scripts. These scripts have mostly rounded strokes. Consonant clusters are handled differently</b></p>';
          break; case 'kannada' :
	            message='<p>Kannada script. Can also be used for Sanskrta, konkani and other languages of Karnataka, like Tulu and kodagu</p>';
          break; case 'telugu' :
	            message='<p>Telugu script. Can also be used for Sanskrta. The script is similar to Kannada script.</p>';
          break; case 'tamil' :
	            message='<p>Tamil script is used specifically for Tamil language. It has some nuances that have to be kept in mind.</p><p>There is no distinction between voiced and unvoiced, or aspirated, unaspirated or fricatives. K, Kh, G, Gh, Xh are all denoted by the same letter. </p><p>This is thus a lossy script from a Sanskrta point of view.</p>';
          break; case 'malayalam' :
	            message='<p>Malayalam script is a derivative of the grantha script, which itself is a version of Tamil script modified for Sanskrta. Can be used to write Malayalam and Sanskrta.</p>';
          break; case 'sinhala' :
	            message='<p>Singhala script is used in Shrí Langkáva. It has some extra vowels (ä and  æ) and prenasal consonants (denoted in transliterator as µg, µd, µð, µj and µb). <br/>The µ (micro symbol) is used for prenasals. Script is used for Singhala, Páli and Sanskrta.</p>';
    break; case 'seasian' :
	            message='<p><b>SE Asian scripts are highly modified versions of the Brahmi script family. <br/>Many languages are polytonal, hence they have features not present in other Indic scripts, and some missing features.</p>';
          break; 
          break; case 'burmese' :
          break; case 'thai' :
          break; case 'khmer' :
break; case 'ceasian' :
		  message='<p><b>Central Asian scripts - used in Central Asia and also in other parts of Asia. Most are Indic scripts</p>';
		  break;
		  case 'tibetan' :
				message='<p>Tibetan script is used in Tibet and parts of India - Ladákh, Himáchal Pradesh, Uttaránchal, Sikkim and Bhután. It is a modified Indic Script</p>';
    break; case 'middleeastern' :
				message='<p><b>The West Asian scripts are characterized by their direction - Right-to-left - and the absence or optional indication of short vowels in the dominant scripts. </p><p>Arabic, Hebrew, Syriac and Phoenician belong to this group. In addition, Avestan is included here as well.</p>';
          break; case 'persoarabic' :
				message='<p>The Perso-Arabic script is the dominant script of West Asia, North Africa, Greater Iran and also used extensively in the Indian Subcontinent. </p><p>Since the number of languages written with this script is large, a number of modes are available, as the languages map sounds differently. </p><p>Two styles of writing are used - <b>Naqsh</b> - used for Arabic and most other languages and is easier to read, and <b>Nashta\'liq</b> - for Urdú and Persian</p>';
	break; case 'tashdid' :
				message='<p>The Perso-Arabic script usually does not denote short vowels. However, if the need arises, as in the Holy Books, a set of vowel markers are used, called the Tashdíd. This enables/disables the use of tashdíd. Tashdíd enables accurate transliteration - but most mainstream texts do not have all of them.</p>';
	break; case 'urdu' :
				message='<p>Urdú is a variant of Hindustání used in India and Pákistán. It is nearly the same language as Hindí and is mutually intelligible - except when technical and poetic terms are included. Urdú uses Persian as its source and is written in the Perso-arabic script - usually using the Nashta\'aliq style</p>';
	break; case 'shahmukhi' :
	break; case 'kashmiri' :
	break; case 'pashto' :
	break; case 'sindhi' :
	break; case 'persian' :
	break; case 'arabic' :
          break; case 'hebrew' : 
          break; case 'syriac' : 
          break; case 'mandaic' :
          break; case 'geez' :           
          break; case 'avestan' :
    break; case 'alphab':
				message='<p><b>The Alphabetic scripts are used in Europe and areas under European influence. </p><p>These scripts are characterized by absence of essential ligatures, presence of cases, and equal status provided to consonants and vowels. </p><p>Latin, Cyrillic, Greek, Armenian, Georgian and Coptic</p>';
          break; case 'latin' :
				message='<p>The Latin Script is the dominant script in the World today. </p><p>Apart from Latin and English, a large number of languages are written in it. It therefore has several modes.</p>';
	    break; case 'platin':
				message='<p>The Latin Script is the dominant script in the World today. </p><p>This is the Pseudo Latin mode.</p>';
	    break; case 'iast':
				message='<p>The International Standard for Sanskrit Transliteration is the Dominant standard for Sanskrit Transliteration.</p><p>The ISO 15919 is the extended standard for Indic script transliteration.</p>';
	    break; case 'english' :
				message='<p>Pseudo-English mode.</p><p>This mode attempts to write English. I know it is a pointless exercise in futility and bound to fail :-D</p>';
	    break; case 'lithuanian' :
	    break; case 'polish' :
	    break; case 'french' :
	    break; case 'german' :
	    break; case 'indonesian' :
          break; case 'greek' :
				message='<p>The Greek Script is the ancestral script among true Alphabets. It is used for Greek language in Greece and for classical texts.</p><p> It has many descendent scripts - Latin, Cyrillic and Coptic are its direct descendents</p>';
          break; case 'cyrillic' :
				message='<p>The Cyrillic Script is the dominant script of nations which have come under the influence of the Eastern Orthodox Church and later Russia and the USSR. </p><p>It is used to write a variety of languages including Slavic - Russian, Macedonian etc., Persian (TÃ¡jik) and Turkic languages';
	    break; case 'russian' :
	    break; case 'tajik' :
	    break; case 'azeri' :
          break; case 'armenian' :
          break; case 'georgian' :
				 break; case 'fantasy' :
				 message='<p><b>Scripts from fantasy worlds, or Fiction novels such as Middle Earth (Lord of the Rings) and Star Wars. <p></p>These scripts have surprisingly large fan followings, with some even successfully incorporated into Unicode. </p><p>By their very nature, these scripts are not in the UNICODE standard, or poorly implemented there. Custom fonts will therefore be needed for them</p>';
          break; case 'tengwar' :
				message='<p>For all you Lord of the Rings  and Tolkien fans out there. <p>A mode has been designed and implemented for the fictitious, yet well designed Tengwar Elvish script</p>';
	  break; case 'mordor' :
				message='<p>Make the script look like the flowing script of the One Ring.</p>';
				break; case 'artif' :
				message='<p><b>Artificial scripts are designed for a specific purpose. <br/>Some may be used for transcription of phonetic features, some for speech teaching, some for blind people, <br/>or some are artificial featural script designed on \'sound\' principles(pun intended)</p><p> Fantasy scripts have their own section and are not included here.</p>';
          break; case 'ipa' :
				message='<p>International phonetic alphabet. Get an accurate phonetic transcript from what you type in Romákßarí. This way one who knows IPA can figure out what is going on.</p>';
break; case 'braille' :
			   message='<p>Script for the blind. Special braille printers can put the dots on paper so that blind people can feel the script.</p>';
          break; case 'shawian' :
          break; case 'cirith' : 
          break; case 'vspeech' :
break; case 'easian' :
			   message='<p><b>East Asian languages are written in two ways, pictographic/logographic and phonetic.<br/>Pictographic systems are Traditional Chinese (Hanzi/Kanji) and Simplified Chinese. These cannot be transliterated directly</p><p>Phonetic Scripts are designed on Phonetic principles. They are syllabaries such as Bopomofo, Hiragana & Katakana to highly featural script such as Hangeul';
break; case 'bopomofo' :
			   message='<p>This is the phonetic syllabary used in China and Taiwan. It is derived from pictographical symbols with similar pronounciation.</p>';
break; case 'hiragana' :
			   message='<p>Phonetic syllabary used in Japan. This is used in Japan for writing Japanese words which have no associated Kanji or Chinese symbol.</p>';
break; case 'katakana' :
			   message='<p>Phonetic syllabary used in Japan. This is used mainly to transcribe foriegn words.</p>';
break; case 'hangeul' :
			   message='<p>Featural script from Korea. Called Hangeul in South Korea and Joseongeul in North Korea. <br/>It is considered one of the best-designed scripts in the World, and is thought to be derived from the Indian Brahmi script </p>';
break; case 'reset' :
			   message='This is the status box. It will give random information about scripts as you choose them, and additional status messages. Hover the mouse over the options to get a description. <br/>The header with \'target box\' written will change to indicate the target script active, if any. <br/>If the description is not accurate or you know better, please feel free to complain on the forum<br/>A number of scripts are not implemented and the menu entries are merely placeholders.<br/>These will be implemented as the author gets time to do so';
}
document.getElementById("status").innerHTML = message;
messgid=id;
}
function clear_input(){
	document.getElementById("source_textarea").value="";
	document.getElementById("target_textarea").value="";
	return(0);
}
function Checkstylemode(){
  /*Naqsh versus Nas'táliq is a style difference. Normal versus Italic is a style difference. The difference is usually in type of font - the script does not change*/
 return "none";
}
function Checkscribalcon(){
/*
  Scribal shortcuts and conveniences are shortforms or ligatures which are often optional. The anusvar mode is one such. choice between tippi and Bindi etc. 
  Capital and small letters, or retain capitalization are also such features. Multiple styles are simply written separated by a - :  tippi-addhak, bindi-addhak etc.
*/
 if( document.getElementById("anu").checked) { 
   return "anusvar";
 } else {
   return "";
 }
}
function Checkdoubler(){
/*The Tashdíd in Arabic scripts, Addhak in Guramukhi, are used to indicate a heavily stressed consonant, a doubled consonant. This function detects if the setting is present*/
}
function Checkcurrentscript(){
/*
  Scribal shortcuts and conveniences are shortforms or ligatures which are often optional. The anusvar mode is one such. The Tashdíd in Arabic scripts, Addhak in Guramukhi, choice between tippi and Bindi etc. 
  Capital and small letters, or retain capitalization are also such features. Multiple styles are simply written separated by a - :  tippi-addhak, bindi-addhak etc.
*/
 return document.getElementById("currentscript").value;
}
function Checklangmode(){
 /*
  Target languages may use the same script in different ways - Persian, Urdú, Arabic, Shahamukhí, Sindhí, Kashmíri, Pashto are languages written using same script - Arabic - , but they use the script very differently.
  Similarly - English, German, French, Czech, Indonesian, Turkish, Lithuanian, Polish ... etc. All use the Latin script. Hindí, Sanskrta, Kongkaní, Maráþhí, Nepáli etc. use Devanágarí. Conventions are different in these cases.
*/
 if(document.getElementById("sanskrta").checked) {
  return document.getElementById("sanskrta").value;
 }
 if(document.getElementById("hindi").checked) {
  return document.getElementById("hindi").value;
 }
 if(document.getElementById("generic").checked) {
  return document.getElementById("generic").value;
 }
}
/* ]]> */
