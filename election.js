document.addEventListener("DOMContentLoaded", function() {
  var candidateList = document.querySelector('#candidateList');
  axios({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'get',
    dataType: 'text'
  }).then(function(response) {
    console.log(response.data);
    var candidates = response.data.candidates
    candidates.forEach(function(candidate) {
      var li = document.createElement('li');
      li.innerHTML = candidate.name + ': ' + candidate.votes + ' votes';
      candidateList.appendChild(li);
    });
  });
});
