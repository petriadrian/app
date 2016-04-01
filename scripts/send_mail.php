<?php
    include('/home/hdeldkaw/php/Mail.php');

    $recipients = ' petri_adrian@yahoo.com';

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

if (PEAR::isError($mail)) {
    echo $_GET['callback'] .json_encode($mail->getMessage()) . "\n" . json_encode($mail->getUserInfo());
}

