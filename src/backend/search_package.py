from asyncore import write
from dis import disco
import json

# path = 

f = open("data/temp")
# line = f.readline()
line = f.readline() # 跳过第一行
dicts = []
while line:
    strings = line.split(' ')
    # for i in strings:
    #     print(i)
    # print(strings[0])
    if len(strings[0]) > 0:
        details = strings[0].split('/')
        # print(details)
        dicts.append({"from": details[0], "software": details[1]})
    line = f.readline()
print(dicts)
dicts = json.dumps(dicts)
print(dicts)
f.close()
w = open("data/aur_packages.json", 'w')
w.write(dicts)
