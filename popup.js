let activateSelector = document.getElementById("activateSelector");

// When the button ise.targetinject func into current page
activateSelector.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: activateSelect,
    });
});
  
// The body of this function will be executed as a content script inside the current page
const activateSelect = () => {
    document.addEventListener('click', (e) => {
        const domRect = e.target.getBoundingClientRect()
        console.log('domRect', domRect)
        chrome.runtime.sendMessage({
            message: 'clickedElement',
            data: domRect,
        }, (res) => {
            if (res.message === 'result' && res.data){
                alert(res.data)
            }
        });
    })
}