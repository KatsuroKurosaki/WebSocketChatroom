<!DOCTYPE html>
<html lang="en">

<head>
	<?php require 'header.php';?>
	<?php require 'headercss.php';?>
</head>

<body>

	<main role="main" class="container pt-2 pb-5">
		<div id="chatMsgs" class="pb-5"></div>

		<form class="form-row fixed-bottom bg-light p-2" onsubmit="javascript:return false;">
			<div class="col-12">
				<label id="usernick"></label>
			</div>
			<div class="col">
				<input type="text" name="textchat" class="form-control form-control-sm"
					onkeyup="javascript:chatPreSend(event);" autocomplete="off" />
			</div>
			<div class="col-3 col-sm-2 col-lg-1 text-center">
				<button type="button" class="btn btn-sm btn-block btn-primary"
					onclick="javascript:chatSend();">Send</button>
			</div>
		</form>
	</main>

	<?php require 'footerjs.php';?>
	<script src="js/functions.min.js?<?=filemtime('js/functions.min.js')?>" type="text/javascript" charset="UTF-8">
	</script>
</body>

</html>