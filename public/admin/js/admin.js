/**
 * Created by jianxun on 2015/6/3.
 */
$(function () {
    $("#createMenu").click(function () {
        var menuName = $("#menuName").val();
        if (!menuName) {
            alert("菜单名字不能为空..");
            return;
        }
        $.get("/api/createMenu", {
                type: "click", menuName: menuName, R: Math.random()
            },
            function (data) {
                if(data && data.ok){
                    alert("创建成功..");
                }else{
                    alert("创建失败..")
                }
            });
    });
})
;
