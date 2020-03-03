<?php
    
    // FILE: /protected/components/SubDomainManager.php
    
    
    class SubDomainManager extends CComponent
    {
        const TABLE_SUBDOMAINS = '{{subdomains}}';
        private $mskURL = "https://skladnichok.ru";
        private $mskStartHostName = ['www', 'skladnichok'];
        private $cityData;
        
        public function __construct()
        {
            $session = $this->initSession();
            $this->saveSubDomainURL();
            
            $subDomainDataFromSession = $this->getSubDomainDataFromSession($session);
            $isNeedToCheckCity = !is_null($subDomainDataFromSession) ? true : $subDomainDataFromSession['url'] != $this->cityData['url'];
            $subDomainDataFromDB = null;
            
            if ($isNeedToCheckCity) {
                $subDomainDataFromDB = $this->getSubDomainDataFromDB();
                
                if (!$subDomainDataFromDB) {
                    $this->redirectToMsk();
                }
                
                $this->setSubDomainDataInSession($session, $subDomainDataFromDB);
            }
            
            $this->cityData = $subDomainDataFromSession ? $subDomainDataFromSession : $subDomainDataFromDB;
        }
        
        private function saveSubDomainURL()
        {
            list($url) = explode('.', $_SERVER['HTTP_HOST']);
            
            $this->cityData['url'] = in_array($url, $this->mskStartHostName) ? 'www' : $url;
        }
        
        private function initSession()
        {
            $session = new CHttpSession;
            $session->open();
            
            return $session;
        }
        
        private function getSubDomainDataFromSession($session)
        {
            return $session['subdomain'];
        }
        
        private function setSubDomainDataInSession($session, $subDomainData)
        {
            $session['subdomain'] = $subDomainData;
        }
        
        private function getSubDomainDataFromDB()
        {
            $command = Yii::app()->db->createCommand();
            
            return $command->select('id, name, url, city, phone, scity, sphone, address, mini_mode, full_mode, map,
			   town_in, town_genitive, town_accusative, town_dative, town_instrumental, visible')
                ->from(self::TABLE_SUBDOMAINS)
                ->andWhere('url=:url', [':url' => $this->cityData['url']])
                ->andWhere('visible = 1')
                ->queryRow();
        }
        
        private function redirectToMsk()
        {
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: '.$this->mskURL);
        }
        
        public function getCityData()
        {
            return $this->cityData;
        }
    }