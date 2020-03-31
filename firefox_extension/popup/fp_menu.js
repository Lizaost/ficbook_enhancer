/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        //alert(e);
        //alert("ID = " + e.target.id + "\nTag = " + e.target.tagName);
        /**
         * Format fic text in content according to selected format style
         */
        let formatStyle = undefined;

        function formatFic(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "formatFic",
                formatStyle: formatStyle
            });
        }

        /**
         * Change fic format back to the original one
         */
        function resetFormat(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "resetFicFormat",
            });
        }

        /**
         * Format fic text in content according to selected format style
         */
        function applyTextFixes(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "applyTextFixes"
            });
        }

        /**
         * Open full fic reader (stylized print version)
         */
        function openFullFicReader(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "openFullFicReader",
            });
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not beastify: ${error}`);
        }

        /**
         * Saves setting state to storage
         */
        function saveSettingToStorage(settingName, value) {
            //alert(settingName);
            switch (settingName) {
                case "format-on-page-load":
                    browser.storage.local.set({formatOnPageLoad: value});
                    break;
                case "fix-punctuation-spaces":
                    browser.storage.local.set({fixSpacesAroundPunctuation: value});
                    break;
                case "fix-dialogs-punctuation":
                    browser.storage.local.set({fixDialogsPunctuation: value});
                    break;
                case "fix-lapslock":
                    browser.storage.local.set({fixLapslock: value});
                    break;
            }
        }

        /**
         * Get the active tab,
         * then call "formatFic()", "resetFormat()", "openFullFicReader()" or change format settings as appropriate.
         */
        if ((e.target.classList.contains("format_style") && !e.target.classList.contains("active"))
            || (e.target.parentElement.classList.contains("format_style") &&
                !e.target.parentElement.classList.contains("active"))) {
            //alert("Clicked on not active style");
            let activeModes = document.getElementsByClassName("active");
            if (activeModes.length >= 1) {
                activeModes[0].classList.remove("active");
            }
            e.target.parentElement.classList.add("active");
            formatStyle = e.target.parentElement.id.substr("format_style-".length);
            browser.tabs.query({active: true, currentWindow: true})
                .then(formatFic)
                .catch(reportError);

        } else if ((e.target.classList.contains("format_style") && e.target.classList.contains("active"))
            || (e.target.parentElement.classList.contains("format_style") &&
                e.target.parentElement.classList.contains("active"))) {
            //alert("Clicked on active style");
            e.target.parentElement.classList.remove("active");
            browser.tabs.query({active: true, currentWindow: true})
                .then(resetFormat)
                .catch(reportError);

        } else if ((e.target.parentElement.classList.contains("auto-format-settings-item"))
            && e.target.tagName === "INPUT" && e.target.type === "checkbox") {
            //alert("Clicked on settings item");
            // alert("Changing fic text fixes setting");
            // alert(e.target.parentElement);
            let state = e.target.checked;
            // alert("Dataset: " + e.target.dataset);
            let settingItemName = e.target.id;
            //alert(settingItemName + " => " + state);
            saveSettingToStorage(settingItemName, state);
            //alert(settingItemName + " => " + state);
            browser.tabs.query({active: true, currentWindow: true})
                .then(applyTextFixes)
                .catch(reportError);
            // alert(settingItemName);

        } else if (e.target.id === "read_full_fic") {
            //alert("Clicked on read full fic button");
            browser.tabs.query({active: true, currentWindow: true})
                .then(openFullFicReader)
                .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute ficbook_plus content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/ficbook_plus.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
