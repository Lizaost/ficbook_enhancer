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
         * Get the active tab,
         * then call "formatFic()", "resetFormat()", "openFullFicReader()" or change format settings as appropriate.
         */
        if ((e.target.classList.contains("format_style") && !e.target.classList.contains("active"))
            || (e.target.parentElement.classList.contains("format_style") &&
                !e.target.parentElement.classList.contains("active"))) {
            e.target.parentElement.classList.add("active");
            formatStyle = e.target.parentElement.id.substr("format_style-".length);
            browser.tabs.query({active: true, currentWindow: true})
                .then(formatFic)
                .catch(reportError);

        } else if ((e.target.classList.contains("format_style") && e.target.classList.contains("active"))
            || (e.target.parentElement.classList.contains("format_style") &&
                e.target.parentElement.classList.contains("active"))) {
            e.target.parentElement.classList.remove("active");
            browser.tabs.query({active: true, currentWindow: true})
                .then(resetFormat)
                .catch(reportError);

        } else if ((e.target.parentElement.classList.contains("auto-format-settings-item"))
            && e.target.tagName === "INPUT" && e.target.type === "checkbox") {
            // alert("Changing fic text fixes setting");
            // alert(e.target.parentElement);
            let state = e.target.checked;
            // alert("Dataset: " + e.target.dataset);
            let settingItemName = e.target.id;
            alert(settingItemName + " => " + state);
            // alert(settingItemName);

        } else if (e.target.id === "read_full_fic") {
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
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/ficbook_plus.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
