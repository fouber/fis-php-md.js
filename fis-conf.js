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