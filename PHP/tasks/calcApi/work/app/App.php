<?php
    
    use App\Controllers\Entity;
    
    class App
    {
        const STATUSES = [
            200 => 'OK',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        ];
        
        function __construct()
        {
            header("Access-Control-Allow-Orgin: *");
            header("Access-Control-Allow-Methods: GET");
            header("Content-Type: application/json");
        }
        
        /**
         *
         *
         * @return array
         * @throws Exception
         */
        private function getUrnData(): array
        {
            $urnData = [];
            ['REQUEST_URI' => $uri, 'DOCUMENT_ROOT' => $root] = $_SERVER;
            
            $appRelPath = str_replace($root, '', __DIR__);
            $requestURN = str_replace($appRelPath, '', $uri);
            $urnParts = explode('/', trim($requestURN, '/'));
            
            foreach ($urnParts as $key => $urnPart) {
                if (!$urnPart) {
                    throw new Exception('Error! Nothing selected');
                }
                
                if ($key && $key % 2 != 0) {
                    continue;
                }
                
                $urnData[$urnPart] = $urnParts[$key + 1] ?? false;
            }
            
            return $urnData;
        }
        
        /**
         *
         *
         * @return string
         */
        public function run(): string
        {
            $status = 200;
            $data = [];
            
            try {
                $urnData = $this->getUrnData();
                $entityData = Entity::transformToEntities($urnData);
                $data = $entityData;
            } catch (Exception $e) {
                $status = 404;
                $data[] = $e->getMessage();
            } finally {
                return $this->generateResponse($data, $status);
            }
        }
        
        /**
         *
         *
         * @param array $data
         * @param int $status
         * @return string
         */
        public function generateResponse(array $data, int $status = 500): string
        {
            $statusValue = self::STATUSES[$status];
            
            header("HTTP/1.1 {$status} {$statusValue}");
            
            return json_encode($data);
        }
    }
    
    
    