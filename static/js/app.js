const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    // let selection = d3.select("#selDataset");
    let selection = "";
    d3.json(url).then(function(data) {
        let sampleNames = data.names;
        for (var i = 0; i < sampleNames.length; i++) {
            selection = selection.concat(`<option value="${sampleNames[i]}">${sampleNames[i]}</option>`);
        };
        d3.select("#selDataset").html(selection);
        let firstElement = sampleNames[0];
        d3.select("#selDataset").attr("value", parseInt(firstElement));
        metadata(parseInt(firstElement));
        plotly(firstElement);
    })
};

function metadata(sampleID) {
    d3.json(url).then(function(data) {
        let meta = data.metadata;
        console.log(data);
        console.log(meta);
        let sampleFilter = meta.filter(item => parseInt(item.id) == parseInt(sampleID));
        // filtering returns an array of all matches. sampleFilter[0] is the item object that we want.
        let demographicInfo = "";
        //abbreviating "sample" as "sp", eg. "sampleItem" → "spItem"
        let spItem = sampleFilter[0];
        demographicInfo = demographicInfo.concat(`id: ${spItem["id"]}</br>ethnicity: ${spItem["ethnicity"]}</br>gender: ${spItem["gender"]}</br>age: ${spItem["age"]}</br>`);
        demographicInfo = demographicInfo.concat(`location: ${spItem["location"]}</br>bbtype: ${spItem["bbtype"]}</br>wfreq: ${spItem["wfreq"]}`);
        // console.log(demographicInfo);
        d3.select(".panel-body").html(demographicInfo);   
    })
};

function plotly(sampleID) {
    d3.json(url).then(function(data) {
        let samples = data.samples;
        let sampleFilter = samples.filter(item => parseInt(item.id) == parseInt(sampleID));
        let spItem = sampleFilter[0];
        console.log(spItem);
        let ids = spItem.otu_ids.slice(0,10)
        for (var i = 0; i < ids.length; i++) {
            let added = `OTU ${ids[i]}`; ids[i] = added;
        };
        let topTenLabels = spItem.otu_labels.slice(0,10);
        var traceBar = {
            x: spItem.sample_values.slice(0,10).reverse(),
            y: ids.reverse(),
            text: topTenLabels,
            type: "bar",
            orientation: "h"
        };
        var traceBub = [{
            x: spItem.otu_ids,
            y: spItem.sample_values,
            text: spItem.otu_labels,
            mode:"markers",
            marker: {
                size: spItem.sample_values,
                color: spItem.otu_ids
            }
        }];
        /* bubLayout = {
            xaxis: {range: [40, 160], title: "Square Meters"},
            yaxis: {range: [5, 16], title: "Price in Millions"}
        } */
        let dataTraceBar = [traceBar];
        Plotly.newPlot("bar", dataTraceBar);
        Plotly.newPlot("bubble", traceBub);
        console.log(spItem);

    })
}

function optionChanged(sampleID) {
    let selection = "";
    d3.json(url).then(function(data) {
        let sampleNames = data.names;
        let sampleFilter = sampleNames.filter(item => parseInt(item) == parseInt(sampleID));
        //for (var i = 0; i < sampleNames.length; i++) {
        //    selection = selection.concat(`<option value="${sampleNames[i]}">${sampleNames[i]}</option>`);
        //};
        //d3.select("#selDataset").html(selection);
        let newElement = sampleFilter[0];
        d3.select("#selDataset").attr("value", parseInt(newElement));
        metadata(parseInt(newElement));
        plotly(newElement);
    })
}

init();