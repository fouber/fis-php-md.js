<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>my page</title>
    
    <?php css(); ?> <!-- 在这里输出link标签 -->
    
    <?php import('lib/md.js'); ?> <!-- 收集资源 -->
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
