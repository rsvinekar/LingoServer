import json
import csv

def execute(pagename, request):
    csvfile=open('./wiki/data/plugin/action/test.csv','r')
    reader = csv.DictReader(csvfile)
    request.write("<meta charset=\"UTF-8\">")
    request.write(json.dumps([r for r in reader],sort_keys=True))
 
        