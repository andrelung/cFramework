/*global $, importer, parser */
var stage;
var stageContext = {};



/**
 * -> Entry Point
 * Starts the staging process
 * @param {[[Type]]} url [[Description]]
 */
function stageData(url) {

    importer.loadData(url, function (gdata) {
        var graph = parser.getContentGraph(gdata);
        addMetrics(graph, ["score", "directPredecessors", "directSuccessors", "inEdges", "outEdges"]);
        evaluateMetrics(graph);
        printGraphTable(graph);
    });
}

function addMetrics(graph, metricsArray) {
    var i;

    for (var oneNode in graph._nodes) {
        if (graph._nodes.hasOwnProperty(oneNode)) {
            for (i = 0; i<metricsArray.length; i++){
                graph._nodes[oneNode][metricsArray[i]] = undefined;
            }
        }
    }
}

function evaluateMetrics(graph) {
    var inEdges,
        outEdges;

    for (var oneNode in graph._nodes) {
        if (graph._nodes.hasOwnProperty(oneNode)) {
            inEdges = graph.inEdges(oneNode);
            outEdges = graph.outEdges(oneNode);
            graph._nodes[oneNode].inEdges = edgeArrayToString(inEdges, "v");
            graph._nodes[oneNode].outEdges = edgeArrayToString(outEdges, "w");
            graph._nodes[oneNode].directPredecessors = graph.predecessors(oneNode).length;
            graph._nodes[oneNode].directSuccessors = graph.successors(oneNode).length;
            graph._nodes[oneNode].score = graph._nodes[oneNode].directSuccessors + graph._nodes[oneNode].directPredecessors;
        }
    }
}

function nodeArrayToString(nodeArray) {
    var i,
        output = "";
    for (i=0; i<nodeArray.length; i++) {
        output += nodeArray[i].title;
    }
    return output;
}

function edgeArrayToString(edgeArray, parameter) {
    var i,
        output = "";
    for (i=0; i<edgeArray.length; i++) {
        output += edgeArray[i][parameter] + ", ";
    }
    return output;
}

/**
 * Prints all the nodes from a graph into a table
 * @param {Object} graph [[Description]]
 */
function printGraphTable(graph) {
    var dataColumns,
        columnRow,
        thead,
        data = [],
        table = $('<table id="nodeRankingTable">'),
        stage = getStage();


    for (var oneNode in graph._nodes) {
        if (graph._nodes.hasOwnProperty(oneNode)) {
            data.push(graph._nodes[oneNode]);
        }
    }

    dataColumns = [
            { data: 'id' },
            { data: 'label' },
            { data: 'level' },
            { data: 'type' },
            { data: 'directPredecessors' },
            { data: 'directSuccessors' },
            { data: 'inEdges' },
            { data: 'outEdges   ' },
            //{ data: 'questionsRight' },
            //{ data: 'questionsWrong' },
            { data: 'score' }
    ];

    thead =  $("<thead>");
    columnRow = $("<tr>");
    for (var i=0; i<dataColumns.length; i++) {
        columnRow.append($('<th>'+dataColumns[i].data+'</th>'));
    }

    thead.append(columnRow);
    table.append(thead);

    table.DataTable( {
        data: data,
        columns: dataColumns,
        paging: false
    } );

    table.insertAfter(stage);
}
/* rebuild
function getBestNodeFromTable() {
    calculateScore();
    var tableObject = $('#nodeRankingTable').DataTable();
    var scoreColumn = 4;
    tableObject.order([scoreColumn, 'asc']).draw();

    return tableObject.cell(1,scoreColumn).data(); //(row, column)
}

function calculateScore() {
    var tableObject = $('#nodeRankingTable').DataTable();
    tableObject.column(0).data().each( function ( value, index ) {
        tableObject.cell(index, 1).data("test").draw(); //(row, column)
    } );
}*/

function getStage() {
    if (stage === undefined) {
        stage = $('<div id=stage>'+
                    '<div id=contentFrame></div>'+
                    '<div id=controls><button type="button">yes</button><button type="button">no</button></div>'+
                  '</div>');
        $("body").append(stage);
        stageContext.actionCounter = 0;
        //$("#contentFrame", stage).append($("<p>do you understand:<b>"+getBestNodeFromTable()+"</b> </p>")); //no best node initialized yet
        $("button", stage).on("click", submitActionAndProceed);
    }
    function submitActionAndProceed(event, actionType){
        debugger;
        //getBestNodeFromTable(); //TODO

    }
    return stage;
}
