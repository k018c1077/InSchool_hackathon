$(function () {
    let parsed_data = "";
    $.get("./markdown/Pre-1/Pre-1.md", function (e) { 
        parsed_data = marked(e);
    })
    console.log(parsed_data);
}) 