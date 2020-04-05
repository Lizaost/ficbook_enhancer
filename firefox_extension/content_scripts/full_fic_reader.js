/**
 * Full fic reader styles
 */

let styles = "body{margin:0; padding:0; scroll-behavior: smooth; font-family: sans-serif;} " +
    "#main{" +
    "    background-color: #f6ecda; padding: 0; position:relative; transition: right .5s;" +
    "}" +
    "hr{display:none;}" +
    "#open_fic_contents_div {position: fixed; z-index: 5; right:32px; top:16px; height: 32px; " +
    "opacity: 0.2; transition: right 0.5s;}" +
    "#open_fic_contents_div img {height:100%; width:auto;}" +
    "#open_fic_contents_div:hover {opacity:1.0;}" +
    "#fic_header{background-color: #faf4ea; padding: 10px 20px 20px; margin: 0 20px 10px; " +
    "box-shadow:0 0 5px 0 #999;}" +
    "#fic_header h1{margin: 0;}" +

    "#fic_text{background-color: background-color: #f6ecda; padding: 0 20px 20px 20px; margin: 0 auto; width:auto;" +
    "white-space: pre-line;}" +
    "" +
    ".fic_chapter_text{white-space: pre-wrap;}" +
    ".fic_chapter_wrapper{margin-top: 30px;}" +
    ".fic_chapter_wrapper:first-of-type{margin-top:0;}" +

    " /* The side navigation menu */" +
    "#fic_contents_panel {" +
    "  height: 100%; /* 100% Full-height */" +
    "  width: 320px; /* 0 width - change this with JavaScript */" +
    "  position: fixed; /* Stay in place */" +
    "  z-index: 2; /* Stay on top */" +
    "  top: 0; /* Stay at the top */" +
    "  right: -320px;" +
    "  background-color: #faf4ea;" +
    "  overflow-x: hidden; /* Disable horizontal scroll */" +
    "  padding-top: 10px; /* Place content 60px from the top */" +
    "  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */" +
    "}" +
    "#main_dimmer{background-color: #000000; opacity:0; width:100%; height: 100%; margin:0; padding:0; " +
    "position:fixed; top:0; left:0; z-index:1; display:none; transition: opacity 0.5s;}" +

    "/* The navigation menu links */" +
    "#fic_contents_panel a {" +
    "  padding: 8px 8px 8px 4px;" +
    "  text-decoration: none;" +
    "  font-size: 18px;" +
    "  color: #542a00;" +
    "  display: block;" +
    "  transition: 0.3s;" +
    "}" +
    "" +
    "/* When you mouse over the navigation links, change their color */" +
    "#fic_contents_panel a:hover {" +
    "  color: #c69e6c;" +
    "}" +
    "#fic_contents_panel h2{font-size: 18px; text-align: center;}" +
    "/* Position and style the close button (top right corner) */" +
    "#fic_contents_panel #close_button {" +
    "  position: absolute;" +
    "  top: 0;" +
    "  right: 25px;" +
    "  font-size: 36px;" +
    "  margin-left: 50px;" +
    "}" +
    "/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */" +
    "@media screen and (max-height: 450px) {" +
    "  #fic_contents_panel {padding-top: 15px;}" +
    "  #fic_contents_panel a {font-size: 18px;}" +
    "} " +
    "" +
    "#controls_wrapper{list-style:none; display:flex; flex-direction: row-reverse; text-align: right; padding-right: 16px;}" +
    "#controls_wrapper li{display:block; margin-left: 6px; padding:3px; height:24px; color: #76482e;}" +

    "#sans_serif_font {font-family: Helvetica, Verdana, sans-serif; border: #76482e 2px solid; margin-right: 0;" +
    "border-radius: 2px 0 0 2px; height: 32px; width:40px; display:table-cell; border-right:1px; margin-right: -2px}" +
    "#serif_font {font-family: 'Times New Roman', serif; border: #76482e 2px solid; margin-left: 0;" +
    " border-radius: 0 2px 2px 0; height: 32px; width:40px; display: table-cell;}" +
    "#font_select_wrapper {width:90px;}" +
    "#sans_serif_font, #serif_font {text-align:center; vertical-align: middle; font-size: 18px;}" +
    "" +
    "" +
    ".checked_control_item{background-color: #ecd7b1;}" +
    "" +
    "" +
    "#justify{height: 28.5px; width:40px; border: #76482e 2px solid; border-radius: 2px; position: relative;}" +
    "#justify:before{ background-image: url(" + browser.extension.getURL("images/align-justified.png") + ");height: 18px;" +
    "position: absolute; top: 5px; left: 11px; content: ''; background-position: center; width: 18px; background-size: cover;}" +
    "" +
    "#justify:hover, .font_select:hover{background-color: #faf4ea; cursor: pointer;}" +
    "" +
    "#font_size_custom_selected:before{ background-image: url(" + browser.extension.getURL("images/format-font-size.png") + ");height: 18px;" +
    "position: absolute; top: 8px; left: 10px; content: ''; background-position: center; width: 18px; background-size: cover;}" +
    "" +
    "#text_width_custom_selected:before{ background-image: url(" + browser.extension.getURL("images/text-width.png") + ");height: 16px;" +
    "position: absolute; top: 9px; left: 10px; content: ''; background-position: center; width: 16px; background-size: cover;}" +
    "" +
    "" +
    "" +
    "" +
    " /* The container must be positioned relative: */" +
    ".custom-select {" +
    "  position: relative; border: 0;" +
    "}" +
    "" +
    ".custom-select select {" +
    "  display: none; /*hide original SELECT element: */" +
    "}" +
    "" +
    ".select-selected {" +
    " border: #76482e 2px solid; border-radius: 2px; " +
    "}" +
    "" +
    "/* Style the arrow inside the select element: */" +
    ".select-selected:after {" +
    "  position: absolute;" +
    "  content: '';" +
    "  top: 14px;" +
    "  right: 10px;" +
    "  width: 0;" +
    "  height: 0;" +
    "  border: 6px solid transparent;" +
    "  border-color: #76482e transparent transparent transparent;" +
    "}" +
    "" +
    ".select-selected:hover{background-color: #faf4ea}" +
    ".select-selected.select-arrow-active{background-color: #ecd7b1}" +
    "/* Point the arrow upwards when the select box is open (active): */" +
    ".select-selected.select-arrow-active:after {" +
    "  border-color: transparent transparent #76482e transparent;" +
    "  top: 7px;" +
    "}" +
    "" +
    "/* style the items (options), including the selected item: */" +
    ".select-items div,.select-selected {" +
    "  padding: 5px 24px 5px 16px;" +
    "  cursor: pointer;" +
    "}" +
    "" +
    "/* Style items (options): */" +
    ".select-items {" +
    "  position: absolute;" +
    "  background-color: #faf4ea;" +
    "box-shadow:0 0 5px 0 #999;" +
    "  top: 100%;" +
    "  left: 0;" +
    "  right: 0;" +
    "  z-index: 99;" +
    "width: 150px; margin-left: -30px;" +
    "text-align: left;" +
    "border-radius: 4px;" +
    "}" +
    "" +
    "/* Hide the items when the select box is closed: */" +
    ".select-hide {" +
    "  display: none;" +
    "}" +
    "" +
    ".select-items div:hover, .same-as-selected {" +
    "  background-color: #af8045; color: #ffffff;" +
    "} " +
    "" +
    "" +

    "/* DARK THEME STYLES */" +
    ".dark #main{background-color: #1e2022; color:#eeeeee;}" +
    ".dark #fic_header{background-color: #303235; box-shadow: 0 0 5px 0 #111;}" +
    ".dark #controls_wrapper li div{border-color: #cccccc; color:#cccccc;}" +
    ".dark #font_size_custom_selected:before{ background-image: url(" + browser.extension.getURL("images/format-font-size_eee.png") + ");}" +
    ".dark #text_width_custom_selected:before{ background-image: url(" + browser.extension.getURL("images/text-width_eee.png") + ");}" +
    ".dark #justify:before{ background-image: url(" + browser.extension.getURL("images/align-justified_eee.png") + ");}" +
    ".dark .checked_control_item{background-color: #303235;}" +
    +

        ".dark .select-selected.select-arrow-active{background-color: #303235}" +
    ".dark .select-items div:hover, .dark .same-as-selected {background-color: #1e2022; color: #eeeeee;}" +
    ".dark .select-selected:hover, .dark .font_select:hover{ background-color: #303235;}" +
    ".dark .select-selected:after {border-color: #eeeeee transparent transparent transparent;}" +
    ".dark .select-selected.select-arrow-active:after {border-color: transparent transparent #eeeeee transparent; top: 7px;}" +
    ".dark .select-items{background-color: #303235; box-shadow: 0 0 5px 0 #252525;}" +
    ".dark .select-selected.select-arrow-active{background-color: #303235;}" +
    "" +
    ".dark #fic_contents_panel{background-color: #303235;}" +
    ".dark #fic_contents_panel a, .dark #fic_contents_panel li, .dark #fic_contents_panel h2{color: #eeeeee;}" +
    ".dark .select-items div:hover{background-color: #404346;}" +
    "" +
    "" +
    "#change_theme_icon{width:30px; height:30px; position:absolute; top:12px; right:12px; z-index: 120;}" +
    "#change_theme_icon:before{position:absolute; left:0; top:0; height:24px; width:24px; content: '';" +
    "background-image: url(" + browser.extension.getURL("images/dark_theme_brown.png") + ");" +
    "background-position: center; background-size: cover;}" +
    ".dark #change_theme_icon:before{position:absolute; left:0; top:0; height:24px; width:24px; content: '';" +
    "background-image: url(" + browser.extension.getURL("images/light_theme_eee.png") + ");" +
    "background-position: center; background-size: cover;}";


/**
 * Custom Select js (code from https://www.w3schools.com/howto/howto_custom_select.asp + some modifications)
 */
function initCustomSelect() {
    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.id = selElmnt.id + "_custom_selected";
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        let selectedValue = s.options[i].innerHTML;
                        let sv = selectedValue.replace("%", "")
                        //alert(selectedValue + "\n" + selectedValue.replace("%", ""));
                        s.value = sv;
                        if (s.id === 'font_size') {
                            setFontSize(+sv);
                        } else if (s.id === "text_width") {
                            setReaderWidth(+sv);
                        }
                        //alert(s.id);
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


let numberOfChapters = 0;

/**
 * Add classes for fic text wrapper, chapters wrappers, titles and text wrappers
 */
function addClasses() {
    let ficTextWrapper = document.getElementsByTagName("BODY")[0].querySelectorAll("body>div")[0]
    ficTextWrapper.id = "fic_text";
    let chapterWrappers = Array.from(ficTextWrapper.querySelectorAll("#fic_text>div"));
    numberOfChapters = chapterWrappers.length;
    for (let i = 0; i < numberOfChapters; i++) {
        chapterWrappers[i].id = "chapter_" + (i + 1);
        chapterWrappers[i].classList.add("fic_chapter_wrapper");
        chapterWrappers[i].getElementsByTagName("DIV")[0].style.display = "none";
        chapterWrappers[i].getElementsByTagName("DIV")[1].id = "chapter_" + (i + 1) + "_text";
        chapterWrappers[i].getElementsByTagName("DIV")[1].classList.add("fic_chapter_text");
        //chapterWrappers[i].getElementsByTagName("DIV")[1].style.whiteSpace = "pre-line";
        chapterWrappers[i].getElementsByTagName("DIV")[1].style.whiteSpace = "pre-wrap";
        chapterWrappers[i].getElementsByTagName("H2")[0].id = "chapter_" + (i + 1) + "_title";
        chapterWrappers[i].getElementsByTagName("H2")[0].classList.add("fic_chapter_title");
    }
    wrapFicHeader();
}

/**
 * Loads full_fic_reader.css stylesheet and add it to the page
 */
function loadStyles() {
    //let stylesheetPath = "/styles/full_fic_reader.css";
    let style = document.createElement("style");
    style.textContent = styles;

    document.getElementsByTagName("HEAD")[0].appendChild(style);
    // alert("A");
    // let inserting = browser.tabs.insertCSS({file: browser.extension.getURL("styles/full_fic_reader.css")});
    // inserting.then((item) => {alert(item)}, (err) => {alert(err)});
    // alert("B");
}

/**
 * Toggles fic contents panel
 */
let navOpen = false;

function toggleNav() {
    if (navOpen) {
        closeNav();
    } else {
        openNav();
    }
}

/**
 * Opens fic contents by setting width of the panel and margin of fic content (#main). Dim background.
 */
function openNav() {
    document.getElementById("main_dimmer").style.display = "block";
    document.getElementById("main_dimmer").style.opacity = "0.4";
    document.getElementById("fic_contents_panel").style.right = "0px";
    document.getElementById("main").style.right = "320px";
    document.getElementById("open_fic_contents_div").style.right = "352px";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    navOpen = true;
}

/**
 * Closes fic contents by setting width of the panel and margin of fic content (#main). Make background white.
 */
function closeNav() {
    setTimeout(() => {
        document.getElementById("main_dimmer").style.display = "none";
    }, 500);
    document.getElementById("main_dimmer").style.opacity = "0";
    document.getElementById("fic_contents_panel").style.right = "-320px";
    document.getElementById("main").style.right = "0";
    document.getElementById("open_fic_contents_div").style.right = '32px';
    //document.body.style.backgroundColor = "white";
    navOpen = false;
}

/**
 * Smooth scroll to chapter
 */
function smoothScroll() {
    alert("t");
    alert(this);
    let offset = document.getElementById("chapter_1").offsetTop;
    let startPos = window.scrollTop();
    alert(offset + "  " + startPos);
}

/**
 * Add fic content panel
 */
function addFicContentPanel() {
    //Add body inner html wrapper - div with id main
    //It is used to move body content when nav is open
    document.body.innerHTML = "<div id='main_dimmer'></div><div id='main'>" + document.body.innerHTML + "</div>";
    if (document.getElementById("fic_contents_list") == null) {
        let contentPanel = document.createElement("div");
        contentPanel.id = ("fic_contents_panel");
        // let closeNavButton = document.createElement('div');
        // closeNavButton.onclick = closeNav;
        // closeNavButton.textContent = "CLOSE CONTENTS";
        // closeNavButton.id = "close_button";
        // contentPanel.appendChild(closeNavButton);
        let toggleThemeButton = document.createElement("div");
        toggleThemeButton.id = "change_theme_icon";
        contentPanel.appendChild(toggleThemeButton);
        toggleThemeButton.addEventListener("click", function (e) {
            toggleTheme();
        });
        let contentTitle = document.createElement("h2");
        contentTitle.textContent = "Содержание";
        contentPanel.appendChild(contentTitle);
        let ficContentList = document.createElement("ol");
        ficContentList.id = "fic_contents_list";
        for (let i = 1; i <= numberOfChapters; i++) {
            let li = document.createElement("li");
            li.classList.add("content-chapter-item");
            let a = document.createElement("a");
            a.href = "#chapter_" + i;
            let chapterHeader = document.getElementById("chapter_" + i + "_title");
            a.text = chapterHeader.textContent;
            //a.onclick = smoothScroll;
            li.appendChild(a);
            ficContentList.appendChild(li);
        }
        contentPanel.appendChild(ficContentList);
        // let ficTextWrapper = document.getElementById("fic_text");
        // document.body.insertBefore(ficContentList, ficTextWrapper);
        document.body.appendChild(contentPanel);
        let openNavButton = document.createElement('div');
        openNavButton.onclick = toggleNav;
        let icon = document.createElement("img");
        icon.src = browser.extension.getURL("icons/ficbook_plus_icon_48.png");
        openNavButton.appendChild(icon);
        openNavButton.id = "open_fic_contents_div";
        document.body.appendChild(openNavButton);
    }
}

/**
 * Put all elements of fic header inside a div with if fic_header
 */
function wrapFicHeader() {
    let ficHeaderWrapper = document.createElement("div");
    ficHeaderWrapper.id = "fic_header";
    let ficTextWrapper = document.getElementById("fic_text");
    let child = ficTextWrapper.previousSibling;
    while (child != null) {
        let ps = child.previousSibling;
        child.remove();
        ficHeaderWrapper.insertBefore(child, ficHeaderWrapper.firstChild);
        child = ps;
    }
    document.body.insertBefore(ficHeaderWrapper, document.body.firstChild);
}

/**
 * Add reader controls
 */
function addReaderControls() {
    //TODO Add buttons/selectors to change font type, font size and text zone width
    let ficTextWrapper = document.getElementById("fic_text");
    let controlsWrapper = document.createElement("ul");
    controlsWrapper.id = "controls_wrapper";
    let justifyButton = document.createElement("div");
    justifyButton.id = "justify";
    justifyButton.textContent = "";
    justifyButton.addEventListener("click", () => toggleJustify());
    let fontSizeSelect = document.createElement("select");
    fontSizeSelect.id = "font_size";
    let fontSizeSelectWrapper = document.createElement("div");
    fontSizeSelectWrapper.classList.add("custom-select");
    fontSizeSelectWrapper.style.width = "120px";
    fontSizeSelectWrapper.appendChild(fontSizeSelect);
    for (let fs = 60; fs <= 170; fs += 10) {
        let option = document.createElement("option");
        option.text = fs + "%";
        option.value = "" + fs;
        if (fs === 100) {
            option.selected = true;
        }
        fontSizeSelect.appendChild(option);
    }
    fontSizeSelect.addEventListener("change", () => (setFontSize(+fontSizeSelect.value)));
    let textWidthSelect = document.createElement("select");
    textWidthSelect.id = "text_width";
    let textWidthSelectWrapper = document.createElement("div");
    textWidthSelectWrapper.classList.add("custom-select");
    textWidthSelectWrapper.style.width = "120px";
    textWidthSelectWrapper.appendChild(textWidthSelect);
    for (let tw = 110; tw >= 50; tw -= 10) {
        let option = document.createElement("option");
        option.text = tw + "%";
        option.value = "" + tw;
        if (tw === 100) {
            option.selected = true;
        }
        textWidthSelect.appendChild(option);
    }
    textWidthSelect.addEventListener("change", () => (setReaderWidth(+textWidthSelect.value)));
    let sansSerifFontSelect = document.createElement("div");
    sansSerifFontSelect.id = "sans_serif_font";
    sansSerifFontSelect.classList.add("font_select");
    sansSerifFontSelect.classList.add("checked_control_item");
    sansSerifFontSelect.innerText = "Аа";
    sansSerifFontSelect.addEventListener("click", (e) => {
        setFont(['Verdana', 'Helvetica'], 'sans-serif')
    });
    let serifFontSelect = document.createElement("div");
    serifFontSelect.id = "serif_font";
    serifFontSelect.innerText = "Аа";
    serifFontSelect.addEventListener("click", (e) => {
        setFont(['Times New Roman'], 'serif')
    });
    serifFontSelect.classList.add("font_select");
    let fsWrapper = document.createElement("div");
    fsWrapper.id = "font_select_wrapper";
    fsWrapper.appendChild(sansSerifFontSelect);
    fsWrapper.appendChild(serifFontSelect);
    //let li1 = document.createElement("li");
    //li1.appendChild(justifyButton);
    let li2 = document.createElement("li");
    li2.appendChild(fontSizeSelectWrapper);
    let li3 = document.createElement("li");
    li3.appendChild(textWidthSelectWrapper);
    let li4 = document.createElement("li");
    li4.appendChild(fsWrapper);
    // let li5 = document.createElement("li");
    // li5.appendChild(sansSerifFontSelect);
    //controlsWrapper.appendChild(li1);
    controlsWrapper.appendChild(li2);
    controlsWrapper.appendChild(li3);
    controlsWrapper.appendChild(li4);
    //controlsWrapper.appendChild(li5);
    document.getElementById("main").insertBefore(controlsWrapper, document.getElementById("fic_text"));
}

/**
 * Sets font
 * Accepts list of font names and font family string
 */
function setFont(fontNames, fontFamily) {
    document.getElementById("fic_text").style.fontFamily = fontNames.join(",") + ", " + fontFamily;
    highlightSelectedFontFamily(fontFamily);
}

/**
 * Toggles font select state
 */
function highlightSelectedFontFamily(font_family) {
    if (font_family === "serif") {
        document.getElementById("sans_serif_font").classList.remove("checked_control_item");
        document.getElementById("serif_font").classList.add("checked_control_item");
    } else {
        document.getElementById("sans_serif_font").classList.add("checked_control_item");
        document.getElementById("serif_font").classList.remove("checked_control_item");
    }
}

/**
 * Sets font size
 * Accepts font size in percents (70-170)
 */
function setFontSize(fontSize) {
    document.getElementById("fic_text").style.fontSize = fontSize + "%";
}

/**
 * Sets text area width
 * Accepts width in percents (50-100)
 */
function setReaderWidth(width) {
    //100% width of fic_text breaks layout, so if width>90, set it to auto
    if (width <= 90) {
        document.getElementById("fic_text").style.width = width + "%";
    } else {
        document.getElementById("fic_text").style.width = "auto";
    }
}

/**
 * Toggle text justification in fic_text
 */
function toggleJustify() {
    let chapters = document.getElementsByClassName("fic_chapter_text");
    console.log(chapters.length + "   " + chapters[0]);
    for (let i = 0; i < chapters.length; i++) {
        console.log(chapters[i].style.textAlign);
        if (chapters[i].style.textAlign === "justify") {
            chapters[i].style.textAlign = "left";
            document.getElementById("justify").classList.remove("checked_control_item");
        } else {
            chapters[i].style.textAlign = "justify";
            document.getElementById("justify").classList.add("checked_control_item");
        }
    }
}

/**
 * Toggles dark theme by setting and removing dark class from body
 */
function toggleTheme() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
    } else {
        document.body.classList.add("dark");
    }
}


addClasses();
addFicContentPanel();
addReaderControls();
loadStyles();
initCustomSelect();