<!DOCTYPE html>
<html lang="en">
	<head>
		<?php require 'header.php'; ?>
		<?php require 'headercss.php'; ?>
	</head>
	<body>
		
		<main role="main" class="container pt-2 pb-5">
			<div id="chatMsgs" class="pb-5"></div>
			
			<form class="form-row fixed-bottom bg-light p-2" onsubmit="javascript:return false;">
				<div class="col-12">
					<label id="usernick"></label>
				</div>
				<div class="col">
					<input type="text" name="textchat" class="form-control form-control-sm" onkeyup="javascript:chatPreSend(event);" autocomplete="off"/>
				</div>
				<div class="col-3 col-sm-2 col-lg-1 text-center">
					<button type="button" class="btn btn-sm btn-block btn-primary" onclick="javascript:chatSend();">Send</button>
				</div>
			</form>
		</main>
		
		<?php require 'footerjs.php'; ?>
		<script type="text/javascript">
			// Your computer IP, and port, matching nodejs's port
			const WS_URL = "ws://192.168.1.1:8008/";
			
			// Choose nick
			if($.isNullData("user-nick")){
				$.spawnModal({
					title: 'Nick?',
					body: '<input type="text" name="nick" class="form-control" maxlength="32"/>',
					buttons: [{
						label: "Login",
						color: "success",
						outline: true,
						click: function(){
							if( $.trim($("input[name='nick']").val()).length ){
								$.setData("user-nick",$("input[name='nick']").val());
								$("#usernick").text($("input[name='nick']").val()+":");
								$.removeModal();
							} else {
								$.spawnAlert({
									body: 'No nick written',
									color: 'warning'
								})
							}
						}
					}]
				});
			} else {
				$("#usernick").text($.getData("user-nick")+":");
			}
			
			// WebSocket connection
			var _ws;
			_ws = new WebSocket(WS_URL);
			_ws.onopen = ()=>{
				console.log("WebSocket open: "+_ws.url);
			};
			_ws.onclose = ()=>{
				console.log("WebSocket close");
			};
			_ws.onmessage = (e)=>{
				console.log("WebSocket message");
				console.log(e.data);
				
				var data = JSON.parse(e.data);
				$("#chatMsgs").append(
					'<div class="media">'+
						'<img src="img/chat.png" class="mr-3" style="width:30px;">'+
						'<div class="media-body">'+
							'<h5 class="mt-0">'+data.user+' <small>('+$.uts2td(data.ts)+')</small></h5>'+
							data.msg+
						'</div>'+
					'</div>'
				);
				
				window.scrollTo(0,$("body").height());
			};
			_ws.onerror = ()=>{
				console.log("WebSocket error");
			};
			
			// KeyUp event
			function chatPreSend(e){
				keyCode = ('which' in e) ? e.which : e.keyCode;
				if (keyCode==13) chatSend();
			}
			
			// Send data to WebSocket
			function chatSend(){
				if( $.trim($("input[name='textchat']").val()).length ){
					_ws.send(
						JSON.stringify({
							user: $.getData("user-nick"),
							msg: $.trim($("input[name='textchat']").val())
						})
					);
					$("input[name='textchat']").val('');
				}
			}
		</script>
	</body>
</html>
