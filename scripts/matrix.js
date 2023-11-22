
function generateAdjacenciesMatrix() 
{
    if (!cy) 
    {
        return;
    }

    var nodes = cy.nodes();
    var edges = cy.edges();
    
    var nodeCount = nodes.length;
    var adjacencyMatrix = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(0));

    edges.forEach(function (edge) 
    {
        var sourceIndex = nodes.indexOf(edge.source());
        var targetIndex = nodes.indexOf(edge.target());

        if (sourceIndex !== -1 && targetIndex !== -1) 
        {
            adjacencyMatrix[sourceIndex][targetIndex] = 1;
        }
    });

    return adjacencyMatrix;
}

function generateAdjacencyList() {
    if (!cy) {
        return;
    }

    const nodes = cy.nodes();
    const adjacencyList = {};

    nodes.forEach(node => {
        const neighbors = node.outgoers().map(neighbor => {
            const neighborIndex = customIndexOf(nodes, neighbor.target());
            return neighborIndex !== undefined ? neighborIndex + 1 : null;
        });

        const nodeIndex = customIndexOf(nodes, node) + 1;
        adjacencyList[nodeIndex] = neighbors.filter(neighbor => neighbor !== null);
    });

    return adjacencyList;
}


function customIndexOf(array, element) {
    const index = array.findIndex(item => item === element);
    return index !== -1 ? index : undefined;
}

function updateMatrixInput(choice) 
{
    var matrixInput = document.getElementById('matrixInput');
    var newText;

    switch (choice) 
    {
        case 1:
            newText = generateAdjacenciesMatrix();
            break;
        case 2:
            newText = generateIncidenceMatrix();
            break;
        case 3:
            newText = generateAdjacencyList();
            break;
    }

    matrixInput.value = convertToText(newText);
}

function convertToText(matrix) 
{
    if (Array.isArray(matrix)) 
    {
        return matrix.map(row => row.join(' ')).join('\n');
    } 
    else if (typeof matrix === 'object') 
    {
        return Object.keys(matrix).map(nodeId => {
            const neighbors = matrix[nodeId].join(' ⇒ ');
            return `${nodeId} ⇒ ${neighbors}`;
        }).join('\n');
    }

    return '';
}

function generateIncidenceMatrix() 
{
    var nodes = cy.nodes();
    var edges = cy.edges();

    var incidenceMatrix = [];

    for (var i = 0; i < nodes.length; i++) 
    {
        incidenceMatrix[i] = [];

        for (var j = 0; j < edges.length; j++) 
        {
            incidenceMatrix[i][j] = 0;
        }
    }

    for (var j = 0; j < edges.length; j++) 
    {
        var edge = edges[j];
        var sourceIndex = nodes.indexOf(edge.source());
        var targetIndex = nodes.indexOf(edge.target());

        if (sourceIndex !== -1) 
        {
            incidenceMatrix[sourceIndex][j] = 1;
        }

        if (targetIndex !== -1) 
        {
            incidenceMatrix[targetIndex][j] = -1;
        }
    }

    return incidenceMatrix;
}

