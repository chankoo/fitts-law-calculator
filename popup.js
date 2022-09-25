// Initialize button with user's preferred color
let activateSelector = document.getElementById("activateSelector");

// When the button is clicked, inject setPageBackgroundColor into current page
activateSelector.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: activateSelect,
    });
});
  
// The body of this function will be executed as a content script inside the
// current page
const activateSelect = () => {
    console.log('activateSelect!')
    alert('hihi')
}