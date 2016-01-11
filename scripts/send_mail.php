<?php
    error_reporting(0);
    include('/home/hdeldkaw/php/Mail.php');
    use \stdClass;

    $recipients = 'petriadrian@gmail.com';

    $headers['From'] = 'casaPetriWebSite@casapetrirosiamontana.ro';
    $headers['To'] = 'petriadrian@gmail.com';
    $headers['Subject'] = 'Casa Petri';
    $headers['MIME-Version'] = '1.0';
    $headers['Content-Type'] = 'text/html; charset=ISO-8859-1';

    $body = '';
    foreach ($_POST as $key => $value) {
        $body .= htmlspecialchars($key) . " = " . htmlspecialchars($value) . "<br>";
    }

    $mail =& Mail::factory('sendmail');

    $result = $mail->send($recipients, $headers, $body);

    $ret = new stdClass();
    if($result) {
        $ret->success = true;
    }
    else {
        $ret->success = false;
    }
    echo json_encode($ret);
