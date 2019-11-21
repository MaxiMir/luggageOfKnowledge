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
		 "filterCategoryID" => $filterCategoryID
	 ] = $requestPageData;
	 
	 if ($searchPhrase) {
		  $productDBResult = getProductDBData($requestPageData);
		  [$productIDs, $sectionsData, $brandsData] = getPageData($productDBResult, $generateURNWithClosure);
		  $sectionsDataWithNames = addSectionNames($sectionsData);
		  $brandsDataWithSymbolCode = addBrandsSymbolCode($brandsData);
		  $countBrandProducts = getBrandProductCount($filterBrandIDs, $brandsDataWithSymbolCode);
		  $sortedSectionsData = sortSectionData($sectionsDataWithNames, $searchPhrase);
		  $productIdOnCurrPage = getIDsForCurrPage($productIDs, $pageNum, $viewProductNum);
		  $productCount = sizeof($productIDs);
		  $isLessThanShown = $productCount <= $viewProductNum;
		  $productCountOnPage = $pageNum * $viewProductNum;
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
																	  data-all="<?= $productCount ?>"
																	  data-last="<?= $productCount ?>"
																>
																	 Показать: <b id="filterCounterCount"><?= $productCount ?></b>
																	 <b id="filterCounterText">товаров</b>
																</div>
																<? $brandIndex = 0; ?>
																<? foreach ($brandsData as $brandID => ["NAME" => $brandName, "COUNT" => $productCount]): ?>
																	 <? $attrChecked = !in_array($brandID,
																		 $filterBrandIDs) ? "" : " checked" ?>
																	 <div class="checkbox-groupe">
																		  <input
																			  type="checkbox"
																			  class="brand-filter__input"
																			  name="PROPERTY[CML2_MANUFACTURER][]"
																			  value="<?= $brandID ?>"
																			  data-count="<?= $productCount ?>"
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
													 <a href="<?= $urnWithOnlySearch ?>" class="filter-button bg-grey mb-10">
														  Сбросить фильтры
													 </a>
													 <button id="brandFilterSbmBtn" data-urn="<?= $urnWithoutBrand ?>" class="filter-button">
														  Применить фильтры
													 </button>
												</form>
										  <? endif; ?>
									 </div>
								</div>
								<div class="middle-right">
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
									 <? endif; ?>
									 
									 <? if ($productIDs): ?>
										  <?
										  $GLOBALS['catalogFilter'] = ["ID" => $productIdOnCurrPage];
										  
										  $APPLICATION->IncludeComponent(
											  "bitrix:catalog.order.section",
											  "new-search",
											  [
												  //...
												  "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
												  "IBLOCK_TYPE" => CATALOG_I_BLOCK_TYPE,
												  "FILTER_PRODUCT_ID" => $productIdOnCurrPage,
												  "PAGE_ELEMENT_COUNT" => $viewProductNum
											  ],
											  false,
											  ["HIDE_ICONS" => "Y"]
										  );
										  ?>
										  
										  <div class="catalog-page">
												<div class="middle-right">
													 <div class="block-pagination">
														  <div class="row">
																<div class="cell">
																	 <?
																		  $productDBResult->NavStart($viewProductNum);
																		  $productDBResult->NavPrint('страницы', false, "text",
																			  "/include/pagination.php")
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
																					  $productCount
																					  :
																					  $productCountOnPage > $productCount ? $productCount : $productCountOnPage
																			 ?>
																			</span>
																		  из
																		  <span>
																				<?= $productCount ?>
																			</span>
																	 </div>
																</div>
																
																<div class="cell">
																	 <? if (!$isLessThanShown && $productCountOnPage < $productCount): ?>
																		  <div class="button">
																				<a href="#">Показать еще</a>
																		  </div>
																	 <? endif; ?>
																</div>
														  </div>
													 </div>
												</div>
										  </div>
									 <? endif; ?>
								</div>
						  </div>
					 </div>
	 </section>
</div>


<script>
    window.addEventListener('load', () => {
        let timerId;
        const filterBrandInputs = document.querySelectorAll('.brand-filter__input');
        const filterCounter = document.getElementById('filterCounter');
        const filterCounterText = document.getElementById('filterCounterText');
        const filterSbmBtn = document.getElementById('brandFilterSbmBtn');


        /**
         * Возвращает склонененное слово для цифры
         * @param num
         * @param textOptions
         * @returns {boolean|*}
         */
        const wordNumDeclension = (num, textOptions) => {
            if (textOptions.length !== 3) {
                return false;
            }

            const restFrom100 = Math.abs(num) % 100;

            if (restFrom100 > 10 && restFrom100 < 20)
                return textOptions[2];

            const restFrom10 = num % 10;

            if (restFrom10 > 1 && restFrom10 < 5)
                return textOptions[1];

            if (restFrom10 === 1)
                return textOptions[0];

            return textOptions[2];
        };


        /**
         * Возвращает текущее количество отмеченных товаров в фильтре
         */
        const getCurrentFilterProdCount = () => {
            return [...filterBrandInputs]
                .filter(input => input.checked)
                .reduce((acc, input) => acc + +input.dataset.count, 0);
        };


        /**
         * Возвращает количество всех товаров на странице
         */
        const getFilterAllProdCount = () => + filterCounter.dataset.all;


        /**
         * Возвращает последнее сохраненное количество отмеченных товаров в фильтре
         */
        const getLastSavedFilterProdCount = () => + filterCounter.dataset.last;


        /**
         * Записывает текущее количество отмеченных товаров в фильтре
         */
        const saveFilterProdCount = newValue => {
            filterCounter.dataset.last = newValue;
        };


        /**
         * Показывает и скрывает блок фильтра с количеством товаров c анимацией
         */
        const showAndHideFilterProdCount = indexNum => {
            const upHeight = 50;

            const prevCount = getLastSavedFilterProdCount();
            let newCount = getCurrentFilterProdCount();

            if (!newCount) {
                newCount = getFilterAllProdCount();
            }

            saveFilterProdCount(newCount);

            const newText = wordNumDeclension(newCount, ['товар', 'товара', 'товаров']);

            filterCounter.style.top = `${upHeight * indexNum + 20}px`;
            filterCounterText.innerText = newText;
            filterCounter.classList.add("active");

            animateFilterProdCount(prevCount, newCount);

            clearTimeout(timerId);
            timerId = setTimeout(hideFilterProdCount, 3000);
        };


        /**
         * Скрывает блок фильтра с количеством товаров
         */
        const hideFilterProdCount = () => {
            filterCounter.classList.remove('active');
        };


        /**
         * Анимация увеличения/уменьшения цены
         * @param oldProductNum
         * @param newProductNum
         */
        const animateFilterProdCount = (oldProductNum, newProductNum) => {
            const $filterCount = $("#filterCounterCount");

            $({numberValue: oldProductNum}).animate(
                {numberValue: newProductNum},
                {
                    duration: 500,
                    easing: "linear",
                    step: val => {
                        $filterCount.html(Math.ceil(val));
                    }
                }
            );
        };


        /**
         * Вовзращает массив с отмеченными ID брендов
         */
        const getCheckedBrandIDs = () => {
            return [...filterBrandInputs]
                .filter(input => input.checked)
                .reduce((acc, input) => {
                    acc.push(input.value);
                    return acc;
                }, []);
        };


        /**
         * Обработчик события клика по input
         * @param e
         */
        const inputBrandClickHandler = e => {
            const input = e.currentTarget;
            const indexNum = + input.dataset.index;

            showAndHideFilterProdCount(indexNum);
        };


        /**
         * Обработчик события клика по "применить фильтры"
         * @param e
         */
        const formBrandSubmitHandler = e => {
            let brandURNPart = "";

            e.preventDefault();

            const urn = filterSbmBtn.dataset.urn;
            const brandsIDs = getCheckedBrandIDs();

            if (brandsIDs) {
                brandURNPart = `&BRAND=${brandsIDs.join('-')}`;
            }

            document.location.href = `${urn}${brandURNPart}`;
        };


        for (let filterBrandInput of filterBrandInputs) {
            filterBrandInput.addEventListener('click', inputBrandClickHandler)
        }

        filterSbmBtn.addEventListener('click', formBrandSubmitHandler);
        filterCounter.addEventListener('click', formBrandSubmitHandler);
    });
</script>