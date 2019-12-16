<?
	 
	 $navigationData = [];
	 $prevNumber = $this->NavPageNomer - 1;
	 $nextNumber = $this->NavPageNomer + 1;
	 $hrefPrev = "{$sUrlPath}?PAGEN_{$this->NavNum}={$prevNumber}{$strNavQueryString}";
	 $hrefNext = "{$sUrlPath}?PAGEN_{$this->NavNum}={$nextNumber}{$strNavQueryString}";
	 $hrefPrevWithoutAjax = str_replace("&amp;AJAX=true", "", $hrefPrev);
	 $hrefNextWithoutAjax = str_replace("&amp;AJAX=true", "", $hrefNext);
	 
	 $NavRecordGroup = $nStartPage;
	 
	 while ($NavRecordGroup <= $nEndPage) {
		  $class = $NavRecordGroup != $this->NavPageNomer ? "" : ' class="active"';
		  $href = "{$sUrlPath}?PAGEN_{$this->NavNum}={$NavRecordGroup}{$strNavQueryString}";
		  $hrefWithoutAjax = str_replace("&amp;AJAX=true", "", $href);
		  $navigationData[] = [$NavRecordGroup, $class, $hrefWithoutAjax];
		  $NavRecordGroup++;
	 }

?>

<div class="pagination transition">
	 <nav>
		  <? if ($this->NavPageNomer > 1): ?>
				<a class="prev_page js-catalog-filter-click" href="<?= $hrefPrevWithoutAjax ?>"><</a>
		  <? endif; ?>
		  
		  <? foreach ($navigationData as [$NavRecordGroup, $class, $hrefWithoutAjax]): ?>
				<a href='<?=$hrefWithoutAjax?>'<?=$class?>>
					 <?=$NavRecordGroup?>
				</a>
		  <? endforeach; ?>
		  
		  <? if ($this->NavPageNomer < $this->NavPageCount): ?>
				<a class="next_page js-catalog-filter-click" href="<?=$hrefNextWithoutAjax ?>">></a>
		  <? endif; ?>
	 </nav>
</div>