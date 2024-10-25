// Get elements from the DOM
const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const openButton = document.getElementById('openButton') as HTMLButtonElement;
const webView = document.getElementById('webView') as WebviewTag;

// Add click event listener to the button
openButton.addEventListener('click', () => {
    // Get the trimmed value from the input
    let formattedUrl = urlInput.value.trim();

    // Validate and format the URL
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl; // Default to HTTPS if no protocol is provided
    }

    // Set the webview's src to the formatted URL
    webView.src = formattedUrl;
});
