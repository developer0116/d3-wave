import * as d3 from "d3";
import WaveGraph from '../src/d3-wave';
import * as fs from 'fs';

describe('Testing wave rendering basics', () => {
  var svg = d3.select("body")
              .append("svg");

  svg.attr("width", 500)
    .attr("height", 500);  

  var wave = new WaveGraph(svg);
  it("SVG has root g", function() {
      var gs = svg.selectAll("g");
      expect(gs.size()).toBe(1);
  });
  
});


describe('Testing wave rendering of example', () => {
      var svg = d3.select("body")
                  .append("svg");

      svg.attr("width", 500)
         .attr("height", 500);  

      var wave = new WaveGraph(svg);
      var signalData = JSON.parse(fs.readFileSync('examples/wave0.json', 'utf8'));
      var signalRows = [];
      WaveGraph.temporaryFlattenSignals(signalData, signalRows);
      
      
      it("signal data correctly flattened", function() {
          expect(signalRows.length).toBe(36);
      });
      wave.bindData(signalRows);
      wave.draw();

      it("SVG has correct count of series", function() {
          var v = svg.selectAll(".value-row");
          expect(v.size()).toBe(signalRows.length);
      });
      it("SVG has correct count of series labels", function() {
          var t =  d3.selectAll(".axis-y").selectAll("text");
          expect(t.size()).toBe(signalRows.length);
      });
});