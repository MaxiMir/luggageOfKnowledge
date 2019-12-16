<?
	 // FILE: /local/components/adpro/catalog.section/templates/ajax/template.php:
	 if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
		  die();
	 }
	 
	 $this->setFrameMode(true);
	 
	 $items = $arResult["ITEMS"];
	 
	 [
		 "~PRODUCT_COUNT" => $productCount,
		 "~SEARCH_PHRASE" => $searchPhrase,
		 "~SECTIONS_COUNT" => $sectionsCount,
		 "~SECTIONS_DATA" => $sectionsData
	 ] = $arParams;
?>

<? if (!$productCount && !$sectionsCount): ?>
	 <div class="header-searched-title">
		  <b>Ничего не найдено</b>
	 </div>
<? else: ?>
	 <? if ($sectionsCount): ?>
		  <div class="header-searched-sections">
				<div>
					 <b>Категории: </b><span class="header-searched-count"><?= $sectionsCount ?></span>
					 <a href="/search/?q=<?= $searchPhrase ?>" class="header-searched-link">показать все</a>
				</div>
				<div class="header-searched-sections-links">
					 <? foreach ($sectionsData as ["NAME" => $name, "SECTION_PAGE_URL" => $urn]): ?>
						  <a href="<?= $urn ?>" class="header-searched-section-link"><?= $name ?></a>
					 <? endforeach; ?>
				</div>
		  </div>
		  <hr>
	 <? endif; ?>
	 
	 <div class="header-searched-title">
		  <? if ($productCount): ?>
				<b>Товары: </b><span class="header-searched-count"><?= $productCount ?></span>
		  <? endif; ?>
		  
		  <a href="/search/?q=<?= $searchPhrase ?>" class="header-searched-link">показать все</a>
	 </div>
	 
	 <? foreach ($items as $item): ?>
		  <?
		  [
			  "IMG_SRC" => $imgSrc,
			  "DETAIL_PAGE_URL" => $elemURN,
			  "TITLE" => $title,
			  "PRICE_DATA" => [$priceMain, $priceSec]
		  ] = $item;
		  ?>
		  
		  <div class="header-searched-item">
				<div class="header-searched-item-photo"
					  style="background: url('<?= $imgSrc ?>') no-repeat; background-size: cover;">
				</div>
				<div class="header-searched-item-name">
					 <a class="header-searched-item-link" href="<?= $elemURN ?>">
						  <?= $title ?>
					 </a>
					 <div class="header-searched-item-price">
						  <? if (!$priceMain): ?>
								-
						  <? else: ?>
								<b>
									 <?= $priceMain ?>
									 <?= !$priceSec ? "" : "<sup>{$priceSec}</sup>" ?>
									 ₽
								</b>
						  <? endif; ?>
					 </div>
				</div>
		  </div>
	 <? endforeach; ?>
<? endif; ?>