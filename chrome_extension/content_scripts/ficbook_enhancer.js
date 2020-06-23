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
     * Format on page load if formatOnPageLoad is set to true in storage
     */
    function onGotFormatOnLoad(item) {
        console.log("Successfully got formatOnPageLoad from storage");
        console.log(item.formatOnPageLoad);
        if (item.formatOnPageLoad) {

            function onGotFormatStyle(item) {
                console.log("Got format style from storage");
                return item.ficFormatStyle;
            }

            function onErrorFormatStyle(item) {
                console.log("Can't get format style from storage");
                return "";
            }

            chrome.storage.local.get(["ficFormatStyle"], function (result) {
                if (result) {
                    formatFic(onGotFormatStyle(result));
                } else {
                    onErrorFormatStyle(result);
                }
            });
            applyTextFixes();
        } else {
            console.log("Format on page load is off");
        }
    }

    function onErrorFormatOnLoad(item) {
        console.log("Can't get formatOnPageLoad from storage");
        return false;
    }

    chrome.storage.local.get(["formatOnPageLoad"], function (result) {
        if (result) {
            onGotFormatOnLoad(result);
        } else {
            onErrorFormatOnLoad(result);
        }
    });

    /**
     * Fix incorrectly placed spaces around period, comma, semicolon, question mark,
     * exclamation mark, ellipsis points, hyphen, brackets and quotation marks
     * Return fixed text.
     */
    function fixSpacesAroundPunctuationMarks(text) {
        console.log("removing unnecessary spaces around punctuation marks");
        let resText = text;

        //A space after punctuation marks
        let regexB = /([.?,!…])\S/gi;
        result = regexB.exec(resText);
        while (result) {
            let index = result.index;
            resText = resText.substring(0, index + 1) + " " + resText.substring(index + 1);
            result = regexB.exec(resText)
        }

        //no space before period, comma, semicolon, question mark, exclamation mark and ellipsis points
        let regexA = / [.?,!…]/gi;
        let result = regexA.exec(resText);
        while (result) {
            let index = result.index;
            console.log(result.index, resText.slice(result.index - 2, result.index + 2));
            resText = resText.substring(0, index) + resText.substring(index + 1);
            result = regexA.exec(resText)
        }

        //no space before hyphen if it is after letter
        let regexC = /([a-z]|[а-я]) -/gi;
        resText = resText.replace(regexC, "-");

        //no space after hyphen if it is before letter
        let regexD = /- ([a-z]|[а-я])/gi;
        result = regexD.exec(resText);
        while (result) {
            let index = result.index;
            resText = resText.substring(0, index + 1) + " " + resText.substring(index + 2);
            result = regexD.exec(resText);
        }

        //no space after opening brackets or opening quotation marks
        let regexE = /[\[({"«“ ]+ /gi;
        result = regexE.exec(resText);
        while (result) {
            let index = result.index;
            resText = resText.substring(0, index + 1) + resText.substring(index + 3);
            result = regexE.exec(resText);
        }

        //no space before closing brackets or closing quotation marks
        let regexF = / [\])}"»”]+/gi;
        result = regexF.exec(resText);
        while (result) {
            let index = result.index;
            resText = resText.substring(0, index) + resText.substring(index + 1);
            result = regexF.exec(resText);
        }
        console.log("Removed unnecessary spaces");
        return resText;
    }

    /**
     * Fix lapslock by capitalizing first word of each sentence.
     */
    function fixLapslock(text) {
        let resText = text;
        // Replace <b> and <i> opening tags with predefined strings to preserve them from being changed to
        // uppercase, since only sentence inside these tags should be changed
        // String.replace function does not work in this case, so I split the text by the tag and join it
        // using replacement string as a separator
        resText = resText.split("<b>").join("|||||");
        resText = resText.split("<i>").join("@@@@@");
        resText = resText.split("&nbsp;").join(" ");
        resText = resText.split("&Nbsp;").join(" ");

        // Replace first alphabetic character in each sentence with an uppercase version (a -> A)
        let sentenceRegex = /([a-z]|[A-Z]|[а-я]|[А-Я]|ё|Ё|\n).+?([.?!…:](\s|$|\n)|\n|$)/gi;
        resText = resText.replace(sentenceRegex, function (txt) {
            // Regex is located inside the replacer function since it should be recreated each time
            // otherwise match index is incorrect
            let alphabeticCharRegex = /[a-z]|[A-Z]|[а-я]|[А-Я]|ё|Ё/gi;
            let re = new RegExp(String.fromCharCode(160), "gi");
            txt = txt.replace(re, "+++++");
            txt = txt.replace("&nbsp;", " ");
            txt = txt.replace("&Nbsp;", " ");
            let match = alphabeticCharRegex.exec(txt);
            let firstAlphaCharIndex = match.index;
            let editedLine = txt.substr(0, firstAlphaCharIndex) + txt.charAt(firstAlphaCharIndex).toUpperCase()
                + txt.substr(firstAlphaCharIndex + 1);
            return editedLine;
        });

        // Restore replaces tags
        resText = resText.split("|||||").join("<b>");
        resText = resText.split("@@@@@").join("<i>");
        resText = resText.split("&nbsp;").join(" ");
        resText = resText.split("&Nbsp;").join(" ");

        console.log("Fixed lapslock");
        return resText;
    }

    /**
     * Fixed incorrect dialog punctuation.
     * Uses russian language punctuation rules.
     * IMPORTANT - this function must be run after the fixSpacesAroundPunctuationMarks function
     * because some of changes of this function may be overwritten
     */
    function fixDialogsPunctuation(text) {
        let textLines = text.split("\n");
        let numberOfLines = textLines.length;
        console.log("Lines in text : " + numberOfLines);
        let isDialogLineRegex = /^(\t|\w)?(\-|-|–)( )?([a-z]|[A-Z]|[а-я]|[А-Я]).+?.?($)/gi;
        //For each line of text
        for (let i = 0; i < numberOfLines; i++) {
            //if it a part of dialog
            if (textLines[i].match(isDialogLineRegex)) {
                //replace double hyphen by dash
                textLines[i] = textLines[i].replace("--", "—");

                //replace hyphen(-) and minus(−) with dash(—) at the start of sentence
                //and remove initial spaces
                console.log(JSON.stringify(textLines[i].match(/^(\t|\w)?(\-|-|–)( )*/gi)));
                let lineStartFixString = "";
                if (textLines[i].startsWith("\t")) {
                    lineStartFixString = "\t";
                }
                textLines[i] = textLines[i].replace(/^(\t|\w)?(\-|-|–)( )*/gi, lineStartFixString + "— ");

                //(A: - B.), (- B, - a.), (- B, - a, - b)
                //(,-) => (, - )
                //Replace hyphen and minus by dash, add necessary spaces
                let regexAuthorWordsWithHyphenMinusDash = /([.?,!…;])( )?([−\-—])( )?/gi;
                //In the case below (with colon) dialog line starts on the next line, so there is no need
                //to work with this case differently
                // let regexAuthorWordsWithColon = /:( )?([−\-—])( )?/gi;
                let result = regexAuthorWordsWithHyphenMinusDash.exec(textLines[i]);
                while (result) {
                    let index = result.index;
                    let hmcIndex = result[0].search(/([−\-—])/);
                    textLines[i] = textLines[i].substring(0, index + hmcIndex) + "—" + textLines[i].substring(index + hmcIndex + 1);
                    if (textLines[i][index + hmcIndex - 1] != " ") {
                        textLines[i] = textLines[i].substring(0, index + hmcIndex) + " " + textLines[i].substring(index + hmcIndex);
                        hmcIndex++; //since a symbol was added before
                    }
                    if (textLines[i][index + hmcIndex + 1] != " ") {
                        textLines[i] = textLines[i].substring(0, index + hmcIndex + 1) + " " + textLines[i].substring(index + hmcIndex + 1);
                    }
                    result = regexAuthorWordsWithHyphenMinusDash.exec(textLines[i]);
                }
            }
        }
        console.log("Fixed dialogs punctuation");
        return textLines.join("\n");
    }

    /**
     * Add empty line between paragraphs is there is no empty line
     */
    function addEmptyLines(text) {
        let resText = text;
        let regex = /.\n/gi;
        result = regex.exec(resText);
        while (result) {
            let index = result.index;
            if (!resText[index + 2].match(/\n/)) {
                resText = resText.substring(0, index + 1) + "\n" + resText.substring(index + 1);
            }
            result = regex.exec(resText);
        }
        console.log("added empty lines");
        return resText;
    }

    /**
     * Remove empty lines between paragraphs
     */
    function removeEmptyLines(text) {
        let resText = text;
        let regex = /\n\n/gi;
        resText = resText.replace(regex, "\n");
        console.log("removed empty lines");
        return resText;
    }

    /**
     * Add indent before every paragraph
     */
    function addParagraphIndents(text) {
        let resText = text;
        let regex = /\n/gi;
        result = regex.exec(resText);
        while (result) {
            let index = result.index;
            if (!resText[index + 1].match(/[\n\t]/)) {
                console.log("added tab");
                resText = resText.substring(0, index + 1) + "\t" + resText.substring(index + 1);
            }
            result = regex.exec(resText);
        }
        if (!resText.startsWith("\t")) {
            resText = "\t" + resText;
        }
        console.log("added paragraph indents");
        return resText;
    }

    /**
     * Removes indent before every paragraph
     */
    function removeParagraphIndents(text) {
        let resText = text;
        let regex = /\t/gi;
        resText = resText.replace(regex, "");
        console.log("removed paragraph indents");
        return resText;
    }

    /**
     * Given a format style format fic text according to this style.
     * Saves original fic text into storage as originalFicText.
     */
    let ficFormatted = false;

    function formatFic(formatStyle) {
        formatFicText(formatStyle, null);
    }

    function formatFicText(formatStyle, text) {
        console.log("FormatFic function is run with formatStyle=\"" + formatStyle + "\"");
        let ficText;
        if (text === null) {
            ficText = document.getElementById("content").innerHTML;
        } else {
            ficText = text;
        }
        if (formatStyle === "book" || formatStyle === "web1" || formatStyle === "web2") {
            if (!ficFormatted) {
                if (text === null) {
                    chrome.storage.local.set({ficTextSaved: ficText});
                } else {
                    chrome.storage.local.set({ficTextSaved: document.getElementById("fic_text").innerHTML});
                }
            }
            ficFormatted = true;
        }
        console.log("Saved original fic text to storage");
        switch (formatStyle) {
            case "book":
                chrome.storage.local.set({ficFormatStyle: "book"});
                ficText = removeEmptyLines(ficText);
                ficText = addParagraphIndents(ficText);
                console.log("Formated fic with book style");
                break;
            case  "web1":
                chrome.storage.local.set({ficFormatStyle: "web1"});
                ficText = addEmptyLines(ficText);
                ficText = removeParagraphIndents(ficText);
                console.log("Formatted fic with web1 style");
                break;
            case "web2":
                chrome.storage.local.set({ficFormatStyle: "web2"});
                ficText = addEmptyLines(ficText);
                ficText = addParagraphIndents(ficText);
                console.log("Formatted fic with web2 style");
                break;
        }
        if (text === null) {
            document.getElementById("content").innerHTML = ficText;
        } else {
            return ficText;
        }
    }

    /**
     * Returns setting value saved in storage or false by default
     */
    function getSettingFromStorage(settingName) {
        function onGot(item) {
            console.log("Successfully got the item (" + settingName + ") from storage");
            document.getElementById("content").innerHTML = item.ficTextSaved;
        }

        function onError(item) {
            console.log("Can't get the item (" + settingName + ") from storage");
            return false;
        }

        chrome.storage.local.get(settingName, function (result) {
            if (result) {
                onGot(result);
            } else {
                onError(result);
            }
        });
    }

    /**
     * Applies text fixes (spaces around punctuation signs, dialog format,
     * lapslock fix, etc) using list of active fixes saved in storage
     * as activeFixes.
     */
    function applyTextFixes() {
        applyTextFixesToText(null);
    }

    function applyTextFixesToText(text) {
        console.log("Started applying text fixes");
        let tempText = text;

        function onGotSpacesFix(item) {
            console.log("Successfully got item.fixSpacesAroundPunctuation from storage");
            console.log("item.fixSpacesAroundPunctuation = " + item.fixSpacesAroundPunctuation)
            if (item.fixSpacesAroundPunctuation) {
                if (text === null) {
                    let ficText = document.getElementById("content").innerHTML;
                    document.getElementById("content").innerHTML = fixSpacesAroundPunctuationMarks(ficText);
                } else {
                    tempText = fixSpacesAroundPunctuationMarks(tempText);
                }

            }
        }

        function onErrorSpacesFix(item) {
            console.log("Can't get fixSpacesAroundPunctuation from storage");
            return false;
        }

        chrome.storage.local.get("fixSpacesAroundPunctuation", function (result) {
            if (result) {
                onGotSpacesFix(result);
            } else {
                onErrorSpacesFix(result);
            }
        });

        function onGotDialogsFix(item) {
            console.log("Successfully got fixDialogsPunctuation from storage");
            console.log("fixDialogsPunctuation = " + item.fixDialogsPunctuation);
            if (item.fixDialogsPunctuation) {
                if (text === null) {
                    let ficText = document.getElementById("content").innerHTML;
                    document.getElementById("content").innerHTML = fixDialogsPunctuation(ficText);
                } else {
                    tempText = fixDialogsPunctuation(tempText);
                }
            }
        }

        function onErrorDialogsFix(item) {
            console.log("Can't get fixDialogsPunctuation from storage");
            return false;
        }

        chrome.storage.local.get("fixDialogsPunctuation", function (result) {
            if (result) {
                onGotDialogsFix(result);
            } else {
                onErrorDialogsFix(result);
            }
        });

        function onGotLapslockFix(item) {
            console.log("Successfully got fixLapslock from storage");
            console.log("fixLapslock = " + item.fixLapslock);
            if (item.fixLapslock) {
                if (text === null) {
                    let ficText = document.getElementById("content").innerHTML;
                    document.getElementById("content").innerHTML = fixLapslock(ficText);
                } else {
                    tempText = fixLapslock(tempText);
                }
            }
        }

        function onErrorLapslockFix(item) {
            console.log("Can't get fixLapslock from storage");
            return false;
        }

        chrome.storage.local.get("fixLapslock", function (result) {
            if (result) {
                onGotLapslockFix(result);
            } else {
                onErrorLapslockFix(result);
            }
        });

        console.log("end of ApplyTextFixes function");
        if (text !== null) {
            return tempText;
        }
    }

    /**
     * Resets fic text format back to its original state.
     * Uses original fic text saved in storage as originalFicText.
     */
    function resetFicFormat() {
        function onGot(item) {
            if (ficFormatted) {
                if (window.location.href.search(/printfic/) >= 0) {
                    document.getElementById("fic_text").innerHTML = item.ficTextSaved;
                } else {
                    document.getElementById("content").innerHTML = item.ficTextSaved;
                }
                console.log("Reset fic format");
            } else {
                console.log("Fic is not formatted");
            }
            ficFormatted = false;
        }

        function onError(item) {
            console.log("Error reseting fic format");
        }

        chrome.storage.local.get(["ficTextSaved"], function (result) {
            if (result) {
                onGot(result);
            } else {
                onError(result);
            }
        });

        chrome.storage.local.set({ficFormatStyle: ""});
        console.log("Set fic format style to empty string in settings");
    }

    /**
     * Opens full fic reader (print version of the fic with additional styles)
     */

    function openFullFicReader() {
        let currentSite = window.location.hostname;
        let isFicbook = currentSite.search("ficbook.net") >= 0;
        let currentPage = window.location.pathname;
        let parameters = window.location.search;
        if (isFicbook) {
            let fic_id = currentPage.split("/")[2];
            window.location = "https://www.ficbook.net/printfic/" + fic_id;
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "formatFic()", "resetFicFormat() or openFullFicReader(),
     * then call applyTextFixes()".
     */
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Received message with command=" + message.command);
        if (message.command === "formatFic") {
            if (window.location.href.search("printfic") >= 0) {
                let chapters = document.getElementsByClassName("fic_chapter_text");
                let l = chapters.length;
                for (let i = 0; i < l; i++) {
                    chapters[i].innerHTML = formatFicText(message.formatStyle, chapters[i].innerHTML);
                    chapters[i].innerHTML = applyTextFixesToText(chapters[i].innerHTML);
                }
            } else {
                formatFic(message.formatStyle);
            }
        } else if (message.command === "resetFicFormat") {
            resetFicFormat();
        }
        applyTextFixes();
    });
})();
