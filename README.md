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
