/*global AbilityLoft, graphlib */
var contentGraphPublic;
/* JavaScript Boilerplate main scripting file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */


/* parser (function namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */

(function (parser, $) {
    'use strict';

    /**
     * Logging function, for debugging mode
     */
    $.log = function (message) {
        if (AbilityLoft.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        }
        /*else {
            alert(message);
        }*/
    };

    /**
     * Private properties, eg.
     *  var name = 'bla',
     *      age = 30;
     */
    var currentNode,
        currentDependency,
        currentDependencyArray,
        assignedUuids = {},
        uuid;


    /**
     * Private methods, e.g.
     *  var getName = function() {
     *      return 'My name is ' + name + ', I am ' + age + ' old.';
     *  };
     */
    var getUUID = function (nodeName) {
        if (assignedUuids[nodeName] === undefined) {
            assignedUuids[nodeName] = generateUUID();
        }
        return assignedUuids[nodeName];
    };


    /**
     * [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    var generateUUID = function () {
        var d = new Date().getTime();
        //var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { shorten:
        var uuid = 'ed_x-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        if (assignedUuids[uuid] === undefined) { //check if unique
            assignedUuids[uuid] = true;
        } else { //(recursively) get a new one
            assignedUuids = parser.subHelper.generateUUID();
        }
        return uuid;
    };

    var getDot = function (dataGraph) {

        var label,
            dot = "strict digraph { \n" +
            "rankdir = LR;\n" +
            "//comment is a datafield with the following specification: 'level [;otherattributes]'\n";

        dataGraph.nodes().map(function (oneNode) {
            label = dataGraph.node(oneNode).label.replace(/\"/g, '\''); //TODO more robust, please.
            dot += '\t"' + oneNode + '" [label="' + label + '", comment="' + dataGraph.node(oneNode).level + ';0;0", ' + getNodeDotStyle(dataGraph.node(oneNode)) + ']\n';
        });
        dataGraph.edges().map(function (oneEdge) {
            dot += "\t\"" + oneEdge.v + "\" -> \"" + oneEdge.w + "\"\n";
        });
        dot += getRanks(dataGraph);
        dot += "}";

        return dot;
    };

    var getNodeDotStyle = function (node) {
        var borderColor = '#2B7CE9'; //default
        var backgroundColor = '#97C2FC'; //default
        //var highlightBorder = '#049a21';        //default
        //var highlightBackground = '#40eb61';    //default
        //var hoverBorder = '#2B7CE9';            //default
        //var hoverBackground = '#D2E5FF';        //default

        switch (node.type) {
        case "externalDependency":
            borderColor = '#ffa500';
            backgroundColor = '#ffbc41';
            break;
        case "inactive":
            borderColor = '#5a5a5a';
            backgroundColor = '#cccccc';
            break;
        }

        return 'color="' + backgroundColor + '"';
    };

    var getRanks = function (sourceGraph) {
        var nodeId,
            nodeLevel,
            i,
            nodesOnLevel = {},
            ranks = "";

        for (i = 0; i < sourceGraph.nodes().length; i++) {
            nodeId = sourceGraph.nodes()[i]; //TODO this could perform a lot faster... but i don't get it right now
            nodeLevel = sourceGraph.node(nodeId).level;
            if (nodesOnLevel[nodeLevel] === undefined) {
                nodesOnLevel[nodeLevel] = [];
            }
            nodesOnLevel[nodeLevel].push(nodeId);
        }

        for (var property in nodesOnLevel) {
            if (nodesOnLevel.hasOwnProperty(property)) {
                ranks += '\t{rank = same; "';
                ranks += nodesOnLevel[property].join('"; "');
                ranks += '";}\n';
            }
        }

        return ranks;
    };

    var setNodeLevels = function (dataGraph) {
        var allNodes = dataGraph.nodes(),
            currentNode,
            currentLevel = 1,
            i,
            j,
            predecessors,
            successors,
            nodeLevelCache = [],
            nodeName,
            nodesToDo = [],
            nodesNextLevel = [],
            continueLoop = true;


        for (i in allNodes) {
            currentNode = allNodes[i];
            dataGraph.node(currentNode).level = 0;

            predecessors = dataGraph.predecessors(currentNode);
            successors = dataGraph.successors(currentNode);
            if (predecessors.length === 0 && successors.length > 0) { //no dependency & being required -> work with that
                nodesToDo.push(currentNode); //these are the starting points to traverse the graph
            }
        } //TODO bad loop


        do {
            if (AbilityLoft.config.debug){
                console.log("---Current Level: " + currentLevel + "---");
                console.log("NodesToDo: " + nodesToDo.toString());
            }

            currentLevel++;
            nodesNextLevel = [];

            while (nodesToDo.length > 0) {
                currentNode = nodesToDo.pop();
                if (AbilityLoft.config.debug){
                    console.log("popping " + currentNode);
                }
                if (currentLevel === 100) {
                    console.warn("Level calculation exceeded 1000, removing nodeToDo");
                    nodesNextLevel = [];
                    nodesToDo = [];
                    //TODO ZIRKELBEZUG

                }
                dataGraph.node(currentNode).level = currentLevel;

                successors = dataGraph.successors(currentNode);
                if (successors.length > 0) { //add successors
                    for (j = 0; j < successors.length; j++) {
                        if (nodesNextLevel.indexOf(successors[j]) < 0) { //don't add dupplicates

                            //create reference to modules which are already in graph
                            if (dataGraph.node(successors[j]).graphPredecessors === undefined) {
                                dataGraph.node(successors[j]).graphPredecessors = [];
                            }
                            dataGraph.node(successors[j]).graphPredecessors.push(currentNode);

                            nodesNextLevel.push(successors[j]);
                            if (AbilityLoft.config.debug){
                                console.log("pushing " + successors[j]);
                            }
                        }
                    }
                }
            }

            nodesToDo = nodesNextLevel.slice();

        } while (nodesNextLevel.length > 0);


    };

    var setCustomDatafields = function (dataGraph) {
        dataGraph._customData = {};

        var dataColumns = []; //TODO: this is incredibly slow...
        for (var oneNode in dataGraph._nodes) {
            if (dataGraph._nodes.hasOwnProperty(oneNode)) {
                for (var oneProperty in dataGraph._nodes[oneNode]) {
                    if (dataGraph._nodes[oneNode].hasOwnProperty(oneProperty)) {
                        if (dataColumns.indexOf(oneProperty) < 0) {
                            dataColumns.push(oneProperty);
                        }
                    }
                }

            }
        }
        dataGraph._customData.dataColumns = dataColumns;
    };

    /**
     * Public methods and properties, e.g.
     *  parser.title = 'Interactive Developer';
     *  parser.sayHello = function() {
     *      return "Hello World!";
     *  };
     */
    parser.parseToDOT = function (rawData) {
        var cGraph = parser.getContentGraph(rawData);
        var dotData = getDot(cGraph);

        return dotData;
    };

    parser.getContentGraph = function(rawData) {
        var i,
            j,
            options = { //TODO: Do we need this?
                importer: 'sheetrock',
                convert: true
            },
            contentGraph = new graphlib.Graph();

        for (i = 0; i < rawData.rows.length; i++) { //1st run: nodes
            contentGraph.setNode(rawData.rows[i].id, {
                'id': rawData.rows[i].id,
                'label': rawData.rows[i].title,
                'type': 'standard'
            });
        }
        for (i = 0; i < rawData.rows.length; i++) { //2nd run: edges
            currentNode = rawData.rows[i];
            currentDependencyArray = rawData.rows[i].dependencies;

            if (currentDependencyArray.length > 0) { //-> is array and contains dependencies
                for (j = 0; j < currentDependencyArray.length; j++) { //get 'em all :-)
                    currentDependency = rawData.rows[i].dependencies[j];
                    if (currentDependency === "") {
                        continue;
                    }
                    if (parser.subHelper.isIdValue(currentDependency)) { //does it refer to an ID?
                        contentGraph.setEdge(
                            currentDependency, //from dependency
                            currentNode.id //to current node
                        );
                    } else { //it must be an external reference
                        uuid = getUUID(currentDependency);
                        contentGraph.setNode(uuid, {
                            'id': uuid,
                            'label': currentDependency,
                            'type': 'externalDependency'
                        });
                        contentGraph.setEdge(
                            uuid, //from newly created node
                            currentNode.id //to current node
                        );
                    }
                }
            } else {
                console.log("node " + rawData[i].id + " (id: " + rawData[i].title + ") has no dependencies.");
            }
        }

        setNodeLevels(contentGraph);
        setCustomDatafields(contentGraph);

        return contentGraph;
    };

    /*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
     */
    parser.subHelper = (function () {
        function _subHelper() {

            /**
             * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
             * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
             */
            /*jshint validthis: true */

            /*
             * Sub-Functions, call with "parser.subHelper.function()" eg.
             *  this.shout = function (example) {
             *      return example.toUpperCase();
             *  };
             */
            this.isIdValue = function (value) {
                return !isNaN(value) && (function (x) {
                    return (x | 0) === x;
                })(parseFloat(value)); //http://stackoverflow.com/a/14794066
            };

            /**
             * Initialize the object
             */
            this.init = function () {
                //do everything which needs to be done for init, eg
                //_this.getDomain();

                return this; /*this refers to parser.subHelper*/
            };
            return this.init(); /*initialize the init()*/
        }
        return new _subHelper(); /*creating a new object of subHelper rather then a funtion*/
    }());

    /**
     * Check to evaluate whether 'parser' exists in the global namespace - if not, assign window.parser an object literal
     */
}(window.parser = window.parser || {}, jQuery));
