<?php
    
    declare(strict_types = 1);
    
    require '../vendor/autoload.php';
    
    use app\Controllers\CEntity;
    use Slim\App;
    
    $app = new App();
    
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
    
    $app->add(function ($req, $res, $next) {
        $response = $next($req, $res);
        
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST');
    });
    
    $app->get('/[{urnName}/[{id}/]]', function ($request, $response, $args) {
        try {
            $status = 200;
            ['urnName' => $urnName, 'id' => $entityID] = $args;
            
            $className = CEntity::urnToModelName($urnName);
            $model = CEntity::getModelInstance($className);
            
            if (!$entityID) {
                $entityData = $model->findAll();
            } else {
                $entityData = $model->findByID($entityID);
                
                if (!$entityData) {
                    throw new Exception("ID {$entityID} not found");
                }
            }
    
            $responseData = ['isSuccess' => true, 'data' => $entityData];
        } catch (Exception $e) {
            $status = 404;
            $responseData = ['isSuccess' => false, 'msg' => $e->getMessage()];
        } finally {
            return $response->withJson($responseData, $status, JSON_UNESCAPED_UNICODE);
        }
    });
    
    $app->post('/', function ($request, $response, $args) {
        try {
            $status = 200;
            $bindingMap = [];
            $entitiesData = [];
            
            $parsedBody = $request->getParsedBody();
            $modelData = CEntity::convertToModelData($parsedBody);
            
            foreach ($modelData as $modelName => $entityDataToSearch) {
                $entity = new CEntity($modelName, $bindingMap, $entityDataToSearch);
    
                $entitiesData[] = $entity->getDataForJson();
                $bindingMap = $entity->getNewBindingMap();
            }
            
            $responseData = ['isSuccess' => true, 'data' => $entitiesData];
        } catch (Exception $e) {
            $responseData = ['isSuccess' => false, 'msg' => $e->getMessage()];
            $status = 404;
        }
        
        return $response->withJson($responseData, $status, JSON_UNESCAPED_UNICODE);
    });
    
    $app->run();