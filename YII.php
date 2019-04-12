<?

################ YII ################

// file: .htaccess:
RewriteEngine on

#hide files and folders
RedirectMatch 404 /\.git
RedirectMatch 404 /composer\.
RedirectMatch 404 /.bowerrc

RewriteCond %{SERVER_PORT} ^80$
RewriteRule ^(.*)$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R]
RewriteCond %{HTTP_HOST} ^www\.(.*) [NC]
RewriteCond ^(.*)$ https://%1/$1 [R=301,L]
# If a directory or a file exists, use request directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Otherwise forward the request to index.php

RewriteRule . index.php


