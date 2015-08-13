/*global $, importer, parser */
var stage;

/**
 * -> Entry Point
 * Starts the staging process
 * @param {[[Type]]} url [[Description]]
 */
function stageData(url) {

    importer.loadData(url, function (gdata) {
        var graph = parser.getContentGraph(gdata);
        printGraphTable(graph);
    });
}


/**
 * Prints all the nodes from a graph into a table
 * @param {Object} graph [[Description]]
 */
function printGraphTable(graph) {

    var columns,
        columnRow,
        thead,
        data = [],
        table = $('<table>'),
        stage = getStage();


    for (var oneNode in graph._nodes) {
        if (graph._nodes.hasOwnProperty(oneNode)) {
            graph._nodes[oneNode].id = oneNode;
            data.push(graph._nodes[oneNode]);
        }
    }

    columns = [
            { data: 'id' },
            { data: 'label' },
            { data: 'level' },
            { data: 'type' }
    ];

    thead =  $("<thead>");
    columnRow = $("<tr>");
    for (var i=0; i<columns.length; i++) {
        columnRow.append($('<th>'+columns[i].data+'</th>'));
    }
    thead.append(columnRow);
    table.append(thead);

    table.DataTable( {
        data: data,
        columns: [
            { data: 'id' },
            { data: 'label' },
            { data: 'level' },
            { data: 'type' }
    ],
        paging: false
    } );

    /*for (var oneNode in graph._nodes) {
        if (graph._nodes.hasOwnProperty(oneNode)) {
            row = $('<tr>');
            for (var oneProperty in graph._nodes[oneNode]) {
                if (graph._nodes[oneNode].hasOwnProperty(oneProperty)) {
                    row.append($('<td>'+graph._nodes[oneNode][oneProperty]+'</td>'));
                }
            }
            table.append(row);
        }
    }*/

    stage.append(table);
}


function getStage() {
    if (stage === undefined) {
        stage = $('<div id=stage></div>');
        $("body").append(stage);
    }
    return stage;
}
