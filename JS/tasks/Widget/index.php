<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

</head>
<body>
<?= file_get_contents("https://www.lamoda.ru/"); ?>

<style>
    #menu,
    .unipop__container {
        display: none!important;
    }
</style>


<script type="module">
  import initWidget from './module.js';

  const addToBasket = id => {
    console.log(`Add to Basket product ID: ${id}`);
  };
  const likeProduct = id => {
    console.log(`Like product ID: ${id}`);
  };
  const dislikeProduct = id => {
    console.log(`Dislike product ID: ${id}`);
  };
  const showMyClothes = () => {
    console.log(`Show my clothes`);
  };

  initWidget({
    "key": "ff1890ee217244a2817b60402305018b",
    "product_id": 687838,
    "addToBasketFn": addToBasket,
    "likeFn": likeProduct,
    "dislikeFn": dislikeProduct,
    "myClothesFn": showMyClothes,
  });
</script>
</body>
</html>