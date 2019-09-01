<?
############ ВИДЕО ############

#@@@ Lazy load YouTube videos @@@#
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
/*
 * C помощью атрибута srcdoc можно получить <iframe> непосредственно на странице хостинга (не работает на Edge или IE).
 * Таким образом, все пользователи должны будут загрузить предварительную версию - это изображение обложки, которое мне кажется довольно разумным. Вы можете настроить его дальше, например, Используйте разные размеры миниатюр для разных устройств, и если вам нужен больший контроль над тем, что пользователь будет загружать и какие функции включить, вы всегда можете изучить API проигрывателя YouTube.
 */