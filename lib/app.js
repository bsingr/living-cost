$(document).ready(function(){
  'use strict';

  var chart;

  $('.scale').on('mouseup touched keypress mousemove', function(){
    chart.render(generateData($(this).val()));
  });

  function generateData(max){
    console.log(max);
    var i, data = [];
    for (i=0; i <= max; i++) {
      var packet = {};
      if (i > 5 && i < 10) {
        packet.value = i * 2;
        packet.type = 'two';
      } else {
        packet.value = i;
        packet.type = 'one';
      }
      data.push(packet);
    }
    return data;
  }

  function Chart(){
    var that = this;

    this.width = 960;
    this.height = 500;

    this.y = d3.scale.linear().range([this.height, 0]);

    this.chart = d3.select(".chart")
        .attr("width", this.width)
        .attr("height", this.height);
  }

  Chart.prototype.render = function(data) {
    var that = this;

    this.y.domain([0, d3.max(data, function(d) { return d.value; })]);

    this.barWidth = this.width / data.length;

    this.chart.selectAll('g').remove();

    this.g = this.chart.selectAll("g").data(data);

    this.bar = this.g.enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * that.barWidth + ",0)"; });

    this.bar.append("rect")
      .attr("y", function(d) { return that.y(d.value); })
      .attr("height", function(d) { return that.height - that.y(d.value); })
      .attr("width", this.barWidth - 1)
      .classed({
        "one": function(d){ return d.type === 'one'; },
        "two": function(d){ return d.type === 'two'; }
      });

    this.bar.append("text")
      .attr("x", this.barWidth / 2)
      .attr("y", function(d) { return that.y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });
  };

  chart = new Chart();
  chart.render(generateData(50));

});
