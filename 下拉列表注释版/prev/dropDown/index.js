
(function () {
    function DropDown(options) {
        // 添加下拉列表的父级
        this.wrap = options.wrap;
        // 下拉列表中的数据 （数据类型为数组每一项为一个对象该对象内的数据属于一块）
        this.menuList = options.menuList;
        // 下拉列表方向  x为水平方向排列  y为竖直方向排列
        this.direction = options.direction || 'y';
        // 下拉列表整体宽度
        this.dropDownWidth = options.dropDownWidth;
        // 下拉列表每一列的宽度
        this.itemWidth = options.colWidth;
        // 初始化函数
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
        }

    }
    DropDown.prototype.createDom = function() {
        // 创建下拉列表div
        var oDiv = $('<div class="my-dropdown"></div>');
        // 添加列表里面的块级信息即 dl
        this.menuList.forEach(function (menu) {
            var oDl = $('<dl></dl>');
            // 添加title
            if (menu.title) {
                $('<dt>' + menu.title + '</dt>').appendTo(oDl);
            }
            // 添加块级信息里面的数据 即dd
            menu.items.forEach(function (item) {
                $('<dd><a href="' + item.href + '">' + item.name + '</a></dd>').appendTo(oDl);
            });
            // 如果数据里面每一块的菜单都有menuWidth宽度值则将其设置在元素上
            if (menu.menuWidth) {
                oDl.css({
                    width: menu.menuWidth,
                });
            }
            // 如果每块导航里面每个元素都有colWidth值 则将其设置给每个dd
            if (menu.colWidth) {
                oDl.find('dd').css({
                    width: menu.colWidth
                })
            }
            oDiv.append(oDl);
        });
        $(this.wrap).append(oDiv);
    }
    DropDown.prototype.initStyle = function() {
        $(this.wrap).css({
            position: 'relative',
        });
        // 下拉列表样式  设置定位和宽度 
        $('.my-dropdown', this.wrap).css({
            position: 'absolute',
            width: this.dropDownWidth,
            backgroundColor: '#fff',
            border: '1px solid #eee',
            left: 0,
            zIndex: 200,
            display: 'none',
        // 下拉列表每块的边距
        }).find('dl').css({
            overflow: 'hidden',
            padding: '10px 0 10px 15px',
            borderBottom: '1px solid #eee'
        // 设置下拉列表中每一个元素的宽度
        }).find('dt').css({
            fontWeight: 'bold',
        }).end().find('dd').css({
            width: this.itemWidth,
            float: 'left',
            whiteSpace: 'nowrap'
        // 鼠标hover上去文字变色
        }).hover(function () {
            this.color = $(this).css('color')
            $('*', this).css({
                color: 'red'
            })
        }, function () {
            $('*', this).css({
                color: this.color
            })
        });
 
        if (this.direction == 'x') {
            // 水平方向排列下拉列表位置
            $('.my-dropdown', this.wrap).css({
                position: 'absolute',
                right: -84,
                left: 'auto',
                padding: '15px 0'
            }).find('dl').css({
                float: 'left',
                borderRight: '1px solid #eee',
                borderBottom: 'none'
            })
        }

    }
    DropDown.prototype.bindEvent = function() {
        // 鼠标移上去展示下拉列表
        $(this.wrap).hover(function () {
            $(this).css({
                backgroundColor: '#fff'
            });
            $('.my-dropdown', this).show();
        }, function () {
            $(this).css({
                backgroundColor: 'transparent'
            });
            $('.my-dropdown', this).hide();
        })
    }

    
    $.fn.extend({
        addDropdown: function (options) {
            options.wrap = this;
            var obj = new DropDown(options);
            obj.init()
        }
    })
} ())