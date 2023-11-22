var targetNode = 0;
var startNode = 0;

function Selector() 
{
    var dropdown = document.getElementById('Dropdown');
    var selectedValue = dropdown.value;

    switch (selectedValue) 
    {
        case '1':
            labelEdges();
            break;

        case '2':
            updateMatrixInput(1);
            break;

        case '3':
            updateMatrixInput(2);
            break;

        case '4':
            updateMatrixInput(3);
            break;

        case '5':
            showFullPath();
            break;
        
        default:
            break;
    }
}
      
function openPopup() 
{
    document.getElementById('popup').style.display = 'block';
}

function closePopup() 
{
    document.getElementById('popup').style.display = 'none';
}

function showFullPath() 
{
    const graph = cy;

    const fullPath = [];
    const stack = [];
    const degrees = {};

    graph.nodes().forEach((node, index) => {
        const degree = node.degree();
        degrees[node.id()] = degree;
    });

    const startNode = graph.nodes()[0];
    stack.push(startNode.id());

    while (stack.length > 0) {
        const currentNodeId = stack[stack.length - 1];

        const neighbors = graph.getElementById(currentNodeId).neighborhood().jsons();
        const nextNode = neighbors.find(neighbor => degrees[neighbor.data.id] > 0);

        if (nextNode) {
            stack.push(nextNode.data.id);
            degrees[currentNodeId]--;
            degrees[nextNode.data.id]--;

            const edgeId = `${currentNodeId}${nextNode.data.id}`;
            graph.getElementById(edgeId).remove();
        } else {
            const poppedNodeId = stack.pop();
            fullPath.unshift(graph.nodes().indexOf(graph.getElementById(poppedNodeId)) + 1);
        }
    }

    const resultElement = document.getElementById('matrixInput');
    resultElement.value = 'General path: ' + fullPath.join(' ⇒ ');
}







