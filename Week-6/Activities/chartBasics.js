let pieChartDataset = [];
let lineChartDataset = []

fetch('https://data.cityofchicago.org/resource/dw27-rash.json?$SELECT=school_type,count(school_type)&$GROUP=school_type')
    .then(response => response.json())
    .then(data => {
        pieChartDataset.push(['School Type', 'Count'])
        data.forEach((item) => {
            pieChartDataset.push([item["school_type"], parseInt(item["count_school_type"])])
        })
    })

fetch('https://data.cityofchicago.org/resource/553k-3xzc.json?$SELECT=date,sum(total_doses_cumulative)&$GROUP=date&$ORDER=date')
    .then(response => response.json())
    .then(data => {
        lineChartDataset.push(['School Type', 'Count'])
        data.forEach((item) => {
            lineChartDataset.push([item["date"].substring(0, 10), parseInt(item["sum_total_doses_cumulative"])])
        })
    })

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    drawPieChart();
    drawLineChart();
}

function drawPieChart() {
    var data = google.visualization.arrayToDataTable(pieChartDataset);

    var options = {
        title: 'Count by School Type'
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));

    chart.draw(data, options);
}

function drawLineChart() {
    var data = google.visualization.arrayToDataTable(lineChartDataset);

    var options = {
        title: 'Daily Cumulative Doses',
        curveType: 'function',
        hAxis: {
            title: 'Date'
        },
        vAxis: {
            title: 'Dose Count',
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line-chart'));

    chart.draw(data, options);
}
