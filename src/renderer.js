document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's' && event.key === 'v') {
    document.getElementById('modal-search-bar').style.display = 'block';
  }
});

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's' && event.key === 'z') {
    document.getElementById('modal-settings').style.display = 'none';
  }
});