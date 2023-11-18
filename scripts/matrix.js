
function generateAdjacenciesMatrix() 
{
    if (!cy) 
    {
        return;
    }

    var nodes = cy.nodes();
    var edges = cy.edges();
    
    var nodeCount = nodes.length;
    var incidenceMatrix = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(0));

    edges.forEach(function (edge) 
    {
        var sourceIndex = nodes.indexOf(edge.source());
        var targetIndex = nodes.indexOf(edge.target());

        if (sourceIndex !== -1 && targetIndex !== -1) 
        {
            incidenceMatrix[sourceIndex][targetIndex] = 1;
        }
    });

    return incidenceMatrix;
}

function updateMatrixInput() 
{
    var matrixInput = document.getElementById('matrixInput');
    var incidenceMatrix = generateAdjacenciesMatrix();

    var matrixText = incidenceMatrix.map(row => row.join(' ')).join('\n');

    matrixInput.value = matrixText;
}

function graphToIncidenceMatrix(cy) 
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

        incidenceMatrix[sourceIndex][j] = 1;
        incidenceMatrix[targetIndex][j] = 0;
    }

    return incidenceMatrix;
}

