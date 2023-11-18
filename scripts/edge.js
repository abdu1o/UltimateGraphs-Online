var edgeMod = false;
var sourceNode = null;

function EdgePress() {
    var button = document.getElementById('button_edge');
    var field = document.getElementById('cy-container');

    edgeMod = !edgeMod;
    button.classList.toggle('active', edgeMod);
    field.style.cursor = edgeMod ? 'crosshair' : 'default';

    if (edgeMod) {
        SetEdge();
    } else {
        clearHandlers();
        sourceNode = null;
    }
}

function SetEdge() {
    if (!cy) {
        return;
    }

    clearHandlers();

    cy.ready(function () {
        cy.autoungrabify(true);

        cy.on('tap', 'node', function (e) {
            if (!sourceNode) {
                sourceNode = e.target;
                return;
            }

            var targetNode = e.target;

            var sourceNodeId = sourceNode ? sourceNode.id() : null;
            var targetNodeId = targetNode ? targetNode.id() : null;

            if (sourceNodeId === targetNodeId) {
                var edgeId = 'edge' + sourceNodeId + targetNodeId;

                if (!cy.getElementById(edgeId).length) {
                    cy.add({
                        group: 'edges',
                        data: {
                            id: edgeId,
                            source: sourceNodeId,
                            target: targetNodeId
                        }
                    }).style({
                        'width': 2,
                        'line-color': '#000000',
                        'curve-style': 'bezier',
                        'target-arrow-shape': 'triangle',
                        'target-arrow-color': '#000000'
                    });

                    var newEdgeElement = cy.getElementById(edgeId);

                    newEdgeElement.on('click', function (event) {
                        newEdgeElement.toggleClass('selected');

                        if (newEdgeElement.hasClass('selected')) {
                            newEdgeElement.style({
                                'line-color': '#daa520',
                                'target-arrow-color': '#daa520'
                            });
                        } else {
                            newEdgeElement.style({
                                'width': 2,
                                'line-color': '#000000',
                                'curve-style': 'bezier',
                                'target-arrow-shape': 'triangle',
                                'target-arrow-color': '#000000'
                            });
                        }
                    });
                }

                sourceNode = null;
            } else {
                if (sourceNodeId !== targetNodeId) {
                    var edgeId = 'edge' + sourceNodeId + targetNodeId;

                    if (!cy.getElementById(edgeId).length) {
                        cy.add({
                            group: 'edges',
                            data: {
                                id: edgeId,
                                source: sourceNodeId,
                                target: targetNodeId
                            }
                        }).style({
                            'width': 2,
                            'line-color': '#000000',
                            'curve-style': 'bezier',
                            'target-arrow-shape': 'triangle',
                            'target-arrow-color': '#000000'
                        });

                        var newEdgeElement = cy.getElementById(edgeId);

                        newEdgeElement.on('click', function (event) {
                            newEdgeElement.toggleClass('selected');

                            if (newEdgeElement.hasClass('selected')) {
                                newEdgeElement.style({
                                    'line-color': '#daa520',
                                    'target-arrow-color': '#daa520'
                                });
                            } else {
                                newEdgeElement.style({
                                    'width': 2,
                                    'line-color': '#000000',
                                    'curve-style': 'bezier',
                                    'target-arrow-shape': 'triangle',
                                    'target-arrow-color': '#000000'
                                });
                            }
                        });
                    }

                    sourceNode = null;
                }
            }
        });

        cy.on('tap', function (e) {
            if (e.target === cy) {
                sourceNode = null;
            }
        });
    });
}

function clearHandlers() 
{
    cy.off('tap', 'node');
    cy.off('tap');
    cy.autoungrabify(false);
}

function labelEdges() 
{
    var edges = cy.edges();

    edges.forEach(function (edge, index) 
    {
        if (edge.data('label')) 
        {
            var label = '';
            edge.data('label', label);
        }
        else 
        {
            var label = 'E' + (index + 1);
            edge.data('label', label);
        }
    });

    cy.style()
        .selector('edge')
        .style({
            'label': 'data(label)',
            'text-margin-y': '-10px',
            'font-size': '10px',
            'font-family': 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'
        })
        .update();
}
