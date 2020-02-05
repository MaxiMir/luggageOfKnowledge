<?php
    
    require_once "./app/DB/Database.php";
    
    const TABLES = [
        'Services',
        'CalcSettings',
        'PriceName',
        'PriceParam2',
        'PriceParam1',
        'PriceCost',
        'MatTypes',
        'Materials',
        'MatFormats',
    
        'KA_GeoPoints',
        'Offering',
        'fin_ManPercent',
        'awc_Binding',
        'Produkts',
        'PurposeCost',
        'NacenkaName',
        'UniCalcSrokNac',
        'SkladAccountingUnits',
        'SkladInventar',
        'ListReferences',
        'Units',
        'cuttingKnives',
        'awc_CalcTech',
        'ServiceProd',
        'MatFormatINOUT',
        'ProdNacSrok',
        'awc_TypeProd',
        'Costs',
        'tech_OperFormat',
        'tech_OperControlTag',
        'tech_Operations',
        'awc_Polygraph',
        'PriceNacenki',
    ];
    
    const DESCRIPTION = [
        '#0 - TYPE PRODUCTS',
        '#1 - PRODUCT',
        '#2 - PRICE',
        '#3 - FORMAT',
        '#4 - TIRAGE',
        '#5 - PRICE COST',
        '#6 - MAT TYPE',
        '#7 - MATERIALS',
        '#8 - MAT FORMATS',
    
        'KA_GeoPoints',
        'Offering',
        'fin_ManPercent',
        'awc_Binding',
        'Produkts',
        'PurposeCost',
        'NacenkaName',
        'UniCalcSrokNac',
        'SkladAccountingUnits',
        'SkladInventar',
        'ListReferences',
        'Units',
        'cuttingKnives',
        'awc_CalcTech',
        'ServiceProd',
        'MatFormatINOUT',
        'ProdNacSrok',
        'awc_TypeProd',
        'Costs',
        'tech_OperFormat',
        'tech_OperControlTag',
        'tech_Operations',
        'awc_Polygraph',
        'PriceNacenki',
    ];
    
    
    $DDL = new App\DB\Database();
    
    
    foreach (TABLES as $key => $table) {
        $columns = $DDL->getTableColumns($table);
        $rows = $DDL->getTableData($table);
        
        echo "<h3>$table</h3>";
        echo DESCRIPTION[$key];
        echo '<br>';
        echo '<table>';
        
        echo '<tr>';
        
        foreach ($columns as ['COLUMN_NAME' => $column]) {
            echo "<th>$column</th>";
        }
        
        echo '</tr>';
    
        
        foreach ($rows as $row) {
            echo '<tr>';
            
            
            foreach ($row as $value) {
                if ($value instanceof DateTime) {
                    echo "<td>-</td>";
                    
                    continue;
                }
                
                $value = is_object($value) ? print_r($value, true) : $value;
                echo "<td>$value</td>";
            }
            
            echo '</tr>';
        }
        
        echo '</table>';
        echo '<br>';
        
    }
?>

<style>
    table {
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        font-size: 14px;
        background: white;
        max-width: 70%;
        width: 70%;
        border-collapse: collapse;
        text-align: left;
    }
    th {
        font-weight: normal;
        color: #039;
        border-bottom: 2px solid #6678b1;
        padding: 10px 8px;
    }
    td {
        color: #669;
        padding: 9px 8px;
        transition: .3s linear;
    }
    tr:hover td {color: #6699ff;}
</style>