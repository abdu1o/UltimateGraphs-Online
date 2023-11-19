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
            findShortestPath();
            break;
        
        default:
            break;
    }
}
      
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
