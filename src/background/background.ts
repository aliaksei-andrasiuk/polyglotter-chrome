chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse("Front the background Script");
})