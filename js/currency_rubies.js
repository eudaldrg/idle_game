
/// Variable to keep track of the number of rubies owned.
var rubies = 0;

/// Adds a ruby to the given element in the html using jquery.
function AddRubyIcon(element)
{
    element.append("<span class=\'fa fa-diamond' style=color:red></span>");
}

function UpdateRubiesUI()
{
    $('#rubies-count').css('display', rubies == 0 ? 'none' : 'block');
    $('#rubies-count').text('Rubies = '+ FormatNumber(rubies));
    AddRubyIcon($('#rubies-count'));
}