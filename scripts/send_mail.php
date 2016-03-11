<?php
    error_reporting(-1);
    ini_set('display_errors', 'On');
    set_error_handler("var_dump");

    include('/home/hdeldkaw/php/Mail.php');

    $recipients = 'petriadrian@gmail.com,petri_adrian@yahoo.com';

    $headers['From'] = 'casapetriwebsite@casapetrirosiamontana.ro';
    $headers['To'] = 'petri_adrian@yahoo.com';
    $headers['Subject'] = 'Casa Petri';
    $headers['MIME-Version'] = '1.0';
    $headers['Content-Type'] = 'text/html; charset=ISO-8859-1';

    $body = '';
    foreach ($_POST as $key => $value) {
        $body .= htmlspecialchars($key) . " = " . htmlspecialchars($value) . "<br>";
    }

    $mail =& Mail::factory('sendmail');

    $result = $mail->send($recipients, $headers, $body);

    echo json_encode($result);
