import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './data/treeData2.json'
import "./css/ParkingsTree.css"

export default class ParkingsTree extends Component {

  componentDidMount() {
    this.drawTree();
  }

  drawTree() {
    var margin = { top: 20, right: 90, bottom: 30, left: 90 },
       width = 300 + margin.right + margin.left,
       height = 1960 + margin.bottom + margin.top;

    var treemap = d3.tree().size([height, width]);
    var nodes = d3.hierarchy(data);
    nodes = treemap(nodes);

    var svg = d3.select(this.refs.myDiv)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g")
            .attr("transform","translate(" + margin.left + "," + margin.right + ")");

    var link = g.selectAll(".link")
               .data( nodes.descendants().slice(1))
               .enter().append("path")
                   .attr("class", "link")
                   .attr("d", function(d){
                    return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
                   });

    var node = g.selectAll(".node")
                .data( nodes.descendants() )
                .enter().append("g")
                .attr("class", function(d) { 
                    return "node" + 
                      (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", function(d) { 
                    return "translate(" + d.y + "," + d.x + ")"; })
                  // .on('click', handleNodeClick);

    node.append("circle")
        .attr("r", 10);
                
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", function(d) { return d.children ? -13 : 13; })
        .style("text-anchor", function(d) { 
              return d.children ? "end" : "start"; })
        .text(function(d) { return d.data.name; });
                  
                  
    // var margin = { top: 200, right: 20, bottom: 480, left: 20 },
    //   width = 1500 - margin.left - margin.right,
    //   height = 800 ;

    // var orientations = {
    //   "top-to-bottom": {
    //     size: [width, height],
    //     x: function (d) { return d.x; },
    //     y: function (d) { return d.y - height; }
    //   }
    // }

    // console.log(data)
    // const svg = d3.select(this.refs.myDiv)
    //   .selectAll("svg")
    //   .data(d3.entries(orientations))
    //   .enter().append("svg")
    //   .attr("width", width )
    //   .attr("height", height )
    //   .append("g")
    //   .attr("transform", "translate(" + (width - margin.bottom - 1000) + "," + (height -100) + ")");

    // svg.each(function (orientation) {
    //   var svg = d3.select(this),
    //     o = orientation.value;

    //   var tree = d3.tree().size(o.size);
    //   var root = d3.hierarchy(data, d => d.children)
    //   console.log(root.children)

    //   var nodes = tree(root).descendants()

    //   console.log(nodes)

    //   // var nodes = d3.hierarchy(data)
    //   // console.log(nodes)

    //   // nodes = treemap(nodes);
    //   var links = nodes.slice(1);
    //   svg.selectAll(".link")
    //     .data(links)
    //     .enter().append("path")
    //     .attr("class", "link")
    //     .attr("d", function (d) {
    //       return "M" + d.x + "," + o.y(d)
    //         + "C" + d.x + "," + (o.y(d) + o.y(d.parent)) / 2
    //         + " " + d.parent.x + "," + (o.y(d) + o.y(d.parent)) / 2
    //         + " " + d.parent.x + "," + o.y(d.parent);
    //     });
    //   var node = svg.selectAll(".node")
    //     .data(nodes)
    //     .enter()
    //     .append("g")
    //     // console.log(node)
    //   node.append("circle")
    //     .attr("class", "node")
    //     .attr("r", 4.5)
    //     .attr("cx", o.x)
    //     .attr("cy", o.y);


    //   node.append("text")
    //     .text(function (d) { return d.data.name ; })
    //     .attr("x", o.x)
    //     .attr("dx", 5)
    //     .attr("y", o.y);
    //  })
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