<?
	 require_once "search-engine.php";
?>

<div class="site-main">
	 <section class="middle">
		  <div class="container">
				<div class="search-results">
					 <p class="search-results__title">Результаты поиска по запросу <b>"<?= $searchPhrase ?>"</b></p>
					 
					 <div class="catalog-page">
						  <div class="site-wrap">
								<div class="middle-left">
									 <div class="filters-block">
										  <? #@ БОКОВОЕ МЕНЮ РАЗДЕЛЫ: @# ?>
										  <? if ($sortedSectionsData): ?>
												<div class="filter-unit">
													 <div class="title active">Категории</div>
													 <div class="content">
														  <div class="filter-container">
																<? foreach ($sortedSectionsData as $sectionID => $sectionData): ?>
																	 <?
																	 [
																		 "NAME" => $sectionName,
																		 "URN" => $sectionURN,
																		 "PRODUCTS_COUNT" => $prodCount
																	 ] = $sectionData;
																	 
																	 $activeClass = $sectionID !== $filterCategoryID ? "" : " active-block";
																	 ?>
																	 
																	 <div class="filter-container__block<?= $activeClass ?>">
																		  <a href="<?= $sectionURN ?>">
																				<?= $sectionName ?>
																				<span><?= $prodCount ?></span>
																		  </a>
																	 </div>
																<? endforeach; ?>
														  </div>
													 </div>
												</div>
										  <? endif; ?>
										  <? #@ БОКОВОЕ МЕНЮ БРЕНДЫ: @# ?>
										  <? if ($brandsData): ?>
												<form action="">
													 <div class="filter-unit">
														  <div class="title active">Бренд</div>
														  <div class="content">
																
																<? foreach ($brandsData as $brandID => ["NAME" => $brandName, "COUNT" => $productCount]): ?>
																	 <? $attrChecked = !in_array($brandID,
																		 $filterBrandIDs) ? "" : " checked" ?>
																	 <div class="checkbox-groupe">
																		  <input
																			  type="checkbox"
																			  id="filter-brand-<?= $brandID ?>"
																			  name="PROPERTY[BRAND][]"
																			  value="<?= $brandID ?>"
																			  data-brandcount="<?= $productCount ?>"
																			  <?= $attrChecked ?>
																		  >
																		  <label for="filter-brand-<?= $brandID ?>">
																				<?= $brandName ?>
																				(<?= $productCount ?>)
																		  </label>
																	 </div>
																<? endforeach; ?>
														  
														  </div>
													 </div>
													 <input type="submit" value="Применить фильтры" name="SEND">
													 <input type="hidden" name="SECTION_ID" value="1395">
												</form>
										  <? endif; ?>
									 </div>
								</div>
								<div class="middle-right">
									 
									 
									 <? if ($allProductIDs): ?>
										  <div class="block-sorting">
												<form action="./" method="GET">
													 <? #@ ДОБАВЛЯЕМ QUERY PARAMS #@
													 ?>
													 <input type="hidden" name="q" value="<?= $searchPhrase ?>"/>
													 
													 <? if ($filterBrandIDs): ?>
														  <? var_dump($filterBrandIDs); ?>
														  <input type="hidden" name="BRAND" value="<?= implode("-", $filterBrandIDs) ?>"/>
													 <? endif; ?>
													 
													 <? if ($filterCategoryID): ?>
														  <input type="hidden" name="CATEGORY" value="<?= $filterCategoryID ?>"/>
													 <? endif; ?>
													 
													 <div>
														  <div class="sorting-unit">
																<div class="title">Сортировать по:</div>
																
																<select name="SORT" onchange="$(this).parents('form').submit();">
																	 <option
																		 value="saleleader" <?= $sortName !== 'saleleader' ? "" : ' selected="selected"' ?>>
																		  популярные
																	 </option>
																	 <option
																		 value="price-desc" <?= $sortName !== 'price-desc' ? "" : ' selected="selected"' ?>>
																		  дорогие
																	 </option>
																	 <option
																		 value="price-asc" <?= $sortName !== 'price-asc' ? "" : ' selected="selected"' ?>>
																		  дешевые
																	 </option>
																</select>
														  </div>
														  
														  <div class="sorting-unit">
																<div class="title">Показывать по:</div>
																
																<select name="VIEW" onchange="$(this).parents('form').submit();">
																	 <option
																		 value="12"<?= $viewProductNum !== 12 ? "" : ' selected="selected"' ?>>
																		  12
																	 </option>
																	 <option
																		 value="24"<?= $viewProductNum !== 24 ? "" : ' selected="selected"' ?>>
																		  24
																	 </option>
																	 <option
																		 value="36"<?= $viewProductNum !== 36 ? "" : ' selected="selected"' ?>>
																		  36
																	 </option>
																	 <option
																		 value="48"<?= $viewProductNum !== 48 ? "" : ' selected="selected"' ?>>
																		  48
																	 </option>
																	 <option
																		 value="56"<?= $viewProductNum !== 56 ? "" : ' selected="selected"' ?>>
																		  56
																	 </option>
																</select>
														  </div>
													 </div>
												</form>
										  </div>
										  
										  <?
										  $APPLICATION->IncludeComponent(
											  "bitrix:search.page",
											  "new.search.page.template",
											  [
												  "AJAX_MODE" => "N",
													// Включить режим AJAX
												  "AJAX_OPTION_ADDITIONAL" => "",
													// Дополнительный идентификатор
												  "AJAX_OPTION_HISTORY" => "N",
													// Включить эмуляцию навигации браузера
												  "AJAX_OPTION_JUMP" => "N",
													// Включить прокрутку к началу компонента
												  "AJAX_OPTION_SHADOW" => "Y",
												  "AJAX_OPTION_STYLE" => "Y",
													// Включить подгрузку стилей
												  "CACHE_TIME" => "36000000",
													// Время кеширования (сек.)
												  "CACHE_TYPE" => "A",
													// Тип кеширования
												  "CHECK_DATES" => "N",
													// Искать только в активных по дате документах
												  "DEFAULT_SORT" => "rank",
													// Сортировка по умолчанию
												  "DISPLAY_BOTTOM_PAGER" => "Y",
													// Выводить под результатами
												  "DISPLAY_TOP_PAGER" => "N",
													// Выводить над результатами
												  "FILTER_NAME" => "productFilterData",
													// Дополнительный фильтр
												  "NAME_TEMPLATE" => "",
												  "NO_WORD_LOGIC" => "N",
													// Отключить обработку слов как логических операторов
												  "PAGER_SHOW_ALWAYS" => "N",
													// Выводить всегда
												  "PAGER_TITLE" => "Результаты поиска",
													// Название результатов поиска
												  "PAGE_RESULT_COUNT" => "0",
													// Количество результатов на странице
												  "PATH_TO_SONET_MESSAGES_CHAT" => "/company/personal/messages/chat/#USER_ID#/",
												  "PATH_TO_USER_PROFILE" => "",
													// Шаблон пути к профилю пользователя
												  "RATING_TYPE" => "",
													// Вид кнопок рейтинга
												  "RESTART" => "Y",
													// Искать без учета морфологии (при отсутствии результата поиска)
												  "SHOW_ITEM_DATE_CHANGE" => "N",
													// Показывать дату изменения документа
												  "SHOW_ITEM_TAGS" => "N",
													// Показывать теги документа
												  "SHOW_LOGIN" => "Y",
												  "SHOW_ORDER_BY" => "N",
													// Показывать сортировку
												  "SHOW_RATING" => "",
													// Включить рейтинг
												  "SHOW_TAGS_CLOUD" => "N",
													// Показывать облако тегов
												  "SHOW_WHEN" => "N",
													// Показывать фильтр по датам
												  "SHOW_WHERE" => "N",
													// Показывать выпадающий список "Где искать"
												  "STRUCTURE_FILTER" => "structure",
												  "USE_LANGUAGE_GUESS" => "Y",
													// Включить автоопределение раскладки клавиатуры
												  "USE_SUGGEST" => "N",
													// Показывать подсказку с поисковыми фразами
												  "USE_TITLE_RANK" => "N",
													// При ранжировании результата учитывать заголовки
												  "arrFILTER" => [   // Ограничение области поиска
													  0 => CATALOG_I_BLOCK,
												  ],
												  "arrFILTER_forum" => [
													  0 => "all",
												  ],
												  "arrFILTER_iblock_encyclopedia" => [
													  0 => "all",
												  ],
												  "arrFILTER_iblock_1c_catalog" => [   // Искать в информационных блоках типа "iblock_1c_catalog"
													  0 => "all",
												  ],
												  "arrFILTER_iblock_catalog" => [
													  0 => "all",
												  ],
												  "arrFILTER_iblock_news" => [
													  0 => "all",
												  ],
												  "arrFILTER_iblock_services" => [
													  0 => "all",
												  ],
												  "arrFILTER_main" => "",
												  "COMPONENT_TEMPLATE" => "clear",
												  "TAGS_SORT" => "NAME",
												  "TAGS_PAGE_ELEMENTS" => "150",
												  "TAGS_PERIOD" => "",
												  "TAGS_URL_SEARCH" => "",
												  "TAGS_INHERIT" => "Y",
												  "FONT_MAX" => "50",
												  "FONT_MIN" => "10",
												  "COLOR_NEW" => "000000",
												  "COLOR_OLD" => "C8C8C8",
												  "PERIOD_NEW_TAGS" => "",
												  "SHOW_CHAIN" => "Y",
												  "COLOR_TYPE" => "Y",
												  "WIDTH" => "100%",
												  "SEARCH_SECTION_NAME" => "",
												  "SEARCH_SECTION_ID" => "",
												  "SEARCH_IBLOCK_ID" => CATALOG_I_BLOCK_ID,
												  "SEARCH_COMPONENT" => COMPONENT,
												  "PAGER_TEMPLATE" => "load_more",
												  "SEARCH_SORT" => []
											  ],
											  false
										  );
										  ?>
									 <? endif; ?>
								</div>
								
								<? if ($searched == false && isset($searchPhrase) && $searchPhrase != ""): ?>
									 <div class="search-results__top">Ничего не найдено. Возможно, вы допустили ошибку в
										  поисковом запросе или товар отсутствует у нас.
									 </div>
								<? endif; ?>
								
								<div class="seo-text">
									 <? $APPLICATION->IncludeFile(SITE_DIR . "include/footer_search_seo-text.php"); ?>
								</div>
						  </div>
					 </div>
	 </section>
	 
	 <div class="catalog-page">
		  <div class="middle-right">
				<div class="block-pagination">
					 <div class="row">
						  <div class="cell">
								<? $product_count = sizeof($allProductIDs); ?>
								<? if ($product_count > $viewProductNum) : ?>
									 <?= $productDBResult->NavPrint('страницы', false, "text", "/include/pagination.php") ?>
								<? else: ?>
									 &nbsp;
								<? endif; ?>
						  </div>
						  
						  <div class="cell">
								<div class="numeration">Товары <span><?= ((($pageNum - 1) * $viewProductNum) + 1) ?></span> -
									 <span><?= ($product_count > $viewProductNum ? (($pageNum * $viewProductNum) > $product_count ? $product_count : ($pageNum * $viewProductNum)) : $product_count) ?></span>
									 из <span><?= $product_count ?></span></div>
						  </div>
						  
						  <div class="cell">
								<? if ($product_count > $viewProductNum && ($pageNum * $viewProductNum) < $product_count) : ?>
									 <div class="button"><a href="#">Показать еще</a></div>
								<? else: ?>
									 &nbsp;
								<? endif; ?>
						  </div>
					 </div>
				</div>
		  </div>
	 </div>
</div>
