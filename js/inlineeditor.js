$(document).ready(function(){

    //Find all editable instances
    var editables = $("[data-pw-inline='true']");

    //Attach a red border to indicate that an area is editable
    editables.addClass("inline-editor-pw-module-editable");

    var edit = $(document.createElement("img"));
    //Add event handler to it so that clicking the image will make the editable..editable!

    edit.attr("src","./site/modules/InlineEditor/images/pw-inlineeditor-edit.png");
    edit.attr("title","This area is editable. Click to edit, click off to save.");

    //Set up a div that tells the user what parts are editable
    var div = $(document.createElement("div"));
    div.append(edit);
    div.append("<em> Editable</em>");
    //editables.before(div);

    //Get the url that we should post the AJAX requests to
    var post_url = $("#inline-editor-pw-module-url").text();


    //Setup the functions for the bottom bar

    /**
     * When the close / logout button is clicked, send a request to log the user out
     * and then refresh the page
     */
    $('#inline-editor-pw-module-close').click(function(){


        $.get($(this).attr("href"),function(){
            document.location.reload(true);
        });

        return false;
    });


    /**
     * Save the page when the CKEditor loses focus.
     * Show the result on the editor bar
     */
    editables.on('blur',function(){
        var current_element = $(this);


        var data = {
            page_id : current_element.data("page-id"),
            field_name: current_element.data("field-name"),
            data: current_element.html()
        };

        $.post(post_url,data,function(result){
            var status = $('#inline-editor-pw-module-status');
            if(result.status == "ok"){
                status.removeClass();
                status.addClass("inline-editor-pw-module-success");
                status.text("Section "+data.field_name+" successfully saved");
            }
            else{
                status.removeClass();
                status.addClass("inline-editor-pw-module-failed");
                status.text("Section "+data.field_name+" save failure!");
            }

            status.css("opacity",1);

            setTimeout(function() {
                status.animate({"opacity": 0});
            }, 2000);

        },"json");
    });


});
