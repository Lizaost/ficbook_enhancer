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
        chapterWrappers[i].getElementsByTagName("DIV")[1].id = "chapter_" + (i + 1) + "_text";
        chapterWrappers[i].getElementsByTagName("H2")[0].id = "chapter_" + (i + 1) + "_title";
    }
}

/**
 * Loads full_fic_reader.css stylesheet and add it to the page
 */
function loadStyles() {
    //let stylesheetPath = "/styles/full_fic_reader.css";
    let style = document.createElement("style");
    style.textContent = styles;
    document.getElementsByTagName("HEAD")[0].appendChild(style);
}

/**
 * Add fic content panel
 */
function addFicContentPanel() {
    if (document.getElementById("fic_contents_list")) {
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
    }
}

/**
 * Add reader controls
 */
function addReaderControls() {
    //TODO Add buttons/selectors to change font type, font size and text zone width
}


addClasses();
addFicContentPanel();
loadStyles();