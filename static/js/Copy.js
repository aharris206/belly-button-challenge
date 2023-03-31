const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data) {
    console.log(data);
    let selMenu = "";
    for (var i = 0; i < data.names.length; i++) {
        selMenu = selMenu.concat(`<option value="${data.names[i]}">${data.names[i]}</option>`);
    };
    d3.select("#selDataset").html(selMenu);
    d3.selectAll("#selDataset").on("load", updatePlotly);
    d3.selectAll("#selDataset").on("change", updatePlotly);
    
    let xValues = [];
    let yValues = [];

    function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let subjectID = parseInt(dropdownMenu.property("value"));
        for (var i = 0; i < data.metadata.length; i++) {
            let thisSubject = data.metadata[i];
            if(thisSubject.id == subjectID) {
                console.log(thisSubject);
            }
        }      
        for (var i = 0; i < data.samples.length; i++) {
            let thisSample = data.samples[i];
            let sampleID = parseInt(thisSample.id);
            if (sampleID == subjectID) {
                let topTenIDs = thisSample.otu_ids.slice(0,10);
                console.log(topTenIDs);
                let topTenLabels = thisSample.otu_labels.slice(0,10);
                let topTenValues = thisSample.sample_values.slice(0,10);
                let topTenLabelsSplit = [];
                for (var j = 0; j < topTenLabels.length; j++) {
                    topTenLabelsSplit[j] = splitOnDelim(topTenLabels[j]);
                }

                /*
                console.log(topTenValues);
                console.log(topTenIDs);
                display = [{
                    x: topTenValues,
                    y: topTenIDs}];
                Plotly.newPlot("bar", data);
                */
            }
        }
    }
});

function optionChanged(value) {
    console.log(value);
};

function splitOnDelim(text){
    let splitting = true;
    let delimArray = [];
    while (splitting) {
        let delimID = text.indexOf(";");
        if (delimID > -1) {
            let piece = text.slice(0, delimID);
            delimArray.push(piece);
            text = text.slice(delimID+1,text.length);
        } else {
            splitting = false;
        };
    };
    if (delimArray.length == 0) {
        delimArray.push(text);
    }
    return delimArray;
};













