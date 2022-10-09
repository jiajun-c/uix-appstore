# uix-appstore

`node_modules`文件夹在`.gitignore`被记录，在本地保存即可，无需上传git

## 1. 项目结构 
```c
├── package.json
├── package-lock.json
├── public
├── README.md
└── src
    ├── css
    ├── html 
    ├── img
    └── js

```

## 2. 需求

### You
- [ ] 在aur链接部分添加一个返回上一级页面的按钮，可以用栈实现。 ddl: 10.4 check
- [ ] 用户只需要登录一次, 在`config/user.json`中存放用户的信息 ddl: 10.5 check
- [ ] 编写`html/servers.html`，在其中显示了我们连接的服务器的情况(可以使用ssh 连接)
![image.png](https://s2.loli.net/2022/09/29/Yrf8kRuK5dqp6iA.png)
页面布局如上，每个框对应一个服务器
每个框中应该显示
```shell
os: linux发行版类型
Host: 主机信息
ip: ip地址
Disk usage: 物理内存使用情况
connection status：连接状态
connect: 这是个按钮，进行ssh连接
```
布局可以参考cloud.tencent 
![image.png](https://s2.loli.net/2022/09/29/CPzqlvLxBf2rsye.png)
ddl : 10.15
初始情况下没有框，需要有根据ip，user, passwd连接服务器，连接后获取服务器其他信息。

### ME
- [ ] 开发download部分
1. 调用archlinux api 进行软件包的查询，获取到json文件，对结果进行解析后存储到本地
2. 实现本机和服务器的切换，在下载软件包的时候可以为本机/服务器下载(计划使用ssh进行登录)，下载计划调用`shell script`进行实现。
3. 实现动态前端页面进行机器的切换，尽量实现按钮点击特效。
ddl: 10.15

- [ ]开发搜索引擎
根据关键字对软件包进行查找，随后进行上面的操作
ddl: 10.18


## 3. 已经实现的模块
- 实现了主页，同时可以进行正常的跳转
![image.png](https://s2.loli.net/2022/09/26/BXwbLAPav8i13cK.png)

- 实现了个人中心，可以正常返回主页面

- 实现登录界面

在服务器上的数据库 
```shell
MySQL [app_user]> desc user;
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| uid      | int(11)     | NO   | PRI | NULL    | auto_increment |
| username | varchar(30) | NO   |     | NULL    |                |
| passwd   | varchar(20) | NO   |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```

要求：登录成功后跳转到主页面(`src/html/index.html`)，失败给出红色字体提示。

效果图类似，但是需要添加注册功能，直接输入帐号名，两次相同的密码即可注册。
![image.png](https://s2.loli.net/2022/09/23/hZDwiPqJndYQ6mk.png)

- 实现aur链接模块

主页上面的aur链接需要跳转到到一个单独的html，在这个页面中需要内嵌下面的页面，同时可以返回到原来的界面，所以不能使用简单连接跳转了事。
```shell
https://aur.archlinux.org/
```
可以参考我写的个人中心界面，不要简单的复制粘贴.....
![image.png](https://s2.loli.net/2022/09/26/nS6qEWd2fcY3GUr.png)

- 实现页面上的查找功能和结果显示
![image.png](https://s2.loli.net/2022/10/02/Wz3P9nOykYKRrt5.png)


- 实现将结果插入到html代码中
![image.png](https://s2.loli.net/2022/10/03/YWQfMKi4s7JEetv.png)