<?php
	 
	 #@ Роутер:
	 function route($method, $urlData, $formData)
	 {
		  
		  # Получение информации о товаре: GET /goods/{goodId}
		  if ($method === 'GET' && count($urlData) === 1) {
				# Получаем id товара
				$goodId = $urlData[0];
				
				// Вытаскиваем товар из базы...
				
				# Выводим ответ клиенту
				echo json_encode([
					'method' => 'GET',
					'id' => $goodId,
					'good' => 'phone',
					'price' => 10000
				]);
				
				return;
		  }
		  
		  
		  # Добавление нового товара: POST /goods
		  if ($method === 'POST' && empty($urlData)) {
				// Добавляем товар в базу...
			 
				# Выводим ответ клиенту
				echo json_encode([
					'method' => 'POST',
					'id' => rand(1, 100),
					'formData' => $formData
				]);
				
				return;
		  }
		  
		  
		  # Обновление всех данных товара: PUT /goods/{goodId}
		  if ($method === 'PUT' && count($urlData) === 1) {
				# Получаем id товара
				$goodId = $urlData[0];
				
				// Обновляем все поля товара в базе...
				
				# Выводим ответ клиенту
				echo json_encode([
					'method' => 'PUT',
					'id' => $goodId,
					'formData' => $formData
				]);
				
				return;
		  }
		  
		  
		  # Частичное обновление данных товара: PATCH /goods/{goodId}
		  if ($method === 'PATCH' && count($urlData) === 1) {
				# Получаем id товара
				$goodId = $urlData[0];
				
				// Обновляем только указанные поля товара в базе...
				
				# Выводим ответ клиенту
				echo json_encode([
					'method' => 'PATCH',
					'id' => $goodId,
					'formData' => $formData
				]);
				
				return;
		  }
		  
		  
		  # Удаление товара DELETE: /goods/{goodId}
		  if ($method === 'DELETE' && count($urlData) === 1) {
				# Получаем id товара
				$goodId = $urlData[0];
				
				// Удаляем товар из базы...
				
				# Выводим ответ клиенту
				echo json_encode([
					'method' => 'DELETE',
					'id' => $goodId
				]);
				
				return;
		  }
		  
		  
		  # Возвращаем ошибку:
		  header('HTTP/1.0 400 Bad Request');
		  echo json_encode([
			  'error' => 'Bad Request'
		  ]);
	 }
