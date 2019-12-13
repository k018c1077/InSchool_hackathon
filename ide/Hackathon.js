function modal_show(text) {
    $("#message").html(text+'<div style="text-align:center"><input type="button" value="閉じる" onclick="modal_hide()"></div>')
    $(".wrapper").css('opacity',"0.3")
    $(".modal").fadeIn("0.3s").css('display','flex')
    

};
function modal_hide() {
    $(".wrapper").css('opacity',"1")
    $(".modal").fadeOut("0.3s")

};
function copyrights() {
    modal_show('Developed by Yukito Azuma<br><span style="font-size:2px">dependencies</span><ul><li>jquery ver 3.4.1</li><li>Ace.js editor</li><li>jquery.cookie.js</li></ul>')

 }
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
        $("#preview").html(html_editor.getSession().getValue())
        $("#custom_css").html(css_editor.getSession().getValue())


        modal_show("ロードに成功しました。")
        
    }

    setInterval(() => {
        let temp = html_editor.getSession().getValue()
        if (modified != temp) { 
            modified = temp
            var temp_class = document.querySelector("#html_code").getAttribute("class")
            if (/ace_focus/.test(temp_class)) {
            setTimeout(() => {
                $("#preview").html(modified)
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
        var code = editor.getSession().getValue()
        try {
            eval(code)
        } catch (error) {
            var now = new Date()

            $("#normal_output").append($('<li style="background-color:rgba(255,0,0,40)">' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "|" + error + '</li>'))
            error_logs.push(error)
        }

        //log_backup(logs)
    }
    var get_log = () => {
        return (logs)
    }
    $("#save_to_file")[0].onclick = () => {
        var show_html = "<h2>ダウンロード</h2>"
        show_html += ('<a id="html_data" href="#">HTMLダウンロード</a><br>')
        show_html += ('<a id="js_data" href="#">jsダウンロード</a><br>')
        show_html += ('<a id="css_data" href="#">cssダウンロード</a><br>')
        modal_show(show_html)
        var blob = new Blob([html_editor.getSession().getValue()], { "type": "text/html" })
        $("#html_data")[0].href = window.URL.createObjectURL(blob)
        blob = new Blob([css_editor.getSession().getValue()], { "type": "text/css" })
        $("#css_data")[0].href = window.URL.createObjectURL(blob)
        blob = new Blob([editor.getSession().getValue()], { "type": "text/javascript" })
        $("#js_data")[0].href = window.URL.createObjectURL(blob)
    }
    $("#load_file")[0].onclick = () => {
        var show_html = "<h2>ファイル読み込み</h2>"
        show_html += "<table>"

        show_html += "<tr>"
        show_html += "<td>html</td>"
        show_html += '<td><input type="file" id="html" name="html></td>'
        show_html += "</tr>"

        show_html += "<tr>"
        show_html += "<td>css</td>"
        show_html += '<td><input type="file" id="css" name="css"></td>'
        show_html += "</tr>"

        show_html += "<tr>"
        show_html += "<td>js</td>"
        show_html += '<td><input type="file" id="js" name="js"></td>'
        show_html += "</tr>"
        show_html += "</table>"

        show_html += '<div style="text-align:center"><input type="button" id="start_loading" value="読み込み"></div>'
        modal_show(show_html)
        $("#start_loading")[0].onclick = () => {
            var reader = new FileReader();
            $("#").file
            reader.onload = function() {
                var img = document.createElement('img');
                img.src = reader.result;
                result.appendChild(img);
            }

        }
    }

}