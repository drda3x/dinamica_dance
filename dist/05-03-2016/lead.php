<?php

if ($_POST) {
	$ip=$_SERVER['REMOTE_ADDR'];
	$ref=$_SERVER['HTTP_REFERER'];
	$type='Заявка с лендинга';
	$email = $_POST['email'];
	$tel = $_POST['tel'];
	$name = $_POST['name'];
	$data=date('Y-m-d H:i:s');

}

	$to  = "<kudryavtsev-m@mail.ru>". ", " ;
	$to .= "kudryavtsev-m@mail.ru";
	$subject = "Заявка с сайта dinamica.dance";
	$message = " <p>Тип сообщения: ";
	$message .= $type;
	$message .= "<br>Имя: ";
	$message .= $_POST['name'];
	$message .= "<br>Телефон: ";
	$message .= $_POST["tel"];
	$message .= '!!!!';
	$message .= $_POST['email'];
	$message .= "<br>Со страницы: ";
	$message .= $ref;
	$headers  = "Content-type: text/html; charset=UTF-8 \r\n";
	$headers .= "From: no-reply\r\n";
	$headers .= "Reply-To: no-reply\r\n";
	mail($to, $subject, $message, $headers);


if (!empty($_SERVER['HTTP_REFERER']))
	header("Location: ".$_SERVER['HTTP_REFERER'].'#success_l');
else
	header('Location: /');

