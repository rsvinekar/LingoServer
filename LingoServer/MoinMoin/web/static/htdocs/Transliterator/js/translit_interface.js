var sourceLock = false;
var targetLock = false;
$(function() {
       $( ".fullscreen" ).button({
			text: false,
			icons: {
				primary: "fa fa-arrows-alt"
			}
		}).click(function(){
			if (BigScreen.enabled) {
                 BigScreen.toggle();
            }
            else {
                 window.open(window.location.href,"_blank","fullscreen,scrollbars")
            }
                  // fallback for browsers that don't support full screen
        });
	
	    $( "#source_accordion" ).accordion({
			heightStyle: "auto"
		});
	    $( "#target_accordion" ).accordion({
			heightStyle: "auto"
		});
		$( ".make_italic").button({
			text:false,
		  icons: {primary: 'fa fa-italic'}
		});
		$( ".make_bold").button({
			text:false,
		  icons: {primary: 'fa fa-bold'}
		});
		$( ".align_right").button({
		  text:false,
		  icons: {primary: 'fa fa-align-right'}
		});
		$( ".align_left").button({
		  text:false,
		  icons: {primary: 'fa fa-align-left'}
		});
		$( ".align_center").button({
		  text:false,
		  icons: {primary: 'fa fa-align-center'}
		});
		$( ".bidi_ltr").button({
		  text:false,
		  icons: {primary: 'fa fa-hand-o-right'}
		});
		$( ".bidi_rtl").button({
		  text:false,
		  icons: {primary: 'fa  fa-hand-o-left'}
		});
		$( ".bidi_auto").button({
		  text:false,
		  icons: {primary: 'fa fa-thumbs-o-up'}
		});
		$( ".bidi_override").button({
		  text:false,
		  icons: {primary: 'fa  fa-gavel'}
		});
		
		$( ".translit" ).click(function() {
			var options;
			if ( $( this ).text() === "Active Transliteration OFF" ) {
				options = {	label: "Active Transliteration ON",	icons: { primary: "fa fa-cog fa-spin" } };
			} else {	options = {	label: "Active Transliteration OFF" ,	icons: { primary: "fa fa-refresh"  } };
			}
			$( this ).button( "option", options );
		});
		$( ".lock_settings" ).button({
			text: false,
			icons: {
				primary: "fa fa-chain-broken"
			}
		}).click(function() {
			var options;
			if ( $( this ).text() === "Lock OFF" ) {
				options = {	label: "Lock ON",	icons: { primary: "fa fa-link" } };
			} else {	
				options = {	
							label: "Lock OFF" ,	
							icons: { 
									primary: "fa fa-chain-broken"  
							} 
						};
			}
			$( this ).button( "option", options );
			
		});
		/*****************************************/
		$('#source_test').button({text:false, icons: {primary: 'fa fa-lg fa-h-square'}});
		
		/*source box functions*/
		$( "#source_align_left" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("text-align","left");
			}
		});
		$( "#source_align_right" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("text-align","right");
			}
		});
		$( "#source_align_center" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("text-align","center");
			}
		});
		$( "#source_bidi_rtl" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("direction","rtl");
			}
		});
		$( "#source_bidi_ltr" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("direction","ltr");
			}
		});
		$( "#source_bidi_auto" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("direction","");
			}
				
		});
		$( "#source_bidi_opts").buttonset();
		$( "#source_bidi_override" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("unicode-bidi","bidi-override");
			}
			else {
				$( "#source_textarea" ).css("unicode-bidi","normal");
			}
		});
		
		$( "#source_make_italic" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("font-style","italic");
			} else {
				$( "#source_textarea" ).css("font-style","");
			}
		});
		$( "#source_make_bold" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#source_textarea" ).css("font-weight","bold");
			} else {
				$( "#source_textarea" ).css("font-weight","");
			}
		});
		$( "#source_font").keypress(function (e) {
			if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			var fontstyles=$(this).val();			
			fontstyles=fontstyles.replace(/\,\s*$/,"");
			fontstyles=fontstyles.replace(/^/,"'");
			fontstyles=fontstyles.replace(/,\s*/,"','");
			fontstyles=fontstyles.replace(/\s*$/,"'");
			$( "#source_textarea").css("font-family",fontstyles );
			return false;
			} else {
			return true;
			}
		});
		
		$( "#source_repeat" ).buttonset();
		$( "#source_stop" ).button({ 
			text: false, 
			icons: { 
				primary: "ui-icon-stop" 
			}
		}).click(function() {
			$( "#source_play" ).button( "option", { 
					label: "play", icons: { primary: "ui-icon-play" }
				
			});
		});
		$( "#source_fontstyles").buttonset();
		$( "#source_fontalign").buttonset();
		$('#source_lineheight').spinner({ 
			min: 2.0, 
			max: 400.0, 
			step: 0.1,
			page: 1.0,
			incremental:true
		}); 
		$('#source_lineheight').on('spin change stop load',function( event, ui) {
				var height=this.value+"px";
				$('#source_textarea').css("line-height",height);
			if ( $('#source_lock').text() == "Lock ON" ) {
				$('#target_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#target_textarea').css("line-height",height);
			}
			
		});
		$( "#source_lineheight" ).keypress( function(event,ui) {
		  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		    var height=this.value+"px";
				$('#source_textarea').css("line-height",height);
			if ( $('#source_lock').text() == "Lock ON" ) {
				$('#target_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#target_textarea').css("line-height",height);
			}
		  }
		});
		$('#source_lock').on('click',function( event, ui) {
			  if ( $('#source_lock').text() == "Lock ON" ) {
				$('#target_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#target_textarea').css("line-height",height);
			  }
		});
		
		$('#source_fontlock').on('click',function( event, ui) {
			  if ( $('#source_fontlock').text() == "Lock ON" ) {
				$('#target_fontsize').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#target_textarea').css("font-size",height);
			  }
		});
		$('#source_fontsize').spinner({ 
			min: 2, 
			max: 400,
			step: 1,
			page: 10,
			incremental:true
		});
		$('#source_fontsize').on('spin change stop load',function( event, ui) {
			var size=this.value+"px";
			$('#source_textarea').css("font-size",size);
			if ( $('#source_fontlock').text() == "Lock ON" ) {
			  	$('#target_fontsize').spinner('value', ui.value );
			  	var size=ui.value+"px";
				$('#target_textarea').css("font-size",size);
			}
			if ( $('#source_sizeheightlock').text() == "Lock ON" ) {
			  	$('#source_lineheight').spinner('value', ui.value );
			  	var height=ui.value+"px";
			  	$('#source_textarea').css("line-height",height);
			}
		});
		$( "#source_fontsize" ).keypress( function(event, ui) {
		  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		                var size=this.value+"px";
				$('#source_textarea').css("font-size",height);
			if ( $('#source_fontlock').text() == "Lock ON" ) {
				$('#target_fontsize').spinner('value', ui.value );
				var size=ui.value+"px";
				$('#target_textarea').css("line-height",size);
			}
			if ( $('#source_sizeheightlock').text() == "Lock ON" ) {
				$('#source_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#source_textarea').css("line-height",height);
			}
		  }
		});
		
		
		
		/*Target box functions*/
		$('#target_test').button({text:false, icons: {primary: 'fa fa-lg fa-h-square'}});
		
		/*target box functions*/
		$( "#target_align_left" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("text-align","left");
			}
		});
		$( "#target_align_right" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("text-align","right");
			}
		});
		$( "#target_align_center" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("text-align","center");
			}
		});
		$( "#target_bidi_rtl" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("direction","rtl");
			}
		});
		$( "#target_bidi_ltr" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("direction","ltr");
			}
		});
		$( "#target_bidi_auto" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("direction","");
			}
				
		});
		$( "#target_bidi_opts").buttonset();
		$( "#target_bidi_override" ).click(function() {
			var $this = $(this);
			
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("unicode-bidi","bidi-override");
			}
			else {
				$( "#target_textarea" ).css("unicode-bidi","normal");
			}
		});
		
		$( "#target_make_italic" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("font-style","italic");
			} else {
				$( "#target_textarea" ).css("font-style","");
			}
		});
		$( "#target_make_bold" ).click(function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				$( "#target_textarea" ).css("font-weight","bold");
			} else {
				$( "#target_textarea" ).css("font-weight","");
			}
		});
		$( "#target_font").keypress(function (e) {
			if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			var fontstyles=$(this).val();			
			fontstyles=fontstyles.replace(/\,\s*$/,"");
			fontstyles=fontstyles.replace(/^/,"'");
			fontstyles=fontstyles.replace(/,\s*/,"','");
			fontstyles=fontstyles.replace(/\s*$/,"'");
			$( "#target_textarea").css("font-family",fontstyles );
			return false;
			} else {
			return true;
			}
		});
		
		$( "#target_repeat" ).buttonset();
		$( "#target_stop" ).button({ 
			text: false, 
			icons: { 
				primary: "ui-icon-stop" 
			}
		}).click(function() {
			$( "#target_play" ).button( "option", { 
					label: "play", icons: { primary: "ui-icon-play" }
				
			});
		});
		$( "#target_fontstyles").buttonset();
		$( "#target_fontalign").buttonset();
		$('#target_lineheight').spinner({ 
			min: 2.0, 
			max: 400.0, 
			step: 0.1,
			page: 1.0,
			incremental:true
		}); 
		$('#target_lineheight').on('spin change stop load',function( event, ui) {
				var height=this.value+"px";
				$('#target_textarea').css("line-height",height);
			if ( $('#target_lock').text() == "Lock ON" ) {
				$('#source_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#source_textarea').css("line-height",height);
			}
			
		});
		$( "#target_lineheight" ).keypress( function(event,ui) {
		  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		    var height=this.value+"px";
				$('#target_textarea').css("line-height",height);
			if ( $('#target_lock').text() == "Lock ON" ) {
				$('#source_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#source_textarea').css("line-height",height);
			}
		  }
		});
		$('#target_lock').on('click',function( event, ui) {
			  if ( $('#target_lock').text() == "Lock ON" ) {
				$('#source_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#source_textarea').css("line-height",height);
			  }
		});
		
		$('#target_fontlock').on('click',function( event, ui) {
			  if ( $('#target_fontlock').text() == "Lock ON" ) {
				$('#source_fontsize').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#source_textarea').css("font-size",height);
			  }
		});
		$('#target_fontsize').spinner({ 
			min: 2, 
			max: 400,
			step: 1,
			page: 10,
			incremental:true
		});
		$('#target_fontsize').on('spin change stop load',function( event, ui) {
			var size=this.value+"px";
			$('#target_textarea').css("font-size",size);
			if ( $('#target_fontlock').text() == "Lock ON" ) {
			  	$('#source_fontsize').spinner('value', ui.value );
			  	var size=ui.value+"px";
				$('#source_textarea').css("font-size",size);
			}
			if ( $('#target_sizeheightlock').text() == "Lock ON" ) {
			  	$('#target_lineheight').spinner('value', ui.value );
			  	var height=ui.value+"px";
			  	$('#target_textarea').css("line-height",height);
			}
		});
		$( "#target_fontsize" ).keypress( function(event, ui) {
		  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		                var size=this.value+"px";
				$('#target_textarea').css("font-size",height);
			if ( $('#target_fontlock').text() == "Lock ON" ) {
				$('#source_fontsize').spinner('value', ui.value );
				var size=ui.value+"px";
				$('#source_textarea').css("line-height",size);
			}
			if ( $('#target_sizeheightlock').text() == "Lock ON" ) {
				$('#target_lineheight').spinner('value', ui.value );
				var height=ui.value+"px";
				$('#target_textarea').css("line-height",height);
			}
		  }
		});
		/***********/
		
		var $header_tabs = $( "#header_tabs").tabs({
			heightStyle: "auto"
		});
		
	});

//http://www.featureblend.com/license.txt
var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){}
return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}
return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};}
return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};FlashDetect.JS_RELEASE="1.0.4";

if(!FlashDetect.installed){document.getElementById('flashwarn').innerHTML = "Flash not working. That's ok, but you won't get an automated list of fonts. You will have to manually type in the font names.";}
	
	var availableTags = new Array();
	$(function() {
		
		function split( val ) {
			return val.split( /,\s*/ );
		}
		function extractLast( term ) {
			return split( term ).pop();
		}

		$( "#target_font,#source_font" )
			// don't navigate away from the field on tab when selecting an item
			.bind( "keydown", function( event ) {
				if ( event.keyCode === $.ui.keyCode.TAB &&
						$( this ).data( "autocomplete" ).menu.active ) {
					event.preventDefault();
				}
			})

			.autocomplete({
				minLength: 2,
				source: function( request, response ) {
					// delegate back to autocomplete, but extract the last term
					response( $.ui.autocomplete.filter(
						availableTags, extractLast( request.term ) ) );
				},
				focus: function() {
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {
					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value );
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					this.value = terms.join( ", " );
					return false;
				}
			});
			
	});
/***Font detect through the Adobe flash****/
function populateFontList(fontArr)
{
	var allFontsCounter = 0;
	var regularFontsCounter = 0;
	var allFontsHTML = '<ul>';
	var regularFontsHTML = allFontsHTML;
	
	for (var key in fontArr)
	{
		var fontName = fontArr[key];
		
		// trim
		fontName = fontName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		if (!(fontName.match(/[_\-\s]Italic$/)
			|| fontName.match(/[_\-\s](Demi)?[Bb]old$/)
			|| fontName.match(/[_\-\s]Medium$/)
			|| fontName.match(/[_\-\s](Ultra)?[Ll]ight$/)
			|| fontName.match(/[_\-\s]Condensed$/)
			)) {
			fontName = fontName.replace(/\s*Regular$/, '');
			availableTags.push(fontName);
		}
		
	}
	
	
}
$(function() {

    var options1 = {
            empty_value: 'null',
            indexed: true,  // the data in tree is indexed by values (ids), not by labels
            on_each_change: '/?action=opttree', // this file will be called with 'id' parameter, JSON data must be returned
            choose: function(level) {
                if(level == 0) { return "Script Family"}
                if(level == 1) { return "Choose Script"}
                if(level == 2) { return "Choose Dialect"}
            },
            preselect: {'source_opts': ['50','51','53']},
            select_class: 'source_opts_tree'
        };

        var displayParents = function() {
            var labels = []; // initialize array
            $(this).siblings('select') // find all select
                           .find(':selected') // and their current options
                             .each(function() { labels.push($(this).text()); }); // and add option text to array
                             $('#source_opts_chosen').html('<span id="source_opts_family">' + labels[0] + '</span>,<span  id="source_opts_script">' + labels[1] + '</span><span id="source_opts_dialect" >' + labels[2] + '</span>');  // and display the labels
            }

    $.getJSON('/?action=opttree', function(tree) { // initialize the tree by loading the file first
        $('input[name=source_opts]').optionTree(tree, options1).change(displayParents);
    });
});
$(function() {

    var options2 = {
            empty_value: 'null',
            indexed: true,  // the data in tree is indexed by values (ids), not by labels
            on_each_change: '/?action=opttree', // this file will be called with 'id' parameter, JSON data must be returned
            choose: function(level) {
                if(level == 0) { return "Script Family"}
                if(level == 1) { return "Choose Script"}
                if(level == 2) { return "Choose Dialect"}
            },
            preselect: {'target_opts': ['0','1','3']},
            select_class: 'target_opts_tree'
        };

        var displayParents = function() {
            var labels = []; // initialize array
            $(this).siblings('select') // find all select
                           .find(':selected') // and their current options
                             .each(function() { labels.push($(this).text()); }); // and add option text to array
                             $('#target_opts_chosen').html('<span id="target_opts_family">' + labels[0] + '</span>,<span  id="target_opts_script">' + labels[1] + '</span>,<span id="target_opts_dialect" >' + labels[2] + '</span>');  // and display the labels
             }

    $.getJSON('/?action=opttree', function(tree) { // initialize the tree by loading the file first
        $('input[name=target_opts]').optionTree(tree, options2).change(displayParents);
    });
});

