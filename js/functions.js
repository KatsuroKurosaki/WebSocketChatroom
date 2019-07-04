"use strict";

// Your computer IP, and port, matching nodejs's port
const WS_URL = "ws://127.0.0.1:8008/";

// Choose nick
if ($.isNullData("user-nick")) {
	$.spawnModal({
		title: 'Nick?',
		body: '<input type="text" name="nick" class="form-control" maxlength="32"/>',
		buttons: [{
			label: "Login",
			color: "success",
			outline: true,
			click: function () {
				if ($.trim($("input[name='nick']").val()).length) {
					$.setData("user-nick", $("input[name='nick']").val());
					$("#usernick").text($("input[name='nick']").val() + ":");
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
	$("#usernick").text($.getData("user-nick") + ":");
}

// WebSocket connection
var _ws;
_ws = new ReconnectingWebSocket(WS_URL);
_ws.onopen = () => {
	console.log("WebSocket open: " + _ws.url);
	$.removeSpinner();
};
_ws.onclose = () => {
	console.log("WebSocket close");
	$.spawnSpinner({
		text: "Connection lost, reconnecting...",
		icon: "grow",
		color: "warning",
		bgcolor: "rgba(0,0,0,0.4)",
		size: 3
	});
};
_ws.onmessage = (e) => {
	console.log("WebSocket message");
	console.log(e.data);

	var data = JSON.parse(e.data);
	$("#chatMsgs").append(
		'<div class="media">' +
		'<img src="img/chat.png" class="mr-3" style="width:30px;">' +
		'<div class="media-body">' +
		'<h5 class="mt-0">' + data.user + ' <small>(' + $.uts2td(data.ts) + ')</small></h5>' +
		data.msg +
		'</div>' +
		'</div>'
	);

	window.scrollTo(0, $("body").height());
};
_ws.onerror = () => {
	console.log("WebSocket error");
	$.spawnSpinner({
		text: "Error connecting. Trying again...",
		icon: "grow",
		color: "danger",
		bgcolor: "rgba(0,0,0,0.4)",
		size: 3
	});
};

// KeyUp event
function chatPreSend(e) {
	var keyCode = ('which' in e) ? e.which : e.keyCode;
	if (keyCode == 13) chatSend();
}

// Send data to WebSocket
function chatSend() {
	if ($.trim($("input[name='textchat']").val()).length) {
		_ws.send(
			JSON.stringify({
				user: $.getData("user-nick"),
				msg: $.trim($("input[name='textchat']").val())
			})
		);
		$("input[name='textchat']").val('');
	}
}