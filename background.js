function calcFittsResult(D, W){
  return Math.log2((2*D) / W);
}

function calcDistanceBetween(domRectA, domRectB) {
  const aPosition = getPositionAtCenter(domRectA);
  const bPosition = getPositionAtCenter(domRectB);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
}

function getPositionAtCenter(domRect) {
  const {top, left, width, height} = domRect;
  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

function calcArea(domRect) {
  const {width, height} = domRect;
  return width * height
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'clickedElement'){
    chrome.storage.local.get(['DomRect'], function({DomRect}) {
      console.log('DomRect', DomRect)
      if (DomRect){
        sendResponse({ message: 'result', data: calcFittsResult(calcDistanceBetween(DomRect, request.data), calcArea(request.data)) });
      }
    });
    
    chrome.storage.local.set({DomRect: request.data});
    return true;
  }
});
