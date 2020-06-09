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
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    command: "formatFic",
                    formatStyle: formatStyle
                }, function (response) {
                    console.log(response);
                });
            });
        }

        /**
         * Change fic format back to the original one
         */
        function resetFormat(tabs) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    command: "resetFicFormat"
                }, function (response) {
                    console.log(response);
                });
            });
        }

        /**
         * Format fic text in content according to selected format style
         */
        function applyTextFixes(tabs) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    command: "applyTextFixes"
                }, function (response) {
                    console.log(response);
                });
            });
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Something is wrong: ${error}`);
        }

        /**
         * Saves setting state to storage
         */
        function saveSettingToStorage(settingName, value) {
            //alert(settingName);
            switch (settingName) {
                case "format-on-page-load":
                    chrome.storage.local.set({formatOnPageLoad: value});
                    break;
                case "fix-punctuation-spaces":
                    chrome.storage.local.set({fixSpacesAroundPunctuation: value});
                    break;
                case "fix-dialogs-punctuation":
                    chrome.storage.local.set({fixDialogsPunctuation: value});
                    break;
                case "fix-lapslock":
                    chrome.storage.local.set({fixLapslock: value});
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
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    command: "formatFic",
                    formatStyle: formatStyle
                });
            });
            //chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {formatFic(tabs)})
            // .then(formatFic)
            // .catch(reportError);

        } else if ((e.target.classList.contains("format_style") && e.target.classList.contains("active"))
            || (e.target.parentElement.classList.contains("format_style") &&
                e.target.parentElement.classList.contains("active"))) {
            //alert("Clicked on active style");
            e.target.parentElement.classList.remove("active");
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                resetFormat(tabs)
            })
            // .then(resetFormat)
            // .catch(reportError);

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
            //formatFic();
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                formatFic(tabs);
                applyTextFixes(tabs);
            })
            // .then(applyTextFixes)
            // .catch(reportError);
            // alert(settingItemName);

        } else if (e.target.id === "info_icon") {
            showExtensionInfo();
        } else if (e.target.id === "close-info-content-icon") {
            hideExtensionInfo();
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
 * Display extension info message, and hide the normal UI.
 */
function showExtensionInfo() {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#info-content").classList.remove("hidden");
}

/**
 * Hide extension info message, and display the normal UI.
 */
function hideExtensionInfo() {
    document.querySelector("#info-content").classList.add("hidden");
    document.querySelector("#popup-content").classList.remove("hidden");
}

/**
 * Restore state of control elements from storage
 */
function restoreMenuState() {
    //alert("restoring menu state");
    chrome.storage.local.get(null, function (result) {
        if (result) {
            onGot(result);
        } else {
            onError(result);
        }
    });
    //gettingMenuState.then(onGot, onError);
}

function onGot(item) {
    console.log("Successfully restored menu state from storage");
    console.log(JSON.stringify(item));
    switch (item.ficFormatStyle) {
        case "book":
            document.getElementById("format_style-book").classList.add("active");
            break;
        case "web1":
            document.getElementById("format_style-web1").classList.add("active");
            break;
        case "web2":
            document.getElementById("format_style-web2").classList.add("active");
            break;
    }
    if (item.formatOnPageLoad) {
        document.getElementById("format-on-page-load").click();
    }
    if (item.fixSpacesAroundPunctuation) {
        document.getElementById("fix-punctuation-spaces").click();
    }
    if (item.fixDialogsPunctuation) {
        document.getElementById("fix-dialogs-punctuation").click();
    }
    if (item.fixLapslock) {
        document.getElementById("fix-lapslock").click();
    }
}

function onError(item) {
    console.log("Can't restore menu state from storage");
}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
// chrome.tabs.executeScript({file: "/content_scripts/ficbook_enhancer.js"})
//     .then(restoreMenuState)
//     .then(listenForClicks)
//     .catch(reportExecuteScriptError);
restoreMenuState();
listenForClicks(); //.catch(reportExecuteScriptError);
