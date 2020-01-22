import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './data/treeData2.json'
import "./css/ParkingsTree.css"

export default class ParkingsTree extends Component {

  componentDidMount() {
    this.drawTree();
  }

  drawTree() {
    var margin = { top: 20, right: 50, bottom: 100, left: 90 },
      width = 700 + margin.right + margin.left,
      height = 1960 + margin.bottom + margin.top;
    var i = 0, duration = 750

    var treemap = d3.tree().size([height, width]);
    var root = d3.hierarchy(data);
    root.x0 = height / 2;
    root.y0 = 0

    var svg = d3.select(this.refs.myDiv)
      .append("svg")
      .attr("width", width + margin.left + margin.right )
      .attr("height", height + margin.top + margin.bottom)
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left  + "," + margin.right + ")");

    update(root)
    // Collapse after the second level
    // root.children.forEach(collapse);
    // function collapse(d) {
    //   if (d.children) {
    //     d._children = d.children
    //     d._children.forEach(collapse)
    //     d.children = null
    //   }
    // }

    function update(source) {
      var treeData = treemap(root);
      // Compute the new tree layout.
      var nodes = treeData.descendants(),
          links = treeData.descendants().slice(1);
      
      
      // Normalize for fixed-depth.
      nodes.forEach(function (d) { d.y = d.depth * 150 });

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = svg.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      // Add labels for the nodes
      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function (d) {
          return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) { if (d.data.name) return d.data.name; else return d.data.NOMBRE });

      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function (d) {
          d.y = d.y + 120
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');


      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = svg.selectAll('path.link')
        .data(links, function (d) { return d.id; });

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function (d) {
          var o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        });

      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) { return diagonal(d, d.parent) });

      // Remove any exiting links
      var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
          var o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {

        var path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`

        return path
      }
      // Toggle children on click.
      function click(d) {
        console.log(d)
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
      // const drawLink = d => {
      //           // if (d.children && d.children.length > 0)
      //           return "M" + d.y + "," + d.x
      //                 + "C" + (d.y + d.parent.y) / 2 + "," + d.x
      //                 + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
      //                 + " " + d.parent.y + "," + d.parent.x;
      //               }
      // var link = g.selectAll(".link")
      //           .data( nodes.descendants().slice(1))
      //           .enter().append("path")
      //               .attr("class", "link")
      //               .attr("d", drawLink);

      // var node = g.selectAll(".node")
      //             .data( nodes.descendants() )
      //             .enter().append("g")
      //             .attr("class", function(d) { 
      //                 return "node" + 
      //                   (d.children ? " node--internal" : " node--leaf"); })
      //             .attr("transform", function(d) { 
      //                 return "translate(" + d.y + "," + d.x + ")"; })
      //               .on("click",click);

      // node.append("circle")
      //     .attr("r", 10);

      // node.append("text")
      //     .attr("dy", ".35em")
      //     .attr("x", function(d) { return d.children ? -13 : 13; })
      //     .style("text-anchor", function(d) { 
      //           return d.children ? "end" : "start"; })
      //     .text(function(d) { if (d.data.name) return d.data.name; else return d.data.NOMBRE });




    }

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