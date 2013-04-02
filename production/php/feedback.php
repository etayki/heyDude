<?php

  $email_to = "etayluz@gmail.com";
  $email_subject = "New Feedback";
   
  $email_from = "etayluz@gmail.com";
  $email_message = $_POST['message'];
     
     
  // create email headers
  $headers = 'From: '.$email_from."\r\n".
  'Reply-To: '.$email_from."\r\n" .
  'X-Mailer: PHP/' . phpversion();
  
  // send email
    @mail($email_to, $email_subject, $email_message, $headers);
  

?>