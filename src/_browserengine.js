const { ipcRenderer } = require('electron');

class BrowserEngine {
  constructor() {
    this.keyBindings = {};
    this.urlBar = document.getElementById('url-bar'); // Assuming you have a URL bar element with id 'url-bar'
    this.iframe = document.getElementById('main-iframe'); // Assuming you have an iframe element with id 'main-iframe'
  }

  bindKey(keyCombo, callback) {
    this.keyBindings[keyCombo] = callback;
  }

  start() {
    window.addEventListener('keydown', (event) => {
    let keyCombo = '';
    if (event.ctrlKey) keyCombo += 'Ctrl+';
    if (event.altKey) keyCombo += 'Alt+';
    if (event.shiftKey) keyCombo += 'Shift+';
    keyCombo += event.key;

    if (this.keyBindings[keyCombo]) {
      this.keyBindings[keyCombo](event);
    }
    });

    if (this.urlBar) {
      this.urlBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const url = this.urlBar.value;
          if (this.iframe) {
            this.iframe.src = url;
          }
        }
      });
    }
  }
}

let browserEngine = new BrowserEngine();

// Example usage:
browserEngine.bindKey('Ctrl+Shift+I', () => {
  console.log('Ctrl+Shift+I pressed!');
  // Do something when Ctrl+Shift+I is pressed, like open dev tools
  ipcRenderer.send('open-dev-tools');
});

browserEngine.bindKey('Ctrl+S+V', () => {
  // Focus the URL bar when Ctrl+S+V is pressed.
  if (browserEngine.urlBar) {
    browserEngine.urlBar.focus();
  }
});

browserEngine.start();
