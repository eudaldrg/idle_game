
/// Variable to keep track of the number of rubies owned.
var rubies = 0;

function UpdateRubiesUI()
{
    $('#rubies-count').text('Rubies = '+ FormatNumber(rubies));
}