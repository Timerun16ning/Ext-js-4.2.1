/*
2015-12-22
linhik
http://www.linhik.com
修改
加入对主题CSS和JS的引入功能
path生成时遇到多个同名文件是的BUG
开发模式确定方式以及主题确定方式
加入语言lang=zh_CN
引用方式：/library/extjs/bootstrap.js?debug&rtl&theme=classic&lang=zh_CN
*/
(function () {
    var dev = false;
    var rtl = false;
    var path = '';
    var url = "";

    var i = 0;//循环索引
    var length;//循环数组长度

    //获取当前页面的地址查询参数字符串
    var queryString = window.location.search;

    //【path】【url】
    //定位EXTJS4.2.1的启动文件的全路径，同时取到启动文件所在文件夹的路径【path】和bootstrap的地址【url】
    var scripts = document.getElementsByTagName('script');
    for (i = 0, length = scripts.length; i < length; i++) {
        var scriptSrc = scripts[i].src;
        var match_bootstrap = scriptSrc.match(/library\/ExtJS\/4\.2\.1\/bootstrap\.js/);

        if (match_bootstrap) {
            var match = scriptSrc.match(/bootstrap\.js/);
            path = scriptSrc.substring(0, match.index);
            url = scriptSrc;
            break;
        }
    }

    //dev
    {
        if (queryString.match('(\\?|&)debug') !== null) {
            dev = true;
        }
    }

    //rtl
    {
        var index = url.indexOf('?');
        var bootstrapQueryString = url.substr(index);
        if (bootstrapQueryString.match("(\\?|&)rtl") !== null) {
            rtl = true;
        }
    }

    //库JS
    document.write('<script type="text/javascript" charset="UTF-8" src="' + path + 'ext-all' + (rtl ? '-rtl' : '') + (dev ? '-dev' : '') + '.js"></script>');


    //主题
    var theme = null;
    if (theme === null) {
        var reg = new RegExp("(^|&)theme=([^&]*)(&|$)");
        var index = url.indexOf('?');
        if (index !== -1) {
            var bootstrapQueryString = url.substr(index);
            var r = bootstrapQueryString.substr(1).match(reg);
            if (r != null) {
                theme = r[2]
            }
        }
    }
    //默认主题
    if (theme === null) {
        theme = "classic"
    }
    if (theme.toLowerCase() !== "none") {
        //主题
        var oCss = document.createElement("link");
        oCss.setAttribute("rel", "stylesheet");
        oCss.setAttribute("type", "text/css");
        oCss.setAttribute("href", path + 'resources/css/ext-all-' + theme + (rtl ? '-rtl' : '') + (dev ? '-debug' : '') + '.css');
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(oCss);
        //主题JS
        document.write('<script type="text/javascript" charset="UTF-8" src="' + path + 'ext-theme-' + theme + '.js' + '"></script>');
    }

    //语言
    var lang = null;
    if (lang === null) {
        var reg = new RegExp("(^|&)lang=([^&]*)(&|$)");
        var index = url.indexOf('?');
        if (index !== -1) {
            var bootstrapQueryString = url.substr(index);
            var r = bootstrapQueryString.substr(1).match(reg);
            if (r != null) {
                lang = r[2]
            }
        }
        if (lang !== null) {
            document.write('<script type="text/javascript" charset="UTF-8" src="' + path + 'locale/ext-lang-' + lang + '.js' + '"></script>');
        }
    }
})();

