document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM Content Loaded');

  var candidateList = document.querySelector('#candidateList'),
  refresh = document.querySelector('#refreshBtn'),
  nameList;

  axios({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'get',
    dataType: 'JSON'
  }).then(function(response) {
    response.data.candidates.forEach(function(candidate) {

      let li = document.createElement('li');
      li.innerHTML = candidate.name + ': ' + candidate.votes + ' votes';
      candidateList.appendChild(li);

      let form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://bb-election-api.herokuapp.com/vote';
      
      let button = document.createElement('button');
      button.innerText = 'Vote!';
      button.type = 'hidden';
      button.name = 'name';
      button.value = candidate.name;
      
      form.appendChild(button);
      li.appendChild(form);

    });
  });

  document.addEventListener('submit', function(e) {
    nameList = document.querySelectorAll('li');
    var self = e.target.querySelector('button');
    self.disabled = 'disabled';
    e.preventDefault();
    axios({
      url: 'https://bb-election-api.herokuapp.com/vote',
      method: 'post',
      data: {'name': self.value}
    }).then(function() {
      axios({
        url: 'https://bb-election-api.herokuapp.com/',
        method: 'get',
        dataType: 'JSON'
      }).then(function(response) {
        response.data.candidates.forEach(function(candidate, i) {
          let button = nameList[i].lastChild;
          nameList[i].innerHTML = candidate.name + ': ' + candidate.votes + ' votes';
          nameList[i].append(button);
        });
      });
    }).catch(() => {
      console.log('uh oh, something went wrong :/');
    });
  });

  refresh.addEventListener('click', function() {
    nameList.forEach(function(list) {
      list.lastChild.lastChild.disabled = false;
    });
  });
});
