import * as $ from 'jQuery.md'; // импорт jquery
import Post from './Post';
import json from './assets/json' // импорт json файла (для .json расширение можно не указывать)
import logo from './assets/logo.png'; // импорт картинки
import xml from '@/assets/data.xml' // импорт xml файла c использованием алиаса в пути
import csv from '@/assets/data.csv' // импорт csv файла c использованием алиаса в пути
import './features';
import './styles/styles.css';
import './styles/less.less';

const post = new Post("Webpack Post title", logo);

$('pre').html(post.toString());

console.log('title:', post.toString());
console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);
