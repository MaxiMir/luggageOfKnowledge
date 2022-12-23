<?php

    declare(strict_types=1); # включение строгой типизации

    namespace app\web;

    /**
     * Class DIContainer
     *
     * @package liw\web
     */
    class DIContainer
    {
        public $name = 'liw';
        /**
         * @var \stdClass
         */
        private $_components;
        private $_classes;

        /**
         * DIContainer constructor.
         *
         * @param array $config
         *
         * @return void
         */
        public function __construct(array $config = [])
        {
            $this->_components = new \stdClass();
            $this->setCoreClasses();
        }

        public function __get($className)
        {
            if (isset($this->_components->{$className})) {
                return $this->_components->{$className};
            }

            if (!class_exists($className) && !class_exists(($className = $this->name . '\\' . $className))) {
                throw new \Exception("Component $className not found!");
            }

            if (method_exists($className, '__construct') !== false) {
                $refMethod = new \ReflectionMethod($className, '__construct');
                $params = $refMethod->getParameters();
                $re_args = [];

                foreach ($params as $key => $param) {
                    if ($param->isDefaultValueAvailable()) {
                        $re_args[$param->name] = $param->getDefaultValue();
                    } else {
                        $class = $param->getClass();
                        if ($class !== null) {
                            $re_args[$param->name] = $this->{$class->name};
                        } else {
                            throw new \Exception("Not found {$class->name} in container");
                        }
                    }
                }

                $refClass = new \ReflectionClass($className);
                $class_instance = $refClass->newInstanceArgs((array)$re_args);
            } else {
                $class_instance = new $className();
            }

            return $this->_components->{$className} = $class_instance;
        }

        public function getCoreClasses()
        {
            return [
                'Request' => \Symfony\Component\HttpFoundation\Request::class,
                'Response' => \Symfony\Component\HttpFoundation\Response::class,
                'Controller' => \liw\Controller::class,
            ];
        }

        protected function setCoreClasses($components = [])
        {
            return $this->_classes = (object)array_merge($this->getCoreClasses(), $components);
        }
    }