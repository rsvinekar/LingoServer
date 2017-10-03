<?php
header('Content-Type: application/json');
$file_handle = fopen("charmatrix.csv", "r");
$top_line=fgetcsv($file_handle, 1024);
while (!feof($file_handle) ) {
	$counter=0;
	$line_of_text = fgetcsv($file_handle, 1024);
	foreach ( $top_line as &$script ){
		$csv[$script][]=$line_of_text[$counter++];
	}
}
fclose($file_handle);
echo json_encode($csv);
?>
