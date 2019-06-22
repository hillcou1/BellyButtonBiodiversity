function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  var url = '/metadata/$(sample)';
  
  d3.json(url).then(function(sample) {
	var sample_metadata = d3.select("#sample-metadata");  
  
    // Use `.html("") to clear any existing metadata
	sample_metadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
	Object.entries(sample).forEach(function([key, value]) => {
		var row = sample_metadata.append("p");
		row.text('${key}: ${value}');
		console.log(key, value);
	});	    	  
  });
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
	var url = '/sample/${sample}';
	d3. json(url).then(function(data) {
	    // @TODO: Build a Bubble Chart using the sample data
		const otu_x = data.otu_ids;
		const sample_values = data.sample_values;
		const otu_labels = data.otu_labels;
		var msize = data.sample_values;
		var mcirs = data.otu_ids;
		
		console.log(otu_x, otu_labels, sample_values);
		
		var bubbleLayout = {
			margin: {t: 0}	
			hovermode: "closest",
			xaxis: {"OTU ID"}
		
		var trace = (
			x: otu_x,
			y: sample_values,
			text: otu_labels,
			mode: 'markers',
			marker: {
				size: sample_values,
				color: otu_ids,
				colorscale: "Earth"
			}
		);
		
		var data = {trace_bubble};
		
		var layout = {
			xaxis: {title: "OTU ID"}
		};
		
		Plotly.plot('bubble', trace, bubbleLayout);
	

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
		d3.json(url).then(function(data) {
			var pievalue = data.sample_values.slice(0,10);
			var pielabel = data.otu_ids.slice(0. 10);
			var piehover = data.otu_labels(0. 10);
			
			var data = [{
				values: pievalue,
				labels: pielabel,
				hovertext: piehover,
				type: 'pie'
			}];
			Plotly.newPlot('pie', data)
				console.log(data);
		});
		
	});
};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
