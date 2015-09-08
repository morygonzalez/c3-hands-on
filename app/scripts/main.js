// jshint devel:true
'use strict';

(function() {
  var $xhr = $.ajax({
    url: '/speculation.json',
    method: 'get'
  });
  $xhr.done(function(data) {
    var speculation = data.data.speculation;
    var optimal  = calculateCulmative(_.values(speculation.optimal));
    var actual   = calculateCulmative(_.values(speculation.actual));
    var original = calculateCulmative(_.values(speculation.original));
    var keys = _.keys(speculation.optimal);
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x'].concat(keys),
          ['optimal'].concat(optimal),
          ['actual'].concat(actual),
          ['original'].concat(original)
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });
  });

  var calculateCulmative = function(base) {
    return _.inject(base, function(result, n, key) {
      var culumative = n + (result[key - 1] || 0);
      result.push(culumative);
      return result;
    }, []);
  };
})();
