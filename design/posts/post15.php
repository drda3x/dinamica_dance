<?PHP header("Content-Type: text/html; charset=utf-8");
?>
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="utf-8">
<title>Танцевальный клуб - Динамика</title>
<link href="/style.css" type="text/css" rel="stylesheet" />
<link href='https://fonts.googleapis.com/css?family=Philosopher:400,700,400italic&subset=cyrillic' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:300,600&subset=cyrillic' rel='stylesheet' type='text/css'>
<link href="/css/icons.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<link href="/css/prebuff.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<link href="/css/buff.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<link rel="icon" type="/image/png" href="img/favicon.png"/>
</head>
<body class="bodypost1">
<nav>
	<div class="wrapper1">
    	<div style="cursor: pointer;" class="logo" onclick="scroll1('body')"></div>
        <ul><li>Танцевальный клуб - Динамика. Запись на занятие.</li></ul>
        </div>
        </nav>
<section class="s1">
<div class="wrapper">
<h2>Запись на занятие</h2>
<? 
// ----------------------------конфигурация-------------------------- // 
 
$adminemail="kudryavtsev-m@mail.ru";  // e-mail админа 
 
 
$date=date("d.m.y"); // число.месяц.год 
 
$time=date("H:i"); // часы:минуты:секунды 
 
$backurl="/index.html";  // На какую страничку переходит после отправки письма 
 
//---------------------------------------------------------------------- // 
 
  
 
// Принимаем данные с формы 
 
$name=$_POST['name'];
$phone=$_POST['phone'];

$msg=$_POST['message']; 

 
  
 
// Проверяем валидность e-mail 
 
if (!preg_match("/^((8|\+)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/", 
strtolower($phone))) 
 
 { 
 
  echo 
"<center>Вернитесь <a 
href='javascript:history.back(1)'><B>назад</B></a>. Вы 
указали неверные данные!"; 
 
  } 
 
 else 
 
 { 
 
 
$msg=" 
 
<p>Растяжка и общетанцевальная техника</p>

<p>ВС на 19.00-21.00 ВОЛГОГРАДСКИЙ ПРОСПЕКТ Волгоградский проспект 32 стр. 8</p>
 
<p>ФИО: $name</p> 
 
 
<p>Телефон: $phone</p> 

 
"; 
 
  
 
 // Отправляем письмо админу  
 
mail("$adminemail", "$date $time Сообщение с сайта Динамика 
от $name", "$msg"); 
 
  
 
// Сохраняем в базу данных 
 
$f = fopen("message14.txt", "a+"); 
 
fwrite($f," \n $date $time Сообщение от $name"); 
 
fwrite($f,"\n $msg "); 
 
fwrite($f,"\n ---------------"); 
 
fclose($f); 
 
  
 
// Выводим сообщение пользователю 
 
print "<script language='Javascript'><!-- 
function reload() {location = \"$backurl\"}; setTimeout('reload()', 6000); 
//--></script> 
 
$msg 
 
<h2>Сообщение отправлено!</h2> <p>Подождите, сейчас вы будете перенаправлены на главную страницу...</p>";  
exit; 
 
 } 
 
?>
</div>
</section>
</body>
</html>