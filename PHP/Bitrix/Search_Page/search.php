<?
	 
	 require_once "search_engine.php";
	 
	 $filteredProductID = [];
	 $sortedSectionsData = [];
	 $productFilterData = [];
	 
	 $request = getRequest();
	 $generateURNWithClosure = generateURN($request);
	 $urnWithoutBrand = $generateURNWithClosure(["BRAND"], "delete");
	 $urnWithOnlySearch = $generateURNWithClosure(["BRAND", "CATEGORY", "PAGEN_2"], "delete");
	 $requestPageData = getRequestPageData($request);
	 
	 [
		 "searchPhrase" => $searchPhrase,
		 "pageNum" => $pageNum,
		 "viewProductNum" => $viewProductNum,
		 "sortName" => $sortName,
		 "sortData" => $sortData,
		 "filterBrandIDs" => $filterBrandIDs,
		 "filterCategoryID" => $filterCategoryID,
		 "isAjax" => $isAjax
	 ] = $requestPageData;
	 
	 if ($searchPhrase) {
		  $productDBResult = getProductDBData($requestPageData);
		  [$productIDs, $sectionsData, $brandsData] = getPageData($productDBResult, $generateURNWithClosure);
		  $sectionsDataWithNames = addSectionNames($sectionsData);
		  $brandsDataWithSymbolCode = addBrandsSymbolCode($brandsData);
		  $countBrandProducts = getBrandProductCount($filterBrandIDs, $brandsDataWithSymbolCode);
		  $sortedSectionsData = sortSectionData($sectionsDataWithNames, $searchPhrase);
		  $productDataForCurrPage = getProductDataForCurrPage($productIDs, $requestPageData);
		  $productsCount = sizeof($productIDs);
	 }
?>


<div class="site-main">
	 <section class="middle">
		  <div class="container">
				<div class="search-results">
					 <p class="search-results__title">Результаты поиска по запросу <b>"<?= $searchPhrase ?>"</b></p>
					 
					 <? if (!$productIDs): ?>
						  <div class="search-results__top">Ничего не найдено. Возможно, вы допустили ошибку в
								поисковом запросе или товар отсутствует у нас.
						  </div>
					 <? endif; ?>
					 
					 <div class="catalog-page">
						  <div class="site-wrap">
								<div class="middle-left">
									 <div class="filters-block">
										  <? #@ БОКОВОЕ МЕНЮ РАЗДЕЛЫ: @# ?>
										  <? if ($productIDs && $sortedSectionsData): ?>
												<div class="filter-unit">
													 <div class="title active">Категории</div>
													 <div class="content">
														  <div class="filter-container">
																<? foreach ($sortedSectionsData as $sectionID => $sectionData): ?>
																	 <?
																	 [
																		 "NAME" => $sectionName,
																		 "URN" => $sectionURN,
																		 "COUNT" => $prodCount
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
										  <? if ($productIDs && $brandsData): ?>
												<form action="" id="brandFilter" class="brand-filter">
													 <div class="filter-unit">
														  <div class="title active">Бренд</div>
														  <div class="content filter-content">
																<div id="filterCounter"
																	  class="filter-counter"
																	  data-all="<?= $productsCount ?>"
																	  data-last="<?= $productsCount ?>"
																>
																	 Показать: <b id="filterCounterCount"><?= $productsCount ?></b>
																	 <b id="filterCounterText">товаров</b>
																</div>
																<? $brandIndex = 0; ?>
																<? foreach ($brandsData as $brandID => ["NAME" => $brandName, "COUNT" => $productsCount]): ?>
																	 <? $attrChecked = !in_array($brandID,
																		 $filterBrandIDs) ? "" : " checked" ?>
																	 <div class="checkbox-groupe">
																		  <input
																			  type="checkbox"
																			  class="brand-filter__input"
																			  name="PROPERTY[CML2_MANUFACTURER][]"
																			  value="<?= $brandID ?>"
																			  data-count="<?= $productsCount ?>"
																			  <?= $attrChecked ?>
																			  data-index="<?= $brandIndex++ ?>"
																			  id="filter-brand-<?= $brandID ?>"
																		  >
																		  <label for="filter-brand-<?= $brandID ?>">
																				<?= $brandName ?>
																		  </label>
																	 </div>
																<? endforeach; ?>
														  
														  </div>
													 </div>
													 <? if ($filterBrandIDs || $filterCategoryID): ?>
														  <a href="<?= $urnWithOnlySearch ?>" class="filter-button bg-grey mb-10">
																Сбросить фильтры
														  </a>
													 <? endif; ?>
													 <button id="brandFilterSbmBtn" data-urn="<?= $urnWithoutBrand ?>" class="filter-button">
														  Применить фильтры
													 </button>
												</form>
										  <? endif; ?>
									 </div>
								</div>
								<div class="middle-right">
									 <div class="block-wrap">
										  <? if ($productIDs): ?>
												<div class="block-sorting">
													 <form action="./" method="GET">
														  <? #@ ДОБАВЛЯЕМ QUERY PARAMS #@ ?>
														  <input type="hidden" name="q" value="<?= $searchPhrase ?>"/>
														  
														  <? if ($filterBrandIDs): ?>
																<input type="hidden" name="BRAND"
																		 value="<?= implode("-", $filterBrandIDs) ?>"/>
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
												
												<div class="block-goods">
													 <div class="row">
														  <?
																if ($isAjax) {
																	 $APPLICATION->RestartBuffer();
																}
														  ?>
														  <? foreach ($productDataForCurrPage as $key => $value): ?>
																<div class="cell">
																	 <div class="goods-unit transition">
																		  <figure>
																				<div class="img-container">
																					 <a href="<?= $value["DETAIL_PAGE_URL"] ?>">
																						  <img src="<?= $value["IMG"] ?>" alt=""/></a>
																					 
																					 <? if ($value["IBLOCK_SECTION_ID"] != 1160) : ?>
																						  <div class="button">
																								<a
																									href="#" class="js-catalog-fast-view"
																									data-id="<?= $value["ID"] ?>"
																									data-href="<?= $value["DETAIL_PAGE_URL"] ?>"
																								>
																									 Быстрый просмотр
																								</a>
																						  </div>
																					 <? endif; ?>
																				</div>
																				
																				<figcaption>
																					 <? if ($value["COLORS"] && $value["COLORS"] > 1) : ?>
																						  <div class="add-info">
																								<a href="<?= $value["DETAIL_PAGE_URL"] ?>">
																									 Доступно цветов:
																									 <span><?= $value["COLORS"] ?> </span>
																								</a>
																						  </div>
																					 <? else: ?>
																						  <div class="add-info">&nbsp;</div>
																					 <? endif; ?>
																					 
																					 <div class="short-info">
																						  <a href="<?= $value["DETAIL_PAGE_URL"] ?>"><?= $value["NAME"] ?></a>
																					 </div>
																					 
																					 <div class="bottom-info">
																						  <? if ($value["PRICE"]) : ?>
																								<div class="price-type-2">
																									 <div class="new-price"><?= $value["PRICE_FORMAT"] ?></div>
																								</div>
																						  <? endif; ?>
																						  
																						  <div
																							  data-id="<?= $value["ID"] ?>"
																							  class="like js-catalog-favorites<?= ($value["DELAY"] == "Y" ? ' active' : '') ?>"
																						  >
																						  </div>
																					 </div>
																				</figcaption>
																				
																				<? if ($user_admin) : ?>
																					 <a href="https://str-online.ru/bitrix/admin/iblock_element_edit.php?IBLOCK_ID=28&type=1c_catalog&ID=<?= $value["ID"] ?>&lang=ru&find_section_section=<?= $value["IBLOCK_SECTION_ID"] ?>&WF=Y"
																						 class="admin-edit" target="_blank"></a>
																				<? endif; ?>
																		  </figure>
																	 </div>
																</div>
														  <? endforeach; ?>
														  <?
																if ($isAjax) {
																	 die;
																}
														  ?>
													 </div>
												</div>
												
												<div class="block-pagination">
													 <div class="row">
														  <div class="cell">
																<?
																	 $productsCount = sizeof($productIDs);
																	 $isLessThanShown = $productsCount <= $viewProductNum;
																	 $productsCountOnPage = $pageNum * $viewProductNum;
																	 
																	 $productDBResult->NavStart($viewProductNum);
																	 $productDBResult->NavPrint('страницы', false, "text", "/include/pagination.php");
																?>
														  </div>
														  <div class="cell">
																<div class="numeration">
																	 Товары
																	 <span>
														 <?= $pageNum ?>
													 </span>
																	 -
																	 <span>
														  <?=
																$isLessThanShown
																	?
																	$productsCount
																	:
																	$productsCountOnPage > $productsCount ? $productsCount : $productsCountOnPage
														  ?>
													 </span>
																	 из
																	 <span>
														 <?= $productsCount ?>
													 </span>
																</div>
														  </div>
														  
														  <div class="cell">
																<? if (!$isLessThanShown && $productsCountOnPage <= $productsCount): ?>
																	 <div>
																		  <a href="#" id="loadMore" class="show-more">Показать еще</a>
																	 </div>
																<? endif; ?>
														  </div>
													 </div>
												</div>
										  <? endif; ?>
									 </div>
								</div>
						  </div>
					 </div>
				</div>
	 </section>
</div>


<script>
    $(() => {
        $('footer').addClass('footer-transparent');
    });
</script>