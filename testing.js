/*jslint devel:true plusplus:true browser: true */
/*jshint strict:false */
/*global $, jQuery, alert */

var Chart = function () {
	'use strict';
	
	this.chartWidth = 600;
	this.chartHeight = 400;
	this.chartMargin = 25;
	
	this.numberOfHorizontalTicks = 31;
	this.numberOfVerticalTicks = 5;
	
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;
	
	this.guile = Object;
	
	this.createContainer = function () {
		var newSection = document.createElement('section'), newDiv = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		
		newDiv.setAttribute('id', 'chart-Container');
		newDiv.setAttribute('class', 'chart');
		
		newSection.appendChild(newDiv);
		newSection.setAttribute('id', 'guile-analytics');
		
		document.body.appendChild(newSection);
		
		this.guile = document.getElementById('chart-Container');
	};
	
	this.chartContainer = function () {
		var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'), d = '', x, y;
		
		newPath.setAttribute('id', 'chartContainer');
		
		d += 'M0,0';
		d += ' L' + this.chartWidth + ',0';
		d += ' L' + this.chartWidth + ',' + this.chartHeight;
		d += ' L' + '0,' + this.chartHeight;
		d += ' Z';
		
		newPath.setAttribute('d', d);
		
		this.guile.appendChild(newPath);
	};
	
	this.getAnchors = function (p1x, p1y, p2x, p2y, p3x, p3y) {
		var l1, l2, a, b, alpha, dx1, dy1, dx2, dy2;

		l1 = (p2x - p1x) / 2;
		l2 = (p3x - p2x) / 2;
		a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y));
		b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));

		console.log(a + ' : ' + b);
		
		a = p1y < p2y ? Math.PI - a : a;
		b = p3y < p2y ? Math.PI - b : b;
		
		console.log(a + ' : ' + b);
		console.log(0 % 3.14);

		alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2;
		
		console.log(alpha);
		
		dx1 = l1 * Math.sin(alpha + a);
		dy1 = l1 * Math.cos(alpha + a);
		dx2 = l2 * Math.sin(alpha + b);
		dy2 = l2 * Math.cos(alpha + b);
		
		this.x1 = p2x - dx1;
		this.y1 = p2y + dy1;
		this.x2 = p2x + dx2;
		this.y2 = p2y + dy2;
	};
	
	this.graphContainer = function () {
		var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'), d = '', x, y;
		
		newPath.setAttribute('id', 'graphContainer');
		
		d += 'M' + this.chartMargin + ',' + this.chartMargin;
		d += ' L' + (this.chartWidth - this.chartMargin) + ',' + this.chartMargin;
		d += ' L' + (this.chartWidth - this.chartMargin) + ',' + (this.chartHeight - this.chartMargin);
		d += ' L' + this.chartMargin + ',' + (this.chartHeight - this.chartMargin);
		d += ' L' + this.chartMargin + ',' + this.chartMargin;
		
		newPath.setAttribute('d', d);
		
		document.getElementById('graph').appendChild(newPath);
	};
	
	this.graphCoordinateAxes = function () {
		var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'), d = '';
		
		newPath.setAttribute('id', 'graphCoordinateAxisX');
		newPath.setAttribute('class', 'x-axis');
		
		d += 'M' + this.chartMargin + ',' + (this.chartHeight - this.chartMargin);
		d += ' H' + (this.chartWidth - this.chartMargin);
		
		newPath.setAttribute('d', d);

		document.getElementById('graph').appendChild(newPath);
		
		newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		d = '';
		
		newPath.setAttribute('id', 'graphCoordinateAxisY');
		newPath.setAttribute('class', 'y-axis');
		
		d += 'M' + this.chartMargin + ',' + (this.chartHeight - this.chartMargin);
		d += ' V' + this.chartMargin;
		
		newPath.setAttribute('d', d);

		document.getElementById('graph').appendChild(newPath);
	};
	
	this.horizontalGridlines = function () {
		var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'), d = '', x = 0, y = 0;
		
		newPath.setAttribute('id', 'horizontalGridlines');
		newPath.setAttribute('class', 'horizontal gridlines');
		
		for (x = 0; x <= this.numberOfVerticalTicks; x++) {
			d += 'M' + this.chartMargin + ',' + ((this.chartHeight - this.chartMargin) - (x * ((this.chartHeight - (2 * this.chartMargin)) / this.numberOfVerticalTicks)));
			d += ' H' + (this.chartWidth - this.chartMargin) + ' ';
		}
		
		newPath.setAttribute('d', d);
		
		document.getElementById('graph').appendChild(newPath);
	};
	
	this.verticalGridlines = function () {
		var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'), d = '', x = 0, y = 0;
		
		newPath.setAttribute('id', 'verticalGridlines');
		newPath.setAttribute('class', 'vertical gridlines');
		
		for (x = 0; x <= this.numberOfHorizontalTicks; x++) {
			d += 'M' + (this.chartMargin + (x * (this.chartWidth - (2 * this.chartMargin)) / this.numberOfHorizontalTicks)) + ',' + (this.chartHeight - this.chartMargin);
			d += ' V' + this.chartMargin + ' ';
		}
		
		newPath.setAttribute('d', d);
		
		document.getElementById('graph').appendChild(newPath);
	};
};

$(window).load(function () {
	'use strict';
	
	var chart = new Chart();
	
	chart.getAnchors(42, 212, 67, 172, 92, 168);
	
	chart.createContainer();
	chart.chartContainer();
	chart.graphContainer();
	chart.graphCoordinateAxes();
	chart.horizontalGridlines();
	chart.verticalGridlines();
});