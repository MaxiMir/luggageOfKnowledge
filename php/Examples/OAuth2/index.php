<?php

  define('OAUTH2_CLIENT_ID', '');
  define('OAUTH2_CLIENT_SECRET', '');

  $authorizeURL = 'https://github.com/login/oauth/authorize';
  $tokenURL = 'https://github.com/login/oauth/access_token';
  $apiURLBase = 'https://api.github.com/';

  session_start();

  // Start the login process by sending the user to Github's authorization page
  if (get('action') == 'login') {
    // Generate a random hash and store in the session for security
    $_SESSION['state'] = hash('sha256', microtime(true) . rand() . $_SERVER['REMOTE_ADDR']);
    unset($_SESSION['access_token']);

    $params = [
      'client_id' => OAUTH2_CLIENT_ID,
      'redirect_uri' => 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'],
      'scope' => 'user',
      'state' => $_SESSION['state'],
    ];

    // Redirect the user to Github's authorization page
    header('Location: ' . $authorizeURL . '?' . http_build_query($params));
    die();
  }

  // When Github redirects the user back here, there will be a "code" and "state" parameter in the query string
  if (get('code')) {
    // Verify the state matches our stored state
    if (!get('state') || $_SESSION['state'] != get('state')) {
      header('Location: ' . $_SERVER['PHP_SELF']);
      die();
    }

    // Exchange the auth code for a token
    $token = apiRequest($tokenURL, [
      'client_id' => OAUTH2_CLIENT_ID,
      'client_secret' => OAUTH2_CLIENT_SECRET,
      'redirect_uri' => 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'],
      'state' => $_SESSION['state'],
      'code' => get('code'),
    ]);
    $_SESSION['access_token'] = $token->access_token;

    header('Location: ' . $_SERVER['PHP_SELF']);
  }

  if (session('access_token')) {
    $user = apiRequest($apiURLBase . 'user');

    echo '<h3>Logged In</h3>';
    echo '<h4>' . $user->name . '</h4>';
    echo '<pre>';
    print_r($user);
    echo '</pre>';

  } else {
    echo '<h3>Not logged in</h3>';
    echo '<p><a href="?action=login">Log In</a></p>';
  }


  function apiRequest($url, $post = false, $headers = [])
  {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    if ($post) {
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
    }

    $headers[] = 'Accept: application/json';

    if (session('access_token')) {
      $headers[] = 'Authorization: Bearer ' . session('access_token');
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);

    return json_decode($response);
  }

  function get($key, $default = null)
  {
    return array_key_exists($key, $_GET) ? $_GET[$key] : $default;
  }

  function session($key, $default = null)
  {
    return array_key_exists($key, $_SESSION) ? $_SESSION[$key] : $default;
  }
