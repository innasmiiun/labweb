function getHistory() {
    console.log('loaded');

    fetch('text.json')
    .then(data => {
      return data.json();
    })
    .then(data => {
        const elements = data.data.split(',');
        let result = '';
        for (var i = 0; i < elements.length - 1; i++) {
            result += `${i + 1}. ${elements[i]}<br>`;
        }
        console.log(result);
        document.getElementById('history').innerHTML = result;
    })
    .catch(error => console.log(error));
}