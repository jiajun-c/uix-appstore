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

- [ ] 点击服务器后可以进入到服务器的详细界面，界面上需要显示发行版类型，ip, CPU， GPU类型， 硬盘，cpu使用情况，可以参考下面的腾讯云，页面先在幕刀上进行设计，注意美观。

![image.png](https://s2.loli.net/2022/10/15/tLTHF9qXcvDJGwB.png)

ddl: 10:20


点击登录后出现一个webshell，远程操作服务器，参考腾讯云

![image.png](https://s2.loli.net/2022/10/15/dLafs2ozI79vpQN.png)
ddl: 10:24


### ME

- [ ] 实现开发者界面，开发者可以上传自己的软件包（使用PKGBUILD方式），需要将软件包上传到远程服务器
ddl：10:20

- [ ] 开发后端，处理开发者上传的软件包, 同时将软件包加载到可搜索的源中，可以被搜索到
ddl：10:25


## 3. 已经实现的模块
- 个人界面
- 下载界面
- about界面
- 登录界面
- 注册界面
- 主界面