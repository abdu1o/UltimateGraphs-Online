function generateGraph() 
{
    var matrixInput = document.getElementById('matrixInput').value;
    var adjacencyMatrix = parseMatrixInput(matrixInput);

    var cy = cytoscape({
        container: document.getElementById('cy'),
        elements: GenerateElementsFromMatrix(adjacencyMatrix),
        layout: { name: 'cose' },
        style: [
            {
                selector: 'node',
                style: 
                {
                    'background-color': '#520775',
                    'label': 'data(node_count)',
                    'border-width': 1,
                    'border-color': '#33034a',
                    'text-valign': 'center', 
                    'text-halign': 'center', 
                }
            },
            {
                selector: 'edge',
                style: 
                {
                    'width': 2,
                    'line-color': '#000000',
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': '#000000'
                }
            }
        ]
    });
}

function СlearGraph() 
{
    var cyContainer = document.getElementById('cy');
    cyContainer.innerHTML = '';
}

function parseMatrixInput(input) 
{
    var rows = input.trim().split('\n');
    var matrix = rows.map(row => row.trim().split(/\s+/).map(Number));
    return matrix;
}

function GenerateElementsFromMatrix(matrix) 
{
    var elements = [];

    for (var i = 0; i < matrix.length; i++) {
        elements.push({ data: { id: 'node' + (i + 1), node_count: i + 1 } });

        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                elements.push({
                    data: {
                        id: 'edge' + i + j,
                        source: 'node' + (i + 1),
                        target: 'node' + (j + 1)
                    }
                });
            }
        }
    }

    return elements;
}

var nodeMode = false;

function NodePress()
{
    var button = document.getElementById('button_node');
 
    if (!nodeMode) 
    {
        nodeMode = true;
        button.style.border = '3px solid #5f008f';
        button.style.boxShadow = '0 0 10px rgba(0, 0, 0, 1), 0 0 20px rgba(95, 0, 143, 0.8)';

    } 
    else 
    {
        nodeMode = false;
        button.style.border = '3px solid #410061';
        button.style.boxShadow = '0 0 10px rgba(0, 0, 0, 1)';
    }
}
