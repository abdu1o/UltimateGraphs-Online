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
            updateMatrixInput();
            break;
        
        default:
            break;
    }
}
        