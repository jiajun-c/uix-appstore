import json
from pdb import line_prefix
import readline
import string

f = open("data/temp")

dicts = []
line = f.readline()
while line:
    strings = line.split(' ')
    print(strings)
    temp = strings[0][6:]
    dicts.append({"name": temp, "version": strings[1].replace('\n','')})
    line = f.readline()
    line = f.readline()
dicts = json.dumps(dicts)
f.close()
w = open("data/local_package.json", 'w')
w.write(dicts)