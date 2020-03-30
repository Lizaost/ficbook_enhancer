(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**.
     * Run script only if current site is ficbook.net.
     */
    let currentSite = window.location.hostname;
    let isFicbook = currentSite.search("ficbook.net") >= 0;
    if (!isFicbook) {
        return;
    }

    /**
     * Fix incorrectly placed spaces around period, comma, semicolon, question mark,
     * exclamation mark, ellipsis points, hyphen, brackets and quotation marks
     * Return fixed text.
     */
    function fixSpacesAroundPunctuationMarks(text) {
        let resText = text;
        //no space before period, comma, semicolon, question mark, exclamation mark and ellipsis points
        let regexA = / [.|?,!…]/gi;
        let result = regexA.exec(resText);
        while (result) {
            let index = result.index;
            console.log(result.index, resText.slice(result.index - 2, result.index + 2));
            resText = resText.substring(0, index) + resText.substring(index + 1);
            result = regexA.exec(resText)
        }

        //A space after punctuation marks
        let regexB = /([.|?,!…])\S/gi;
        result = regexB.exec(resText);
        while (result) {
            let index = result.index;
            console.log(result.index, resText.slice(result.index - 2, result.index + 2));
            resText = resText.substring(0, index + 1) + " " + resText.substring(index + 1);
            result = regexB.exec(resText)
        }

        //no space before hyphen if it is after letter
        let regexC = /([a-z]|[а-я]) -/gi;
        resText = resText.replace(regexC, "-");

        //no space after hyphen if it is before letter
        let regexD = /- ([a-z]|[а-я])/gi;
        result = regexD.exec(resText);
        while (result) {
            let index = result.index;
            //console.log(result.index, resText.slice(result.index-2, result.index +2));
            resText = resText.substring(0, index + 1) + " " + resText.substring(index + 2);
            result = regexD.exec(resText);
        }

        //no space after opening brackets or opening quotation marks
        let regexE = /[\[({"«“ ]+ /gi;
        result = regexE.exec(resText);
        while (result) {
            let index = result.index;
            //console.log("E => " + result.index, resText.slice(result.index-2, result.index +2));
            resText = resText.substring(0, index + 1) + resText.substring(index + 3);
            result = regexE.exec(resText);
        }

        //no space before closing brackets or closing quotation marks
        let regexF = / [\])}"»”]+/gi;
        result = regexF.exec(resText);
        while (result) {
            let index = result.index;
            //console.log(result.index, resText.slice(result.index-2, result.index +2));
            resText = resText.substring(0, index) + resText.substring(index + 1);
            result = regexF.exec(resText);
        }

        return resText;
    }

    /**
     * Add empty line between paragraphs is there is no empty line
     */
    function addEmptyLines(text) {
        let resText = text;
        //let textLines = text.split("\n");
        //let numberOfLines = textLines.length;
        let regex = /.\n/gi;
        result = regex.exec(resText);
        while (result) {
            let index = result.index;
            //console.log(result.index, resText.slice(result.index-2, result.index +2));
            if (!resText[index + 2].match(/\n/)) {
                resText = resText.substring(0, index + 1) + "\n" + resText.substring(index + 1);
            }
            result = regex.exec(resText);
        }
        // alert("added empty lines");
        return resText;
    }

    /**
     * Remove empty lines between paragraphs
     */
    function removeEmptyLines(text) {
        let resText = text;
        //let textLines = text.split("\n");
        //let numberOfLines = textLines.length;
        let regex = /\n\n/gi;
        // result = regex.exec(resText);
        // while (result) {
        //     let index = result.index;
        //     //console.log(result.index, resText.slice(result.index-2, result.index +2));
        //     resText = resText.substring(0, index+1) + "\n" + resText.substring(index+1);
        //     result = regex.exec(resText);
        // }
        resText = resText.replace(regex, "\n");
        // alert("removed empty lines");
        return resText;
    }

    /**
     * Add indent before every paragraph
     */
    function addParagraphIndents(text) {
        let resText = text;
        //let textLines = text.split("\n[. ]");
        //let numberOfLines = textLines.length;
        let regex = /\n/gi;
        result = regex.exec(resText);
        while (result) {
            let index = result.index;
            //console.log(result.index, resText.slice(result.index-2, result.index +2));
            if (!resText[index + 1].match(/[\n\t]/)) {
                resText = resText.substring(0, index + 1) + "\t" + resText.substring(index + 1);
            }
            result = regex.exec(resText);
        }
        if (!resText.startsWith("\t")) {
            resText = "\t" + resText;
        }
        // alert("added paragraph indents");
        return resText;
    }

    /**
     * Removes indent before every paragraph
     */
    function removeParagraphIndents(text) {
        let resText = text;
        //let textLines = text.split("\n[. ]");
        //let numberOfLines = textLines.length;
        let regex = /\t/gi;
        // result = regex.exec(resText);
        // while (result) {
        //     let index = result.index;
        //     //console.log(result.index, resText.slice(result.index-2, result.index +2));
        //     resText = resText.substring(0, index + 1) + resText.substring(index + 3);
        //     result = regex.exec(resText);
        // }
        resText = resText.replace(regex, "");
        // alert("removed paragraph indents");
        return resText;
    }

    /**
     * Given a format style format fic text according to this style.
     * Saves original fic text into storage as originalFicText.
     */
    function formatFic(formatStyle) {
        // alert("Formatted text according to " + formatStyle + " style");
        // let testText = "first line\nsecond line without empty line\n\nthird line with empty line" +
        //     "\n\tline with indent\n\n\tline with empty line and intends";
        // alert("Add empty lines\n" + testText + "\n--------\n" + addEmptyLines(testText));
        // alert("Remove empty lines\n" + testText + "\n--------\n" + removeEmptyLines(testText));
        // alert("Add paragraph indents\n" + testText + "\n--------\n" + addParagraphIndents(testText));
        // alert("Remove paragraph indents\n" + testText + "\n--------\n" + removeParagraphIndents(testText));
        let ficText = document.getElementById("content").innerHTML;
        switch (formatStyle) {
            case "book":
                // alert("formatting like a book");
                ficText = removeEmptyLines(ficText);
                ficText = addParagraphIndents(ficText);
                break;
            case  "web1":
                // alert("formatting like a web without indents");
                ficText = addEmptyLines(ficText);
                ficText = removeParagraphIndents(ficText);
                break;
            case "web2":
                // alert("formatting like a web with intends");
                ficText = addEmptyLines(ficText);
                ficText = addParagraphIndents(ficText);
                break;
        }
        document.getElementById("content").innerHTML = fixSpacesAroundPunctuationMarks(ficText);
    }

    /**
     * Applies text fixes (spaces around punctuation signs, dialog format,
     * lapslock fix, etc) using list of active fixes saved in storage
     * as activeFixes.
     */
    function applyTextFixes() {
        // alert("Applied text fixes");
    }

    /**
     * Resets fic text format back to its original state.
     * Uses original fic text saved in storage as originalFicText.
     */
    function resetFicFormat() {
        alert("Reset fic format style");
    }

    /**
     * Opens full fic reader (print version of the fic with additional styles)
     */

    function openFullFicReader() {
        //alert("Open full fic reader");
        //alert(window.location.href);
        let currentSite = window.location.hostname;
        let isFicbook = currentSite.search("ficbook.net") >= 0;
        let currentPage = window.location.pathname;
        let parameters = window.location.search;
        //alert(currentSite + "\n" + currentPage + "\n\n" + parameters);
        if (!isFicbook) {
            alert("It is not a ficbook");
        } else {
            let fic_id = currentPage.split("/")[2];
            if (currentPage.search("printfic") >= 0) {
                alert("It is a print version of fic with id " + fic_id);
            } else if (currentPage.search("readfic") >= 0) {
                alert("It is a standard version of fic with id " + fic_id);
            }
            let url = window.location.href.replace("readfic", "printfic") + "?ficbook_plus_read_full_fic";
            //alert("Redirecting to " + url);
            window.location = url;
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "formatFic()", "resetFicFormat() or openFullFicReader(),
     * then call applyTextFixes()".
     */
    browser.runtime.onMessage.addListener((message) => {
        //alert("onMessage listener: Message=" + message);
        if (message.command === "openFullFicReader") {
            openFullFicReader();
        } else {
            if (message.command === "formatFic") {
                formatFic(message.formatStyle);
            } else if (message.command === "resetFicFormat") {
                resetFicFormat();
            }
            applyTextFixes();
        }
    });

})();