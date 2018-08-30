<?
<div class="container"> // == таблица
	<div class="row"></div> // == ряд
		<div class="col-8"></div>
		<div class="col-4"></div>
</div>

/*
Breakpoints Bootstrap 4:
Extra small < 576px .col-
Small >= 576px .col-sm
Medium >= 768px .col-md
Large >= 992px .col-lg
Extra large >= 120px .col-xl
*/

<div class="container">
	<div class="row">
		<div class="col-md-12">
			Header
		</div>
	</div>
	
	<div class="row">
		<div class="col-md-8">
			<div class="row">
				<div class="col-sm-1">1 Товар</div>
				<div class="col-sm-1">2 Товар</div>
				<div class="col-sm-1">3 Товар</div>
			</div>
		</div>
	</div>
</div>

# Сдвинуть блок на n ячеек в BS4:
<div class="col-md-8 push-md-4"></div>	// здесь смещаем вправо на 4 ячейки в разрешении Medium
<div class="col-md-8 pull-md-4"></div> // здесь смещаем влево на 4 ячейки в разрешении Medium


<div class="container">
	<div class="row">
		<div class="col"></div> // колонки одинаковой ширины в BS4
		<div class="col"></div>
		<div class="col"></div> // если + класс, например col-md-5, то в разрешении Medium - эта колонка будет занимать 5 ячеек, а остальные поделяться на равную ширину
		<div class="col"></div>
		<div class="col"></div>		
	</div>
</div>

# колонки одинаковой ширины с миксованием брейкпоинтов:
<div class="container">
	<div class="row">
		<div class="col col-md-8">1</div>
		<div class="col-6 col-md-4">2</div>
	</div>
</div>


# контент переменной ширины с центрированием:

<div class="container">
		<div class="row justify-content-md-center"> // класс для центрирования
		<div class="col-lg-2"></div>
		<div class="col-12 col-md-auto"></div> // автоматическая ширина под контент данного блока в разрешении Medium 
		<div class="col-lg-2"></div>
	</div>
</div>

# .w1-100 для множественных рядов:

<div class="container">
	<div class="row">
		<div class="col-md">1</div>
		<div class="col-md">2</div>
		<div class="w-1oo"></div> // перенос 
		<div class="col-md">3</div>
		<div class="col-md">4</div>
	</div>
</div> // => выйдет 2 ряда

# вертикальное выравнивание ряда: align-items: flex-start (прижато кверху) | center (центрировано)| flex-end (прижато книзу):

<div class="container">
	<div class="row align-items-start"> // выравнивание относительно начала оси
		<div class="col-md">1</div>
		<div class="col-md">2</div>
		<div class="col-md">3</div>
	</div>
</div>

# вертикальное выравнивание колонок: align-self: flex-start (прижато кверху) | center (центрировано)| flex-end (прижато книзу):

<div class="container">
	<div class="row">
		<div class="col-md align-self-start">1</div>
		<div class="col-md align-self-center">2</div>
		<div class="col-md align-self-end">3</div>
	</div>
</div>

# горизонтальное выравнивание: justify-content: flex-start (прижато к левому краю) | center (центрировано)| flex-end (прижато к правому краю):

<div class="container">
	<div class="row justify-content: flex-start">
		<div class="col-md align-self-start">1</div>
		<div class="col-md align-self-center">2</div>
		<div class="col-md align-self-end">3</div>
	</div>
</div>	


<section class="section-1">
	<div class="container">
		<div class="row align-items-center justify-content-center"> // выравнивание по горизонтали и вертикали
			<div class="col-md-5 text-center">
				<h2>COFFEE</h2>
			</div>
		</div>
	</div>
</section> 


<style>
	.section-1 {
		background: url(1.jpg) center center;
		background-size: cover;
		height: 100vh;
	}
	
	.section-1 .row {
		min-height: 100vh;
	}
	
	section h2 {
		color: #fff;
		font-size: 40px;
		padding: 20px;
		background-color: rgba(0,0,0,0.5);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}
</style>
	
# сброс отступов
<div class="container">
	<div class="row no-gutters">
		<div class="col-md">1</div>
		<div class="col-md">1</div>
		<div class="col-md">1</div>	
	</div>
</div>
	
# flex-order - изменить порядок элементов:
<div class="container">
	<div class="row no-gutters">
		<div class="col-md flex-last">1</div> 
		<div class="col-md flex-unsorted">1</div> // значение по умолчанию
		<div class="col-md flex-first">1</div>	
	</div>
</div>


<div class="container">
	<div class="row no-gutters">
		<div class="col-md order-3">1</div> 
		<div class="col-md order-1">1</div> // значение по умолчанию
		<div class="col-md order-2">1</div>	
	</div>
</div>
	
# offsetting columns - отступы:

<div class="container">
	<div class="row">
		<div class="col-4 offset-md-4">1</div> // отступ в 4 колонки в расширении md
	
	</div>
</div>
	
# push and pull - сместить и потянуть
	
<div class="container">
	<div class="row">
		<div class="col-md-8 push-md-4">SideBar</div> // 
		<div class="col-md-4 pull-md-8">Content</div> // 
	</div>
</div>

# responsive utilites - cкрытие блоков при определенном расширении
<div class="container">
	<div class="row">
		<div class="col-md hidden-sm-down">1</div> // скрыть блок при расширении <= sm
		<div class="col-md hidden-md-up">2</div> // скрыть блок при расширении >= md
	// можно добавлять .w-100 - данные классы чтобы убирать перенос
	</div>
</div>
	
# media оbject
<div class="container">
	<div class="row">
		<div class="col">
			<div class="media mt-5"> // картинка без обтекания текстом и margin-top-5px
				<img src="" alt="" class="mr-3"> // media-heading - отступы 
				<div class="media-body">  
					<h2>header</h2>
					<p>Text</p>	
				</div>	
			</div>
		</div>
	</div>
</div>

	
# media-list 	
<ul class="list-unstyled">
	<li class="media my-3">
		<img src="" alt="" class="mr-3 d-flex">
		<div class="media-body">  
			<p>Text</p>	
		</div> 
	</li>
	<li class="media my-3">
		<img src="" alt="" class="mr-3 d-flex">
		<div class="media-body">  
			<p>Text</p>	
		</div> 
	</li>
	<li class="media my-3">
		<img src="" alt="" class="mr-3 d-flex">
		<div class="media-body">  
			<p>Text</p>	
		</div> 
	</li>		
</ul>


# responsive-utilites
<div class="container">
	<div class="row">
		<div class="col mt-3">
			<img src="" alt="" class="img-fluid"> // адаптивная картинка
		</div>
	</div>
</div>

// тоже самое без bs:
<style>
	img {
		max-width: 100%;
		height: auto;
	}
</style>

<div class="container">
	<div class="row">
		<div class="col mt-3">
			<img src="" alt="" class="img-thumbnail float-left mr-3"> // картинка - аватарка с обтеканием слева
			<p>Some text</p>
		</div>
	</div>
</div>


<img src="" alt="" class="d-block mx-auto"> // d-block - блочный элемент. центрирование по горизонтали картинки.
// <=>
<div class="text-center">
	<img src="" alt="">
</div>


.border // границы у изображения есть
.border-0 // убрать границы у изображения
.border-top-0 // отменяем границу свеху и т.д.

.border-primary // цвет рамки у изображения (синий)
.border-dark // и т.д.

.rounded-0 // убрать закругление углов у изображения
.rounded // закругление углов у изображения
.rounded-top // закругление верхних углов у изображения и т.д.
.rounded-circle // из изображения сделать круг (border-radius: 50%)


# адаптивное видео
<div class="container">
	<div class="row">
		<div class="col-8 mx-auto"> 
			<div class="embed-responsive embed-responsive-16by9"> // адаптивное видео с расширением сторон 16 на 9
				<iframe src="" frameborder="0" class="responsive-item"></iframe>
			</div>
	</div>
</div>		 
