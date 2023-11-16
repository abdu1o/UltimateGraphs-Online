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

function updateGlowEffect()
{
    if (cy.nodes().length === 0)
    {
        removeGlowEffect();
    }
}

document.getElementById('cy-container').addEventListener('click', createSingleNode);