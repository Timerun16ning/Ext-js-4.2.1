Ext.define('Ext.extend.form.field.HtmlEditor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.extend_htmleditor',
    //自定义配置项
    //TextArea配置项
    areaName: 'html_content',
    //kindeditor配置项
    //文件上传地址
    editorUploadJson: null,
    //文件管理地址
    editorFileManagerJson: null,
    //允许文件管理
    editorAllowFileManager: true,
    //Editor改变大小的模式
    editorResizeType: 0,//0,1,2
    //字体大小列表
    editorFontSizeTable: ['28px', '26px', '24px', '22px', '20px', '18px', '16px', '14px'],
    //允许上传图片
    editorAllowImageUpload: true,
    //样式类型
    editorThemeType: 'default',
    //END
    width: 700,
    height: 300,
    layout: 'fit',
    initComponent: function () {
        var me = this;
        if (me.editorUploadJson == null) {
            throw new Error('The config editorUploadJson is not defined.');
        }
        if (me.editorAllowFileManager == true && me.editorFileManagerJson == null) {
            throw new Error('The config editorFileManageJson is not defined.');
        }
        var textarea = Ext.create('Ext.form.field.TextArea', {
            name: me.areaName,
            listeners: {
                render: function (area, eOpts) {
                    me.editor = KindEditor.create('textarea[name="' + me.areaName + '"]', {
                        uploadJson: me.editorUploadJson,
                        fileManagerJson: me.editorFileManagerJson,
                        allowFileManager: me.editorAllowFileManager,
                        height: me.height,
                        width: me.width,
                        fontSizeTable: me.editorFontSizeTable,
                        resizeType: me.editorResizeType,
                        themeType: me.editorThemeType,
                        allowImageUpload: me.editorAllowImageUpload
                    });
                }
            }
        });
        me.items = textarea;
        me.callParent(arguments);
    },
    //自定义函数
    //获取HTML文本
    getHtml: function () {
        var me = this;
        var editor = me.editor;
        return editor.html();
    },
    //设置HTML文本
    setHtml: function (html) {
        var me = this;
        var editor = me.editor;
        editor.html(html);
    },
    //编辑器是否为空
    isEmpty: function () {
        var me = this;
        var editor = me.editor;
        return editor.isEmpty()
    },
    //清除编辑器内容
    clear: function () {
        var me = this;
        var editor = me.editor;
        editor.html('');
    }
    //END
});