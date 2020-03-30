/**
 * Full fic reader styles
 */

let styles = "body{" +
    "    padding: 10px;" +
    "    background-color: #f6ecda;" +
    "}" +
    "hr{display:none;}" +
    "" +
    "" +
    "";


alert("full_fic_reader.js");

alert("initialization start");

let numberOfChapters = 0;

/**
 * Add classes for fic text wrapper, chapters wrappers, titles and text wrappers
 */
function addClasses() {
    alert("Adding classes");
    let ficTextWrapper = document.getElementsByTagName("BODY")[0].querySelectorAll("body>div")[0]
    ficTextWrapper.id = "fic_text";
    let chapterWrappers = Array.from(ficTextWrapper.querySelectorAll("#fic_text>div"));
    numberOfChapters = chapterWrappers.length;
    for (let i = 0; i < numberOfChapters; i++) {
        chapterWrappers[i].id = "chapter_" + (i + 1);
        chapterWrappers[i].getElementsByTagName("DIV")[1].id = "chapter_" + (i + 1) + "_text";
        chapterWrappers[i].getElementsByTagName("H2")[0].id = "chapter_" + (i + 1) + "_title";
    }
    alert("Added classes");
}

/**
 * Loads full_fic_reader.css stylesheet and add it to the page
 */
function loadStyles() {
    alert("Loading stylesheet");
    //let stylesheetPath = "/styles/full_fic_reader.css";
    let style = document.createElement("style");
    style.textContent = styles;
    document.getElementsByTagName("HEAD")[0].appendChild(style);
    alert("Loaded stylesheet");
}

/**
 * Add fic content panel
 */
function addFicContentPanel() {
    alert("Adding fic content panel");
    let ficContentList = document.createElement("ol");
    ficContentList.id = "fic_contents_list";
    for (let i = 1; i <= numberOfChapters; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#chapter_" + i;
        let chapterHeader = document.getElementById("chapter_" + i + "_title");
        a.text = chapterHeader.textContent;
        li.appendChild(a);
        ficContentList.appendChild(li);
    }
    let ficTextWrapper = document.getElementById("fic_text");
    document.body.insertBefore(ficContentList, ficTextWrapper);
    alert("Added fic content panel");
}

/**
 * Add reader controls
 */
function addReaderControls() {
    alert("Adding reader controls");
    //TODO Add buttons/selectors to change font type, font size and text zone width
    alert("Added reader controls");
}


addClasses();
addFicContentPanel();
loadStyles();