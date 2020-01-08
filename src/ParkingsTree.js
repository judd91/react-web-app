import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './data/file2.js'
import "./css/ParkingsTree.css"

export default class ParkingsTree extends Component {

  componentDidMount() {
    this.drawTree();
  }

  drawTree() {
    var margin = { top: 100, right: 10, bottom: 240, left: 10 },
      width = 340 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    var orientations = {
      "top-to-bottom": {
        size: [width, height],
        x: function (d) { return d.x; },
        y: function (d) { return d.y - height; }
      }
    }

    console.log(data)
    const svg = d3.select(this.refs.myDiv)
      .selectAll("svg")
      .data(d3.entries(orientations))
      .enter().append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.top + "," + (height + margin.top) + ")");

    svg.each(function (orientation) {
      var svg = d3.select(this),
        o = orientation.value;

      // Compute the layout.
      var treemap = d3.tree().size(o.size);

      var nodes = d3.hierarchy(data);
      nodes = treemap(nodes);
      var links = nodes.descendants().slice(1);
      svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
          return "M" + d.x + "," + o.y(d)
            + "C" + d.x + "," + (o.y(d) + o.y(d.parent)) / 2
            + " " + d.parent.x + "," + (o.y(d) + o.y(d.parent)) / 2
            + " " + d.parent.x + "," + o.y(d.parent);
        });
      var node = svg.selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
      node.append("circle")
        .attr("class", "node")
        .attr("r", 4.5)
        .attr("cx", o.x)
        .attr("cy", o.y);


      node.append("text")
        .text(function (d) { return d.data.name; })
        .attr("x", o.x)
        .attr("dx", 5)
        .attr("y", o.y);
    })
  }

  render() {
    return <div
      className="parkingstree" ref="myDiv"
      height={400}
      width={400}></div>
    //   return (
    //   <div className="parkingstree">
    //     <GetTree />
    //   </div>
    // )
  }

}

// function GetTree() {



//   return (<div>hehe</div>)
// }