<?

composer require "twig/twig: 1.*"

$templ->render([]); // если не нужно передавать параметров
<select name="menu">
	{%for item in cat%} // for - тег оператора цикла (альтернатива foreach); cat - переменная, в которой содердится массив, item - ячейка массива
		<option value="{{item['id_category']}}">{{item['name_category']}}</option> // item['id_category'] <-> item.id_category
	{&endfor&}
	{%else%} // если цикл for не получит никаких значений выполняется код ниже ($cat - не существует)
</select>


{%if result%} // if -тег оператора условия <-> if ($result) {}
/****/
{%else%}
/****/
{%endif%}


# File: menu.tpl
<nav>
	<ul>
		{%for item in cat%}
			<li>{{item['name_category']}}</li>
		{%endfor%}
	</ul>	
</nav>

# File: main.tpl - основной шаблон

<div class="menu">
	{%include 'menu.tpl'%} // подгружаем другой шаблон
</div>


{%block head%} // скелет 
{%endblock%}

{%block head%} // определение и отображение логического блока
	<meta http-equiv="Content-Type" content="text/html; charset-windows-1251">
	<link rel="stylesheet" href="css/style.css">
{%endblock%}




# Файл main-child.html:
{%extends 'main.html'%} // наследование шаблона main.html

{%block head%} // переопределение блока
	<link href="/css/style.css" rel="stylesheet" type="text/css" />
    <link href="/css/tabulous.css" rel="stylesheet" type="text/css" />
    {{parent()}} // ф-я возвращает родительский блог
{%endblock%}



