fis与php结合，加一个极小极小的amd框架
===========================

> 适合中小型项目

## 环境依赖：

1. fis
1. php-cgi
1. java

## 运行方法：

1. 启动内置服务器
    * fis server start
1. 进入项目目录
    * cd project
1. 构建项目
    * 预览开发效果命令： ``fis release``
    * 预览开发效果，并监听文件变化命令： ``fis release -w``
    * 预览开发效果，并监听文件变化，同时自动刷新浏览器命令：``fis release -wL``
    * 预览文件压缩，加域名，资源合并，csssprite等效果，并监听文件变化，同时自动刷新浏览器命令：``fis release -oDpwL``
1. 刷新页面（ http://127.0.0.1:8080/ ），查看效果

> ps: 如果你本地没有cgi环境，请在执行fis release命令时增加额外的 ``-d path/to/apache/htdocs`` 把项目部署到支持php的服务器``根目录``下，也能看到效果。

## 目录说明：

* mod目录下放模块化文件
* page目录下放php页面文件
* fis-conf.js 文件是项目配置
* index.php 文件是入口php
* Resource.class.php 是静态资源管理框架

## php页面示例

### 代码

```php
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>my page</title>
    
    <?php css(); ?> <!-- 在这里输出link标签 -->
    
    <?php import('lib/amd.js'); ?> <!-- 收集资源 -->
    <?php import('lib/jquery-1.11.1.js'); ?> <!-- 收集资源 -->
    <?php import('lib/reset.css'); ?> <!-- 收集资源 -->

</head>
<body>
    <!-- widget header -->
    <?php include 'header.php'; ?>
    
    <!-- content -->
    <div class="foo">hello fis.</div>
    
    <!-- widget footer -->
    <?php include 'footer.php'; ?>
    
    <?php js(); ?> <!-- 在这里输出script标签 -->
    
    <?php import('mod/foo.js');?> <!-- 收集资源 -->
    <script type="text/javascript">
        //使用模块mod/foo.js
        define(function(require){
            var foo = require('mod/foo.js');
            foo('.foo', 'red');
        });
    </script>
</body>
</html>
```

### api说明

* import($id) : 引用一个资源文件，可以是js、css文件
* css() : 在调用该函数的位置，将 ``import($id)`` 函数收集到的css资源，以``<link href="xxx">``标签的形式输出
* js() : 在调用该函数的位置，将 ``import($id)`` 函数收集到的js资源，以``<script src="xxx">``标签的形式输出

## 配置说明

```javascript
//定义开发规范
fis.config.set('roadmap.path', [
    {
        //mod下的js文件
        reg : /^\/mod\/(.*)\.js$/,
        //是模块化文件，会包裹define(id, xxx)
        isMod : true,
        //发布到/static/mod/xxx目录下
        release : '/static/mod/$&'
    },
    {
        //其他的js文件
        reg : '**.js',
        //发布到/static/xxx目录下
        release : '/static/$&'
    },
    {
        //所有的css文件
        reg : '**.css',
        //发布到/static/xxx目录下
        release : '/static/$&'
    },
    {
        //readme.md文件不发布
        reg : /\/readme\.md$/i,
        release : false
    }
]);

//插件给isMod为true的js文件包裹define
fis.config.set('modules.postprocessor.js', function(content, file){
    if(file.isMod){
        content = 'define("' + file.getId() + '", function(require, exports, module){'
                      + content +
                  '});';
    }
    return content;
});

//添加域名
fis.config.set('roadmap.domain', {
    //所有js文件添加http://127.0.0.1:8080作为域名
    '**.js' : 'http://127.0.0.1:8080',
    //所有css文件添加http://localhost:8080作为域名
    '**.css' : 'http://localhost:8080'
});

//打包配置
fis.config.set('pack', {
    //lib目录的文件按序合并成一个lib.js文件
    'pkg/lib.js': [ 'lib/amd.js', 'lib/jquery-1.11.1.js' ],
    //mod目录下的所有js文件合并成一个mod.js
    'pkg/mod.js': 'mod/**.js',
    //其他js文件合成一个others.js
    'pkg/others.js': '**.js',
    //所有css文件合并成一个main.css文件
    'pkg/main.css': '**.css'
});
```
