<?php

  $email_to = "etayluz@gmail.com";
  $email_subject = "New Feedback";
   
  
  $email_from = $_POST['email'];
  
  $email_message .= "Email: ".clean_string($email_from)."\n";
   
     
  // create email headers
  $headers = 'From: '.$email_from."\r\n".
  'Reply-To: '.$email_from."\r\n" .
  'X-Mailer: PHP/' . phpversion();
  
  // send email
  @mail($email_to, $email_subject, $email_message, $headers);  

?>