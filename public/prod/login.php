<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
/**
* Encrypt value to a cryptojs compatiable json encoding string
*
* @param mixed $passphrase
* @param mixed $value
* @return string
*/
function cryptoJsAesEncrypt($passphrase, $value){
  $salt = openssl_random_pseudo_bytes(8);
  $salted = '';
  $dx = '';
  while (strlen($salted) < 48) {
      $dx = md5($dx.$passphrase.$salt, true);
      $salted .= $dx;
  }
  $key = substr($salted, 0, 32);
  $iv  = substr($salted, 32,16);
  $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
  $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
  return json_encode($data);
}
if ($USER->IsAuthorized()and($USER->GetSessionHash())) $USER->Authorize($USER->GetID(), true);
if ($USER->GetID() == 311) {
print_r("Вы вошли под постановщиком задач");
} else {
$json = array('name'=>$USER->GetParam('LOGIN'), 'token'=>$USER->GetSessionHash());
$hash = hash('sha512','Irjlf123!');
$token = base64_encode(cryptoJsAesEncrypt($hash,$json));
header('Location: http://localhost:11711/login?token='.$token);
}
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");
?>