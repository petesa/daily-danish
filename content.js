chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (typeof(request.createDiv) !== "undefined"){
          alert(request.createDiv.innerHTML);
          //Code to create the div
          alert('Here you create something');
          sendResponse({confirmation: "Successfully created div"});
      }
});
