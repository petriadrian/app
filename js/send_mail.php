<?php

    foreach ($_POST as $key => $value)
     echo "Field ".htmlspecialchars($key)." is ".htmlspecialchars($value)."<br>";


?>