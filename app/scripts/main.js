// jshint devel:true
console.log('\'Allo \'Allo!');

(function() {
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      url: 'data.json',
      mimeType: 'json'
    }
  });

  setTimeout(function() {
    chart.load({
      url: '/data2.json',
      mimeType: 'json'
    });
  }, 5000);
})();
