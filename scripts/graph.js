var cy;
var createdNodes = cytoscape({});
let disableEdgeMode;
let graphData = {};

function generateGraph() {
    var matrixInput = document.getElementById('matrixInput').value;
    var adjacencyMatrix = parseMatrixInput(matrixInput);

    createdNodes = cytoscape({});

    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: GenerateElementsFromMatrix(adjacencyMatrix),
        layout: { name: 'cose' },
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(node_count)',
                    'background-color': '#520775',
                    'border-width': 1,
                    'border-color': '#33034a',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'color': 'black',
                    'font-size': '12px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#000000',
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': '#000000',
                }
            },
            {
                selector: 'node:selected',
                style: {
                    'border-color': '#daa520',
                    'color': '#daa520',
                    'border-width': 1,
                }
            },
            {
                selector: 'edge:selected',
                style: {
                    'line-color': '#daa520',
                    'target-arrow-color': '#daa520',
                }
            }
        ]
    });

    cy.nodes().on('click', function (event) {
        event.target.toggleClass('selected');
    });

    cy.edges().on('click', function (event) {
        event.target.toggleClass('selected');
    });

    if (cy.nodes().length > 0) {
        applyGlowEffect();
    } else {
        removeGlowEffect();
    }

    cy.nodes().forEach(node => {
        const nodeId = node.id();
        const neighbors = node.neighborhood().nodes().map(neighbor => neighbor.id());
        graphData[nodeId] = neighbors;
    });

    
    console.log('Graph Data:', graphData);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
        removeSelectedElements();
        updateGlowEffect();
    }
});

function parseMatrixInput(input) {
    var rows = input.trim().split('\n');
    var matrix = rows.map(row => row.trim().split(/\s+/).map(Number));
    return matrix;
}

function GenerateElementsFromMatrix(matrix) {
    var elements = [];

    for (var i = 0; i < matrix.length; i++) {
        var node = { data: { id: 'node' + (i + 1), node_count: i + 1 } };
        elements.push(node);
        createdNodes.add(node);

        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                elements.push({
                    data: {
                        id: 'edge' + i + j,
                        source: 'node' + (i + 1),
                        target: 'node' + (j + 1),
                        weight: 1
                    }
                });
            }
        }
    }

    return elements;
}

function СlearGraph() {
    var cyContainer = document.getElementById('cy');
    cyContainer.innerHTML = '';

    cy = cytoscape({ container: cyContainer });
    createdNodes = cytoscape({});
    removeGlowEffect();
}

function removeSelectedElements() {
    var selectedNodes = cy.nodes('.selected');
    var selectedEdges = cy.edges('.selected');

    var deletedNodeNumbers = selectedNodes.map(node => parseInt(node.data('node_count')));

    createdNodes.remove(selectedNodes);
    createdNodes.remove(selectedEdges);

    cy.remove(selectedNodes);
    cy.remove(selectedEdges);

    cy.nodes().forEach(function (node) {
        var currentNumber = parseInt(node.data('node_count'));
        if (currentNumber > Math.max(...deletedNodeNumbers)) {
            var newNumber = currentNumber - deletedNodeNumbers.filter(num => num < currentNumber).length;
            var newId = 'node' + newNumber;

            while (cy.getElementById(newId).length > 0) {
                newNumber++;
                newId = 'node' + newNumber;
            }

            node.data('id', newId);
            node.data('node_count', newNumber);

            var newNodeElement = cy.getElementById(newId);
            newNodeElement.off('click');
            newNodeElement.on('click', function (event) {
                newNodeElement.toggleClass('selected');

                if (newNodeElement.hasClass('selected')) {
                    newNodeElement.style({
                        'border-color': '#daa520',
                        'color': '#daa520',
                        'border-width': 1,
                    });
                } else {
                    newNodeElement.style({
                        'background-color': '#520775',
                        'border-color': '#33034a',
                        'color': 'black'
                    });
                }
            });
        }
    });

    cy.$(':selected').unselect();
    updateGlowEffect();
}
