<?
    if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
        die();
    }
    
    $this->setFrameMode(true);
    
    [
        "ITEMS" => $items,
        "NAME" => $sectionName,
        "SECTION_PAGE_URL" => $sectionURN,
    ] = $arResult;
    
    $countItems = count($items);
    
    [
        "SECTION_CODE" => $sectionCode,
        "ADDITIONAL_DATA" => [
            "urn" => $urn,
            "isSortByCount" => $isSortByCount,
            "sectionsData" => $sectionsData
        ]
    ] = $arParams;
    
    $obParser = new CTextParser;
?>
	
	<p>Оставляйте свои впечатления и отзывы о товарах на сайте</p>

<? if ($sectionsData): ?>
	<section id="sectionData" class="sectionData">
		<div class="dropdown">
			<div class="select">
				<span>Другие разделы с отзывами</span>
				<i class="fa fa-chevron-left"></i>
			</div>
			<div class="dropdown-menu">
             <? foreach ($sectionsData as $sectionData): ?>
                 <?
                 [
                     "NAME" => $name,
                     "CODE" => $code
                 ] = $sectionData;
                 
                 if ($sectionCode === $code) {
                     continue;
                 }
                 ?>
					 <a href="/reviews/<?= $code ?>/" class="dropdown-menu__elem">
                    <?= $name ?>
					 </a>
             <? endforeach; ?>
			</div>
		</div>
	</section>
<? endif; ?>

<? if ($countItems): ?>
    <? if ($sectionName): ?>
		<h2><?= $sectionName ?> отзывы</h2>
    <? endif; ?>
	
	<div class="response-panel">
		<div class="response-panel__count">Найдено отзывов: <b><?= $countItems ?></b></div>
		<div class="response-panel__sort">
			Сортировка:
			<a href="<?= $urn ?>" class="<?= $isSortByCount ? '' : 'link--disabled' ?>">
				по дате
			</a>
			<a href="<?= $urn ?>?sort=count" class="<?= !$isSortByCount ? '' : 'link--disabled' ?>">
				по количеству отзывов
			</a>
		</div>
	</div>
	
	
	<div class="responses">
		<div class="response__item response__item--main">
			<div class="response__img"></div>
			<div class="response__text">
				Текст отзыва
			</div>
			<div class="response__info response__info--main">Дата</div>
			<div class="response__count response__count--main">Отзывы</div>
		</div>
       
       <? foreach ($items as $item): ?>
			 <div class="response__item">
              <?
                  [
                      'product' => [
                          'id' => $id,
                          'name' => $name,
                          'src' => $src,
                          'urn' => $urn
                      ],
                      'response' => [
                          'author' => $author,
                          'message' => $message,
                          'postDate' => $postDate
                      ],
                      'responseCount' => $responseCount
                  ] = $item;
                  
                  $messageHTML = $obParser->convertText($message); // для отображения смайлов
              ?>
				 
				 <div class="response__img">
					 <a href="<?= $urn ?>" title="<?= $name ?>">
						 <img src="<?= $src ?>" alt="<?= $name ?>'">
					 </a>
				 </div>
				 <div class="response__text">
					 <div class="response__link">
						 <a href="<?= $urn ?>/reviews/#reviewTab" title="<?= $name ?>">
                       <?= $name ?>
						 </a>
                    <? if ($sectionName && $sectionURN): ?>
							  [
							  <a href="<?= $sectionURN ?>" title="<?= $sectionName ?>">
                           <?= $sectionName ?>
							  </a>
							  ]
                    <? endif; ?>
					 </div>
					 <div class="response__content">
						 <p><?= $messageHTML ?></p>
					 </div>
				 </div>
				 <div class="response__info">
					 <span class="response__date"><?= ConvertDateTime($postDate, 'YYYY-MM-DD') ?></span>
					 <span class="response__author"><?= $author ?></span>
				 </div>
				 <div class="response__count">
					 <a href="<?= $urn ?>/reviews/#review" title="Читать остальные отзывы"
					    class="response__link-with-img">[ <?= $responseCount ?> ]</a>
				 </div>
			 </div>
       <? endforeach; ?>
	</div>
	
	<div class="bottom_nav <?= $arParams["DISPLAY_TYPE"]; ?>">
       <?
           if ($arParams["DISPLAY_BOTTOM_PAGER"] == "Y") {
               echo $arResult["NAV_STRING"];
           }
       ?>
	</div>
<? endif; ?>