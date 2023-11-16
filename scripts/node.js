var nodeMode = false;

function NodePress() {
    var button = document.getElementById('button_node');
    var field = document.getElementById('cy-container');

    nodeMode = !nodeMode;
    button.classList.toggle('active', nodeMode);
    field.style.cursor = nodeMode ? 'crosshair' : 'default';
}

function createSingleNode(event) {
    if (nodeMode) {
        cy = cy ? cy : cytoscape({ container: document.getElementById('cy') });

        var evt = event.touches ? event.touches[0] : event;
        var position = cy.renderer().projectIntoViewport(evt.clientX, evt.clientY);
        var nodeId = 'singleNode' + Date.now(); 

        createdNodes = cytoscape({});

        var newNode = {
            group: 'nodes',
            data: { id: nodeId, count: cy.nodes().length + 1 },
            position: { x: position[0], y: position[1] }
        };

        cy.add(newNode);
        createdNodes.add(newNode);

        cy.style().selector('#' + nodeId).css({
            'label': 'data(count)',
            'background-color': '#520775',
            'border-width': 1,
            'border-color': '#33034a',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': 'black',
            'font-size': '12px'
        });

        var newNodeElement = cy.getElementById(nodeId);
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

        cy.style().update();

        if (cy.nodes().length > 0) {
            applyGlowEffect();
        } else {
            removeGlowEffect();
        }
    }
}


