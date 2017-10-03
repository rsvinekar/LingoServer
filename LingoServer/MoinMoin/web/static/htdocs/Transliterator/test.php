<?php
$array = array(
	"Hindi" => array( "क", "ख", "ग" ),
	"Bangla" => array("ক", "খ", "গ"),
	"Gujarati" => array("ક", "ખ", "ગ"),
	"Gurmukhi" => array("ਕ","ਖ","ਗ")
);
/*$out = array_values($array);		*/
echo json_encode($array);
?>
