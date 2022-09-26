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
- [ ] 实现登录界面

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

- [ ] 

主页上面的aur链接需要跳转到到一个单独的html，在这个页面中需要内嵌下面的页面，同时可以返回到原来的界面，所以不能使用简单连接跳转了事。
```shell
https://aur.archlinux.org/
```
可以参考我写的个人中心界面，不要简单的复制粘贴.....

![image.png](https://s2.loli.net/2022/09/26/nS6qEWd2fcY3GUr.png)

## 3. 已经实现的模块
- 实现了主页，同时可以进行正常的跳转
![image.png](https://s2.loli.net/2022/09/26/BXwbLAPav8i13cK.png)

- 实现了个人中心，可以正常返回主页面
