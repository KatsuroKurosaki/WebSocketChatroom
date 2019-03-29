"use strict";

(function($){
	
	// Querystring
	$.extend({
		qs: function(key) {
			key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g,"\\$&");
			var _match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
			return _match && decodeURIComponent(_match[1].replace(/\+/g, " "));
		}
	});
	
	// Conversion and validation
	$.extend({
		sec2dhms: function(sec) {
			return parseInt(sec/86400)+'d '+(new Date(sec%86400*1000)).toUTCString().replace(/.*(\d{2}):(\d{2}):(\d{2}).*/,"$1:$2:$3");
		},
		
		bytes2humanReadable: function(a,b,c,d,e) {
			// Divide by 1024
			return (b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+' '+(e?'KMGTPEZY'[--e]+'B':'Bytes');
		},
		
		bits2humanReadable: function(a,b,c,d,e) {
			// Divide by 1000
			return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+' '+(e?'kMGTPEZY'[--e]+'b':'bits');
		},
		
		round: function(value, precision) {
			var multiplier = Math.pow(10, precision || 0);
			return Math.round(value * multiplier) / multiplier;
		},
		
		uts2dt: function(ts) {
			var _date = new Date(ts*1000);
			return _date.getFullYear()+"/"
				+ (((_date.getMonth()+1)<10)?	"0"+(_date.getMonth()+1):	(_date.getMonth()+1)) + "/"
				+ ((_date.getDate()<10)		?	"0"+_date.getDate()		:	_date.getDate()) + " "
				+ ((_date.getHours()<10)	?	"0"+_date.getHours()	:	_date.getHours()) + ":"
				+ ((_date.getMinutes()<10)	?	"0"+_date.getMinutes()	:	_date.getMinutes()) + ":"
				+ ((_date.getSeconds()<10)	?	"0"+_date.getSeconds()	:	_date.getSeconds()) ;
		},
		
		uts2td: function(ts) {
			var _date = new Date(ts*1000);
			return ((_date.getHours()<10)	?	"0"+_date.getHours()	:	_date.getHours()) + ":"
				+ ((_date.getMinutes()<10)	?	"0"+_date.getMinutes()	:	_date.getMinutes()) + ":"
				+ ((_date.getSeconds()<10)	?	"0"+_date.getSeconds()	:	_date.getSeconds()) + " "
				+ ((_date.getDate()<10)		?	"0"+_date.getDate()		:	_date.getDate()) + "/"
				+ (((_date.getMonth()+1)<10)?	"0"+(_date.getMonth()+1):	(_date.getMonth()+1)) + "/"
				+ _date.getFullYear() ;
		},
		
		ip2num: function(dot){
			var d = dot.split('.');
			return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
		},
		
		num2ip: function(num){
			var d = num%256;
			for (var i = 3; i > 0; i--){ 
				num = Math.floor(num/256);
				d = num%256 + '.' + d;
			}
			return d;
		},
		
		isValidDate: function(d,m,y) {
			var _date = new Date(y,m-1,d);
			return (_date.getFullYear() == y && (_date.getMonth() + 1) == m && _date.getDate() == d);
		},
		
		htmlEntities: function(str) {
			return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ /g, '&nbsp;');
		},
		
		calculateAspectRatio: function(srcWidth, srcHeight, maxWidth, maxHeight) {
			var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
			return {
				width: srcWidth*ratio,
				height: srcHeight*ratio
			};
		}
	});
	
	// Storage
	$.extend({
		setData: function(id,data){
			if(typeof(Storage) !== "undefined") {
				try {
					localStorage.setItem(id,data);
					return true;
				} catch (err) {
					alert("Error: "+err.message);
				}
			}
			return false;
		},
		getData: function(id){
			if(typeof(Storage) !== "undefined") {
				return localStorage.getItem(id);
			}
			return false;
		},
		removeData: function(id){
			if(typeof(Storage) !== "undefined") {
				localStorage.removeItem(id);
				return true;
			}
			return false;
		},
		clearData: function(id){
			if(typeof(Storage) !== "undefined") {
				localStorage.clear();
				return true;
			}
			return false;
		},
		isNullData: function(id){
			if(typeof(Storage) !== "undefined") {
				return (localStorage.getItem(id) === null);
			}
			return true;
		},
		getDataSize: function(){
			var amount, total = 0;
			for(var i=0;i<localStorage.length; i++) {
				amount = localStorage.getItem(localStorage.key(i)).length;
				total += amount;
				console.log(localStorage.key(i)+" = "+$.bytes2humanReadable(amount));
			}
			console.log("--\nTotal: "+$.bytes2humanReadable(total));
		},
		setSessionData: function(id,data){
			if(typeof(Storage) !== "undefined") {
				try {
					sessionStorage.setItem(id,data);
					return true;
				} catch (err) {
					alert("Error: "+err.message);
				}
			}
			return false;
		},
		getSessionData: function(id){
			if(typeof(Storage) !== "undefined") {
				return sessionStorage.getItem(id);
			}
			return false;
		},
		removeSessionData: function(id){
			if(typeof(Storage) !== "undefined") {
				sessionStorage.removeItem(id);
				return true;
			}
			return false;
		},
		clearSessionData: function(id){
			if(typeof(Storage) !== "undefined") {
				sessionStorage.clear();
				return true;
			}
			return false;
		},
		isSessionNullData: function(id){
			if(typeof(Storage) !== "undefined") {
				return (sessionStorage.getItem(id) === null);
			}
			return true;
		},
		getSessionDataSize: function(){
			var amount, total = 0;
			for(var i=0;i<sessionStorage.length; i++) {
				amount = sessionStorage.getItem(sessionStorage.key(i)).length;
				total += amount;
				console.log(sessionStorage.key(i)+" = "+$.bytes2humanReadable(amount));
			}
			console.log("--\nTotal: "+$.bytes2humanReadable(total));
		}
	});
	
	// Randomizers
	$.extend({
		randomInt: function(){
			return parseInt(Date.now()*Math.random());
		},
		randomString: function(){
			return Math.random().toString(36).substr(2);
		},
		randomUUID: function() {
			var S4 = function() {
				return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			};
			return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
		},
		randomHex: function(length){
			if(length==undefined)
				length=1;
			var text = [];
			var validChars = "0123456789ABCDEF";

			for (var i=0; i<length; i++)
				text.push( validChars.charAt(Math.floor(Math.random() * validChars.length)) );
			return text.join("");
			
		}
	});
	
	// Printing module
	$.extend({
		spawnPrinter: function(options, elem, head, finishFunction) {
			var _settings = $.extend({
				windowWidth:	800,
				windowHeight:	600,
				headSelector:	'head',
				bodySelector:	'body',
				end:			function(){}
			},options);
			
			var winprint = window.open('about:blank', 'Print', 'width='+_settings.windowWidth+',height='+_settings.windowHeight+'');
			winprint.document.open();
			winprint.document.write(
				'<!doctype html>'+
				'<html lang="en">'+
					'<head>'+
						$(_settings.headSelector).html()+
					'</head>'+
					'<body>'+
						$(_settings.bodySelector).html()+
					'</body>'+
				'</html>'
			);
			winprint.document.close();
			winprint.focus();
			setTimeout(function(){
				winprint.print();
				winprint.close();
				_settings.end.call();
				return true;
			},500);
		}
	});
	
	// Network communications
	$.extend({
		api: function(options) {
			var _settings = $.extend({
				method:			'POST',
				url:			($.qs("s")!=null)?'api.php?s='+$.qs("s"):'api.php',
				data:			{},
				dataType:		'json',
				timeout:		10000,
				contentType:	'application/json; charset=UTF-8',
				beforeSend:		function(){},
				success:		function(data){},
				error:			function(jqXHR){},
				complete:		function(){},
				spawnSpinner:	true,
				debug:			false
			},options);
			
			$.ajax({
				method:			_settings.method,
				url:			_settings.url,
				data:			JSON.stringify( _settings.data ),
				dataType:		_settings.dataType,
				timeout:		_settings.timeout,
				contentType:	_settings.contentType,
				beforeSend:		function(jqXHR, settings) {
					if (_settings.debug)
						console.log(settings);
					if (_settings.spawnSpinner)
						$.spawnSpinner();
					_settings.beforeSend();
				},
				success:		function(data, textStatus, jqXHR) {
					if (_settings.debug)
						console.log(data);
					if(data.status === 'ok')
						_settings.success(data);
					else
						$.spawnAlert({body:data.msg,color:data.color});
				},
				error:			function(jqXHR, textStatus, errorThrown) {
					if (_settings.debug)
						console.log(jqXHR);
					handleNetworkError(jqXHR);
					_settings.error(jqXHR);
				},
				complete:		function(jqXHR, textStatus) {
					if (_settings.debug)
						console.log(textStatus);
					if (_settings.spawnSpinner)
						$.removeSpinner();
					_settings.complete();
				}
			});
		},
		
		upload: function(options) {
			var _startTime = Date.now();
			
			var _settings = $.extend({
				method:			'POST',
				url:			($.qs("s")!=null)?'api_post.php?s='+$.qs("s"):'api_post.php',
				data:			new FormData($("form").get(0)),
				dataType:		'json',
				timeout:		0,
				progress:		function(data){
					console.log( data );
				},
				beforeSend:		function(){},
				success:		function(data){},
				error:			function(jqXHR){},
				complete:		function(){},
				spawnSpinner:	true,
				debug:			false
			},options);
			
			$.ajax({
				method:			_settings.method,
				url:			_settings.url,
				data:			_settings.data,
				dataType:		_settings.dataType,
				timeout:		_settings.timeout,
				cache:			false,
				contentType:	false,
				processData:	false,
				enctype:		'multipart/form-data',
				xhr: function() {
					var ajXhr = $.ajaxSettings.xhr();
					if (ajXhr.upload) {
						ajXhr.upload.addEventListener('progress',function(e){
							if(e.lengthComputable){
								var data = {
									length_computable:e.lengthComputable,
									bytes_loaded: e.loaded,
									bytes_total: e.total,
									bytes_remaining: e.total - e.loaded,
									bytes_per_second: 0,
									seconds_elapsed: $.round((Date.now()-_startTime)/1000,1),
									seconds_remaining: ''
								};
								
								data.bytes_per_second = data.seconds_elapsed ? $.round(e.loaded/data.seconds_elapsed) : 0;
								data.seconds_remaining = data.seconds_elapsed ? $.round(data.bytes_remaining/data.bytes_per_second,1) : '';
								
								_settings.progress(data);
							} else {
								_settings.progress({length_computable:e.lengthComputable});
							}
						},false);
					}
					return ajXhr;
				},
				beforeSend: function(jqXHR, settings) {
					if (_settings.debug)
						console.log(settings);
					if (_settings.spawnSpinner)
						$.spawnSpinner();
					_settings.beforeSend();
				},
				success: function (data, textStatus, jqXHR) {
					if (_settings.debug)
						console.log(data);
					if(data.status === 'ok')
						_settings.success(data);
					else
						$.spawnAlert({body:data.msg,color:data.color});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if (_settings.debug)
						console.log(jqXHR);
					handleNetworkError(jqXHR);
					_settings.error(jqXHR);
				},
				complete: function(jqXHR, textStatus) {
					if (_settings.debug)
						console.log(textStatus);
					if (_settings.spawnSpinner)
						$.removeSpinner();
					_settings.complete();
				}
			});
		},
	});
	
	// Network error function handler
	function handleNetworkError(jqXHR){
		switch(jqXHR.status){
			case 504: $.spawnAlert({title:"Error 504","body":"Server timeout on a remote request.",color:"danger"}); break;
			case 500: $.spawnAlert({title:"Error 500","body":"Server error when processing your request.",color:"danger"}); break;
			case 404: $.spawnAlert({title:"Error 404","body":"The requested resource coould not be found.",color:"danger"}); break;
			case 403: $.spawnAlert({title:"Error 403","body":"Access denied to the requested resource.",color:"danger"}); break;
			case 401: $.spawnAlert({title:"Error 401","body":"No permissions for the requested resource.",color:"danger"}); break;
			case 0:
				switch(jqXHR.statusText){
					case 'timeout': $.spawnAlert({title:"Timeout",body:"Waiting time has been exceeded.",color:"danger"}); break;
					case 'error': $.spawnAlert({title:"No connection",body:"No Internet connection has been detected to process your request.",color:"danger"}); break;
					default:
						$.spawnAlert({title:"Error",body:"Error "+jqXHR.statusText,color:"danger"});
				}
			break;
			
			default:
				$.spawnAlert({title:"Unknwon error",body:"Unknown network error, check JS console.",color:"danger"});
		}
	}
	
	// Spinners
	$.extend({
		spawnSpinner: function(options) {
			if(!$("#spinner").length){
				var _options = $.extend({
					text:		"Loading...",
					color:		"dark", // primary, secondary, success, danger, warning, info, light, dark
					bgcolor:	"rgba(255,255,255,.5)",
					icon:		"border", // border, grow
					size:		2
				},options);
				
				$("body").append('<div id="spinner" class="fixed-top d-flex flex-column align-items-center justify-content-center text-'+_options.color+'" style="background-color:'+_options.bgcolor+';bottom:0;z-index:1111;">'+
					'<div class="spinner-'+_options.icon+'" style="width:'+_options.size+'rem;height:'+_options.size+'rem;" role="status">'+
						'<span class="sr-only">'+_options.text+'</span>'+
					'</div>'+
					'<div>'+_options.text+'</div>'+
				'</div>');
			}
		},
		
		removeSpinner: function(action) {
			$("#spinner").remove();
		}
	});
	
	// Bootstrap modals
	$.extend({
		spawnModal: function(options) {
			if(!$("#modal").length){
				// Modal settings
				var _settings = $.extend({
					title:			'',
					body:			'',
					showclose:		true,
					preventclose:	true,
					fadespawn:		true,
					verticalcenter:	false,
					size:			'md', // lg, md, sm
					buttons: [{
						label: 'Cerrar',
						dismiss: true
					}]
				},options);
				
				// Add the modal to the DOM
				$("body").append(
					'<div id="modal" class="modal'+( (_settings.fadespawn)?' fade':'' )+'" tabindex="-1" role="dialog">'+
						'<div class="modal-dialog'+( (_settings.verticalcenter)?' modal-dialog-centered':'' )+' modal-'+_settings.size+'" role="document">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<h5 class="modal-title">'+_settings.title+'</h5>'+
									( (_settings.showclose) ?
										'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
									:
										''
									)+
								'</div>'+
								'<div class="modal-body">'+_settings.body+'</div>'+
									( (_settings.buttons.length) ?
										'<div class="modal-footer"></div>'
									:
										''
									)+
							'</div>'+
						'</div>'+
					'</div>'
				);
				// Remove modal from DOM on close
				$("#modal").on("hidden.bs.modal",function(){
					$('#modal').remove();
				});
				// Generate buttons
				$.each(_settings.buttons,function(idx,val){
					// Current button settings
					var _button = $.extend({
						label:		"",
						color:		"primary", // primary, secondary, success, danger, warning, info, light, dark, link
						outline:	false,
						dismiss:	false,
						size:		"md", // lg, md, sm
						click:		function(){}
					},val);
					
					// Append buttons to the footer
					$("#modal div.modal-footer").append(
						'<button type="button" class="btn btn-'+( (_button.outline)?'outline-':'' )+''+_button.color+' btn-'+_button.size+'"'+( (_button.dismiss)?' data-dismiss="modal"':'' )+' data-btnidx="'+idx+'">'+
							_button.label+
						'</button>'
					);
					$("#modal div.modal-footer button[data-btnidx='"+idx+"']").on("click",_button.click);
				});
				// Prevent modal close on keyboard ESC key and mouseclick
				$('#modal').modal({
					backdrop: (_settings.preventclose)?'static':true,
					keyboard: !_settings.preventclose
				});
				// Summon the modal
				$('#modal').modal('show');
			}
		},
		
		spawnRemoteModal: function(options) {
			if(!$("#modal").length){
				// Remote modal AJAX settings
				var _settings = $.extend({
					method:			"POST",
					url:			"",
					data:			{},
					timeout:		10000,
					// Up: $.ajax() // Down: $.spawnModal()
					preventclose:	true,
					fadespawn:		true,
					verticalcenter:	true,
					size:			'md', // lg, md, sm
					buttons:		[],
					spawnSpinner:	true,
					debug:			false
				},options);
				
				// AJAX call
				$.ajax({
					method:			_settings.method,
					url:			_settings.url,
					data:			_settings.data,
					timeout:		_settings.timeout,
					beforeSend:		function(jqXHR, settings) {
						if (_settings.debug)
							console.log(settings);
						if (_settings.spawnSpinner)
							$.spawnSpinner();
					},
					success:		function(data) {
						// Spawn a modal and replace contents.
						$.spawnModal(_settings);
						$("#modal div.modal-content").html(data);
					},
					error:			function(jqXHR, textStatus, errorThrown) {
						if (_settings.debug)
							console.log(jqXHR);
						handleNetworkError(jqXHR);
					},
					complete:		function(jqXHR, textStatus) {
						if (_settings.debug)
							console.log(textStatus);
						if (_settings.spawnSpinner)
							$.removeSpinner();
					}
				});
			}
		},
		
		removeModal: function() {
			// Hides modal and the hide event removes it from DOM
			$('#modal').modal('hide');
		},
		
	});
	
	// Top alerts
	$.extend({
		spawnAlert: function(options) {
			// Alert/Toast settings
			var _settings = $.extend({
				title:			"",
				subtitle:		"",
				body:			"",
				color:			"info",
				showclose:		true,
				closetimeout:	5000,
				css_animate:	"fadeInRight", // If animateCss jQuery plugin exists, will perform an extra spawn animation. Change default animation here
				toastId:		$.randomInt()
			},options);
			
			// Toast container
			if(!$("#toaster").length){
				$("body").append('<div id="toaster" aria-live="polite" aria-atomic="true" class="fixed-top p-2" style="left:unset;z-index:1111;"></div>');
			}
			
			// Add alert/toast to the DOM
			$("#toaster").append(
				'<div id="toast-'+_settings.toastId+'" class="toast shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" data-delay="'+_settings.closetimeout+'">'+
					'<div class="toast-header">'+
						'<div class="rounded mr-2" style="width:20px;height:20px;background-color:var(--'+_settings.color+');"></div>'+
						'<strong class="mr-auto">'+_settings.title+'</strong>'+
						'<small>'+_settings.subtitle+'</small>'+
						( (_settings.showclose) ?
								'<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
							:
								''
						)+
					'</div>'+
					( (_settings.body!="") ?
							'<div class="toast-body">'+_settings.body+'</div>'
						:
							''
					)+
				'</div>'
			);
			
			// Animate toast on creation
			if(typeof $.fn.animateCss !== 'undefined'){
				$("#toast-"+_settings.toastId).on("show.bs.toast",function(){
					$('#toast-'+_settings.toastId).animateCss({
						effect: _settings.css_animate
					});
				});
			}
			
			// Remove toast from DOM on close
			$("#toast-"+_settings.toastId).on("hidden.bs.toast",function(){
				$('#toast-'+_settings.toastId).remove();
			});
			
			// Summon the toast
			$("#toast-"+_settings.toastId).toast('show');
		},
		
		removeAlert: function(options) {
			var _settings = $.extend({
				toastId:	0
			},options);
			
			// Hides the toast and the hide event removes it from the DOM
			$("#toast-"+_settings.toastId).toast('hide');
		}
		
	});
	
	
	// Adds the unchecked checkboxes to the serializeArray funcion
	$.fn.serializeArrayFull = function() {
		return this.serializeArray().concat(
			this.find("input[type='checkbox']:not(:checked)").map(function() {
				return {"name":this.name,"value":"off"}
			}).get()
		);
	};
	
	// Creates an arrayAdds the unchecked checkboxes to the serializeArray funcion
	$.fn.serializeForm = function() {
		var data = this.serializeArrayFull();
		var serialized = {};
		for( var idx in data ){
			serialized[data[idx].name] = data[idx].value;
		}
		return serialized;
	};
	
	// Runs a number
	$.fn.runNumber = function(options){
		var _settings = $.extend({
			duration:	1000,
			decimalPos:	0,
			fromVal:	0,
			toVal:		100,
			delayStart:	0,
			prefix:		'',
			suffix:		''
		},options);
		var container = this;
		
		$(container).text( _settings.prefix + _settings.fromVal.toFixed(_settings.decimalPos) + _settings.suffix );
		$({someValue: _settings.fromVal}).delay(_settings.delayStart).animate({someValue: _settings.toVal}, {
			duration: _settings.duration,
			step: function() {
				$(container).text( _settings.prefix + this.someValue.toFixed(_settings.decimalPos) + _settings.suffix );
			},
			complete: function() {
				$(container).text( _settings.prefix + this.someValue.toFixed(_settings.decimalPos) + _settings.suffix );
			}
		});
	};
	
	// Generates a thumbnail
	$.fn.imageThumbnailer = function(options){
		var _settings = $.extend({
			width:		800,
			height:		600,
			imgFile:	null
		},options);
		var container = this;
		
		var image = new Image();
		image.src = URL.createObjectURL(_settings.imgFile);
		image.onload = function() {
			var newSize = $.calculateAspectRatio(image.width,image.height,_settings.width,_settings.height)
			var canvas = document.createElement("canvas");
			canvas.width = newSize.width;
			canvas.height = newSize.height;
			canvas.getContext("2d").drawImage(image,0,0,newSize.width,newSize.height);
			switch(_settings.imgFile.type){
				case "image/jpeg":
					container.trigger("thumbnailGenerated",[{
						success: true,
						file: _settings.imgFile,
						type: "image/jpeg",
						image: canvas.toDataURL("image/jpeg")
					}]);
					break;
				
				case "image/png": case "image/svg+xml":
					container.trigger("thumbnailGenerated",[{
						success: true,
						file: _settings.imgFile,
						type: "image/png",
						image: canvas.toDataURL("image/png")
					}]);
					break;
				
				default:
					console.warn("Can't process: "+_settings.imgFile.type);
					container.trigger("thumbnailGenerated",[{
						success: false,
						file: _settings.imgFile
					}]);
			}
			
			
		}
	};
	
	// Animate.css jQuery plugin
	$.fn.animateCss = function(options) {
		var _settings = $.extend({}, $.fn.animateCss.defaults, options);

		_settings.begin.call(this);
		this.addClass("animated " + _settings.effect+ ((_settings.infinite) ? " infinite" : ""));
		this.css("animation-duration", _settings.duration);
		this.css("animation-delay", _settings.delay);
		this.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
			$(this).removeClass("animated " + _settings.effect);
			$(this).css("animation-duration", "");
			$(this).css("animation-delay", "");
			_settings.end.call(this);
		});
		
		return this;
	};
	$.fn.animateCss.defaults = {
		effect:		"bounce",		// One of the effects available.
		duration:	"1s",			// Amount of seconds that the effect will be active.
		delay:		"0s",			// Amount of seconds before the effect begins.
		infinite:	false,			// Will the effect run infinitely?
		begin:		function(){},	// Function to execute before the effect starts. Doesn't care about delay.
		end:		function(){}	// Function to execute when the effect ends. Won't run if infinite:true!
	};
	
	// I am surprised jQuery doesn't have a $(selector).renameAttr() method.
	$.fn.renameAttr = function(oldName,newName){
		return this.each(function(){
			$(this).attr(newName,$(this).attr(oldName)).removeAttr(oldName);
		})
	};
	
	// Transforms a <img src="*.svg"/> tag into the inline version
	$.fn.SVGinliner = function(options) {
		var _settings = $.extend({
			fillColor:	''
		},options);
		
		this.each(function(){
			var _img = $(this);
			$.get(
				$(this).attr('src'),
				function(data) {
					var _svg = $(data).find('svg');
					
					if(_img.attr("id") != undefined)
						_svg.attr("id",_img.attr("id"));
					
					if(_img.attr("class") != undefined)
						_svg.attr("class",_img.attr("class"));
					
					if(_img.attr("style") != undefined)
						_svg.attr("style",_img.attr("style"));
					
					_svg.css("fill",_settings.fillColor);
					
					// Remove any invalid XML tags as per http://validator.w3.org
					_img.replaceWith( _svg.removeAttr('xmlns:a') );
				},
				'xml'
			).fail(function(){
				console.log("Error retrieving the SVG file.");
			});
		});
	};
	
	// Reads and returns all data-* attributes
	$.fn.attrToObject = function(options){
		var _settings = $.extend({
			prefix:	'data-'
		},options);
		
		var data = new Object();
		$.each(this.get(0).attributes, function(idx,val){
			if(val.name.startsWith(_settings.prefix)){
				switch( val.name.substring(val.name.indexOf("-")+1,val.name.lastIndexOf("-")) ){
					case "str":
						data[val.name.substring(val.name.lastIndexOf("-")+1)] = val.value;
						break;
					
					case "int":
						data[val.name.substring(val.name.lastIndexOf("-")+1)] = parseInt(val.value);
						break;
					
					case "flt":
						data[val.name.substring(val.name.lastIndexOf("-")+1)] = parseFloat(val.value);
						break;
					
					case "bol":
						data[val.name.substring(val.name.lastIndexOf("-")+1)] = (val.value=='true');
						break;
					
					default:
						console.warn("Data type '"+val.name+"' not processed.");
				}
			}
		});
		if(this.length>1){
			console.warn("Selector includes multiple items. Only first was processed.");
		}
		
		return data;
	};

}(jQuery));
