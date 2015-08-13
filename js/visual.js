/*global $, vis, importer, parser */



function getAttributeFromDot(node, attribute) {
    var returnValue; // = undefined;
    if (node.hasOwnProperty("comment")) {
        var attributeField = node.comment;
        var attributeArray = attributeField.split(";");
        /*              console.log(node);
                        console.log(attributeArray[0]);
                        if (node.label === " Tabs") debugger; */
        switch (attribute) {
        case "level":
            returnValue = parseInt(attributeArray[0]);
            break;
        }
    }
    return returnValue;
}

function visualize(url) {
    $("#nodeCanvas").height($(document).height() - 16);
    importer.loadData(url, function (gdata) {
        var dotdata = parser.parseToDOT(gdata);

        var container = document.getElementById('nodeCanvas');
        var data = vis.network.convertDot(dotdata);




        if (data.nodeHash === undefined) {
            var hashToBuild = {};
            var oneNode;

            for (var i = 0; i < data.nodes.length; i++) {
                oneNode = data.nodes[i];
                hashToBuild[oneNode.id] = oneNode;
                hashToBuild[oneNode.id].level = getAttributeFromDot(oneNode, "level");
            }
            data.nodeHash = hashToBuild;
        }

        var options = {
            nodes: {
                borderWidth: 1,
                borderWidthSelected: undefined,
                brokenImage: undefined,
                color: {
                    highlight: {
                        border: '#049a21',
                        background: '#40eb61'
                    },
                    hover: {
                        border: '#2B7CE9',
                        background: '#D2E5FF'
                    }
                },
                shape: 'box'

            },
            layout: {
                randomSeed: undefined,
                hierarchical: {
                    enabled: true,
                    levelSeparation: 150,
                    direction: 'LR', // UD, DU, LR, RL
                    sortMethod: 'directed' // hubsize, directed
                }
            }
        };

        var network = new vis.Network(container, data, options);




        network.on("click", function (params) {
            if (typeof params.nodes[0] !== "undefined") {

                var selectedNode = data.nodeHash[params.nodes[0]];

                var nodeData = "";
                for (var property in selectedNode) {
                    if (selectedNode.hasOwnProperty(property)) {
                        nodeData += '<p><b>' + property + ':</b> ' + selectedNode[property].toString() + "</p>\n";
                    }
                }

                document.getElementById('eventDiv').innerHTML = '<h2>[Debug info]</h2>' +
                    nodeData;
            }
        });

    });

}
