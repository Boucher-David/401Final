# How to setup chrome extension

Within the extension folder, first run "npm install".

Next, run "npm run dev". This will create a popup.js file in the bundle folder. 

Navigate to "chrome://extensions/" in your chrome browser.

Click "load unpacked extension". Find the bundle folder, open it, and select. Chrome will install the extension. 

Back on "chrome://extensions/" there will be our extension. Somewhere there should be an ID: field, followed by a random string. Copy that string.

Let's pretend our string is "abc123".

In browser, navigate to the following:

```chrome-extension://abc123/popup.html```

This will allow you to develop the extention in an actual browser tab. Refreshing a browser tab is *much* faster than refreshing the extention the standard way. Whenever you change a script in the client folder, webpack will re-create popup.js. Simply refresh the tab to see changes.

Bookmark this URL. 

Unfortunately, content scripts and background scripts *cannot* be refreshed in this way. You'll have to keep "chrome://extensions/" up somewhere and refresh it whenever modifying it. 


## Background Page

```chrome-extension://abc123/_generated_background_page.html```

Bookmark this badboy too. 
