var cy;

function generateGraph() 
{
    var matrixInput = document.getElementById('matrixInput').value;
    var adjacencyMatrix = parseMatrixInput(matrixInput);

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
                    'target-arrow-color': '#000000'
                }
            }
        ]
    });

    if (cy.nodes().length > 0) 
        {
            applyGlowEffect();
        }
        else
        {
            removeGlowEffect();
        }
}

function СlearGraph() 
{
    var cyContainer = document.getElementById('cy');
    cyContainer.innerHTML = '';

    cy = cytoscape({ container: cyContainer });
    removeGlowEffect();
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
    var field = document.getElementById('cy-container');
 
    if (!nodeMode) 
    {
        nodeMode = true;
        button.classList.add('active');
        field.style.cursor = 'crosshair';
    } 
    else 
    {
        nodeMode = false;
        button.classList.remove('active');
        field.style.cursor = 'default';
    }
}

function createSingleNode(event) 
{
    if(nodeMode)
    {
        cy = cy ? cy : cytoscape({ container: document.getElementById('cy') });

        var evt = event.touches ? event.touches[0] : event;
    
        var position = cy.renderer().projectIntoViewport(evt.clientX, evt.clientY);
    
        var nodeId = 'singleNode' + cy.nodes().length;
    
        cy.add({
            group: 'nodes',
            data: { id: nodeId, count: cy.nodes().length + 1 },
            position: { x: position[0], y: position[1] }
        });
    
        cy.style().selector('#' + nodeId).css({
            'label': 'data(count)',
            'background-color': '#520775',
            'border-width': 1,
            'border-color': '#33034a',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': 'black',
            'font-size': '12px'
        }).update();

        if (cy.nodes().length > 0) 
        {
            applyGlowEffect();
        }
        else
        {
            removeGlowEffect();
        }
    }
}

function applyGlowEffect() 
{
    var field = document.getElementById('cy-container');
    field.style.transition = '0.2s';
    field.style.boxShadow = '0 0 10px rgba(0, 0, 0, 1), 0 0 20px rgba(95, 0, 143, 0.8)';
}

function removeGlowEffect() 
{
    var field = document.getElementById('cy-container');
    field.style.transition = '0.25s';
    field.style.boxShadow = '0 0 10px rgba(0, 0, 0, 1)';
}

document.getElementById('cy-container').addEventListener('click', createSingleNode);



