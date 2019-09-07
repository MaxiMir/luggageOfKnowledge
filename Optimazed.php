<?
	 ############ Lazy load YouTube videos ############
	 
	 /*
	  * C помощью атрибута srcdoc можно получить <iframe> непосредственно на странице хостинга (не работает на Edge или IE).
	  * Таким образом, все пользователи должны будут загрузить предварительную версию - это изображение обложки, которое мне кажется довольно разумным. Вы можете настроить его дальше, например, Используйте разные размеры миниатюр для разных устройств, и если вам нужен больший контроль над тем, что пользователь будет загружать и какие функции включить, вы всегда можете изучить API проигрывателя YouTube.
	  */
?>

<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/Y8Wp3dafaMQ"
	srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/Y8Wp3dafaMQ?autoplay=1><img src=https://img.youtube.com/vi/Y8Wp3dafaMQ/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>"
	frameborder="0"
	allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
	title="The Dark Knight Rises: What Went Wrong? – Wisecrack Edition"
>
</iframe>



<?
	 ############ АККОРДЕОН ############
	 
	 /*
		   + Уменьшается количество javascript кода, который нужно подгружать, что увеличивает скорость загрузки страницы, скорость обработки и корректность.
	 		+ Улучшаются показатели в Lighthouse, Google PageSpeed и других подобных инструментах.
	 		+ Улучшится связанность текста, и поисковики смогут более качественно индексировать сайт, так как будут лучше понимать, как связаны между собой видимый и скрытый текст.
			+ Людям с ограниченными возможностями проще будет пользоваться сайтом
	 		+ Будет доступно управление элементами с клавиатуры и других устройств.

	 		Пример: Svg маркер справа + эффект зеркального поворота стрелки (habr: https://habr.com/ru/post/465623/):
	 */
?>

<details>
	 <summary>Покажи-скрой меня</summary>
	 <p>Скандинавская мифология — мифология древних скандинавов</p>
</details>
<details open>
	 <summary>Покажи-скрой меня 2</summary>
	 <p>Основным источником сведений о ней являются тексты поэтической </p>
</details>
<details>
	 <summary>Покажи-скрой меня 3</summary>
	 <p>Скандинавская мифология — мифология древних скандинавов</p>
</details>

<style>
	 body {
		  background: #edf2f7;
	 }
	 
	 details {
		  display: block;
		  background: #fff;
		  width: 400px;
		  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		  border-radius: 8px;
		  overflow: hidden;
		  margin-bottom: 1.5rem;
	 }
	 
	 summary::-webkit-details-marker {
		  display: none;
	 }
	 
	 summary::-moz-list-bullet {
		  list-style-type: none;
	 }
	 
	 summary::marker {
		  display: none;
	 }
	 
	 summary {
		  display: block;
		  padding: .3em 1em .3em .9em;
		  border-bottom: 1px solid #e2e8f0;
		  font-size: 1.4em;
		  cursor: pointer;
		  position: relative;
	 }
	 
	 summary:before {
		  top: .4em;
		  right: .3em;
		  color: transparent;
		  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNTkgOC41OUwxMiAxMy4xNyA3LjQxIDguNTkgNiAxMGw2IDYgNi02eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=") no-repeat 50% 50% / 1em 1em;
		  width: 1em;
		  height: 1em;
		  content: "";
		  position: absolute;
		  transition: transform .5s;
	 }
	 
	 details[open] > summary:before {
		  transform: scale(1, -1);
	 }
	 
	 summary ~ * {
		  padding: 0 1em 10px 1.4em;
	 }
	 
	 details[open] summary ~ * {
		  animation: sweep .5s ease-in-out;
	 }
	 
	 @keyframes sweep {
		  0% {
				opacity: 0;
		  }
		  100% {
				opacity: 1;
		  }
	 }
	 
	 summary:focus {
		  outline: 0;
		  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(0, 0, 0, 0.3);
	 }
</style>
