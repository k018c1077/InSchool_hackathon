function modal_show(text) {
    $("#message").html(text)
    $(".wrapper").css('opacity',"0.3")
    $(".modal").fadeIn("0.3s").css('display','flex')
    

};
function modal_hide() {
    $(".wrapper").css('opacity',"1")
    $(".modal").fadeOut("0.3s")

};

window.onload = function () {
    var grobal_variables = []

    var editor = ace.edit("code");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
    editor.setTheme("ace/theme/monokai")
    editor.getSession().setMode("ace/mode/javascript")
    
    require("ace/ext/emmet")
    var html_editor = ace.edit("html_code");
    html_editor.setTheme("ace/theme/monokai")
    html_editor.getSession().setMode("ace/mode/html")
    html_editor.getSession().setUseWrapMode(true);
    html_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableEmmet: true
    });

    var css_editor = ace.edit("css_code");
    css_editor.setTheme("ace/theme/monokai")
    css_editor.getSession().setMode("ace/mode/css")
    css_editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableEmmet: true
    });
    let log_backup = console.log
    var logs = []
    var error_logs = []
    var set_grobal = (key, value) => {
        grobal_variables[key] = value
    }
    var get_grobal = (key) => {
        return grobal_variables[key]
    }
    var modified = ""
    var waiting = 0;

    $("#save")[0].onclick = () => { 
        $.cookie("html", html_editor.getSession().getValue(), { expires: 7 })
        $.cookie("js", editor.getSession().getValue(), { expires: 7 })
        $.cookie("css", css_editor.getSession().getValue(), { expires: 7 })
        modal_show("保存に成功しました。")

    }
    $("#load")[0].onclick = () => { 
        html_editor.getSession().setValue($.cookie("html"))
        editor.getSession().setValue($.cookie("js"))
        css_editor.getSession().setValue($.cookie("css"))
        modal_show("ロードに成功しました。")
        
    }

    setInterval(() => {
        let temp = html_editor.getSession().getValue()
        if (modified != temp) { 
            modified = temp
            var temp_class = document.querySelector("#html_code").getAttribute("class")
            if (/ace_focus/.test(temp_class)) {
            setTimeout(() => {
                $("#preview").html(modified);
            }, 100)
        }
        }
        
    }, 100)
    
    setInterval(() => {
        var css_class = document.querySelector("#css_code").getAttribute("class")
        if (/ace_focus/.test(css_class)) {
            setTimeout(() => {
                $("#custom_css").html(css_editor.getSession().getValue());
            }, 100)
        }
    }, 100)



    console.log = input => {
        var now = new Date()

        //log_backup(input)
        $("#normal_output").append($('<li>' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "|" + input + '</li>'))
        logs.push(input)

    }
    $("#run")[0].onclick = () => {
        var code = editor.getSession().getValue();
        try {
            eval(code)
        } catch (error) {
            var now = new Date();

            $("#normal_output").append($('<li style="background-color:rgba(255,0,0,40)">' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "|" + error + '</li>'))
            error_logs.push(error)
        }

        //log_backup(logs)
    }
    var get_log = () => {
        return (logs)
    }
}