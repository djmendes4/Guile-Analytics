/*jslint devel:true plusplus:true browser: true */
/*jshint strict:false */
/*global $, jQuery, alert */

$(window).load(function () {
	'use strict';
	
	var Chart = {
		init: function () {
			Chart.generateSVGContainer();
			Chart.generateGraphContainer(Chart.variables.path);
		},
		
		// This holds all relevant variables for Chart data.
		variables: {
			master: document.getElementById('guile-analytics'),
			path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			
			chartWidth: 800,
			chartHeight: 250,
			
			graphWidth: 800,
			graphHeight: 250
		},
		
		// Callback will be used to check for master override.  If no override, master is the division that contains: id="guile-analytics".
		generateSVGContainer: function () {
			this.newSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		
			this.newSVG.setAttribute('id', 'guile-chart-Container');
			this.newSVG.setAttribute('class', 'chart');
			this.newSVG.style.width = Chart.variables.chartWidth;
			this.newSVG.style.height = Chart.variables.chartHeight;
			
			Chart.variables.master.appendChild(this.newSVG);
			
			Chart.setMaster('guile-chart-Container');
		},
		
		generateGraphContainer: function (path) {
			this.d = '';
			
			path.setAttribute('id', 'guile-graph-container');
			path.style.fill = 'none';
			path.style.stroke = 'rgba(0,0,0,1)';
			path.style.strokeWidth = '2px';
			path.style.strokeLinecap = 'square';
			
			this.d += 'M0,0 ';
			this.d += 'L' + Chart.variables.graphWidth + ',0 ';
			this.d += 'L' + Chart.variables.graphWidth + ',' + Chart.variables.graphHeight + ' ';
			this.d += 'L0,' + Chart.variables.graphHeight + ' ';
			this.d += 'Z';
			
			path.setAttribute('d', this.d);
			
			Chart.variables.master.appendChild(path);
		},
		
		// Allows for manipulation of the containing division; overrides standard protocols.
		setMaster: function (master) {
			Chart.variables.master = document.getElementById(master);
		}
	};
	
	Chart.init();
});

//	Input controls:
//		master:	location of the containing division;