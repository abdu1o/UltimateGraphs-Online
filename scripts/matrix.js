
function generateIncidenceMatrix() 
{
    if (!cy) {
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

function updateMatrixInput() {
    var matrixInput = document.getElementById('matrixInput');
    var incidenceMatrix = generateIncidenceMatrix();

    var matrixText = incidenceMatrix.map(row => row.join(' ')).join('\n');

    matrixInput.value = matrixText;
}
