/* BootGitStrap.js 
 *  Loads the index.html with the appropriate tags and downloads the required
 *  javascript and css.
 */

/* GITSTRAP VERSION -------------------------------------------------------- */
/* This will change the url string to point to the selected version of
 * GitStrap. The version
 */
var gs_version = ''

var gs_theme_url = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css";

function add_style(url) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    head.appendChild(link);
}

/* HEAD TAG ---------------------------------------------------------------- */
var gs_html_head_tag = ' \
    <meta charset="utf-8"> \
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> \
    <meta name="viewport" content="width=device-width, initial-scale=1">';

/* BODY TAG ---------------------------------------------------------------- */
var gs_html_body_tag = ' \
 \
<!-- GitHub ribbon --> \
<a href="https://github.com/nckz/GitStrap"><img style="display: none; position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" id="gs_ribbon_id"></a> \
 \
<title id="gs_title_id">GitStrap</title> \
 \
<div class="container"> <!-- all page content --> \
    <!-- Navigation --> \
    <nav class="navbar"> \
        <div class="container-fluid"> \
            <div class="navbar-header"> \
                <button type="button" class="navbar-toggle" type="button" \
                    data-toggle="collapse" \
                    data-target="#gs_navbar_id"> \
                    &#9776; \
                </button> \
                <h2 class="text-muted" id="gs_nav_title_id">GitStrap</h2> \
            </div><!-- navbar-header --> \
            <div class="collapse navbar-collapse navbar-right" id="gs_navbar_id"> \
                <ul class="nav navbar-nav" id="gs_nav_placeholder_id"></ul> \
            </div> \
        </div><!-- container-fluid --> \
    </nav> \
    <!-- Error --> \
    <div class="jumbotron" id="gs_error_id" style="display: none; color: red;"></div> \
    <!-- Running Header --> \
    <div class="jumbotron" id="gs_header_id" style="display: none;"></div> \
    <!-- Markdown Content --> \
    <div id="gs_body_id"> </div> \
    <!-- Running Footer--> \
    <hr> \
    <footer class="footer text-center" id="gs_footer_id" style="display: none;"> \
    </footer> \
</div> <!-- /container --> \
<!-- GitStrip.js --> \
<script src="js/gitstrap.js"></script> ';

/* HELPER FUNCTIONS -------------------------------------------------------- */
function getScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // most browsers
    script.onload = callback;
    // IE 6 & 7
    script.onreadystatechange = function() {
        if (this.readyState == 'complete') {
            callback();
        }
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

function loadAndExecuteScripts(aryScriptUrls, index, callback) {
    getScript(aryScriptUrls[index], function () {
        if(index + 1 <= aryScriptUrls.length - 1) {
            loadAndExecuteScripts(aryScriptUrls, index + 1, callback);
        } else {
            if(callback)
                callback();
        }
    });
}

/* MAIN -------------------------------------------------------------------- */
/* Insert the html head and body tags, load the default bootstrap and gitstrap
 * css then the javascripts. */
window.onload = function() {

    if (document.head == null) { // IE 8
        alert("You must update your browser to view this website.");
    }

    document.head.innerHTML = gs_html_head_tag;
    add_style(gs_theme_url);
    document.body.innerHTML = gs_html_body_tag;

    /* js */
    var jquery = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js";
    var bootstrap = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js";
    var showdown  = "https://cdn.rawgit.com/showdownjs/showdown/1.3.0/dist/showdown.min.js";

    /* served from a specific github commit */
    var jsyaml    = "https://cdn.rawgit.com/nckz/GitStrap/fa12906d40aac6596f8d7601fddf7b21dc9b47a3/js/js-yaml-front-client.min.js"
    var jsyaml_map = "https://cdn.rawgit.com/nckz/GitStrap/fa12906d40aac6596f8d7601fddf7b21dc9b47a3/js/js-yaml-front-client.min.js.map"
    //var jsyaml    = "js/js-yaml-front-client.min.js"; /* local copy */
  
    /* development url */
    //var gitstrap = "https://cdn.rawgit.com/nckz/GitStrap/gh-pages/js/gitstrap.min.js";
    var gitstrap  = "js/gitstrap.js"; /* local copy */

    /* load js synchronously */
    var scripts = [jquery, bootstrap, showdown, jsyaml, gitstrap];
    loadAndExecuteScripts(scripts, 0, function () {} );
}
