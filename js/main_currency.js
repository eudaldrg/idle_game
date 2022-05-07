
// Initialize the different generators.
var luises = []
for (let luis_index = 0; luis_index < 4; ++luis_index)
{
    let luis = {
        cost : 5**(luis_index + 1),
        bought : 0,
        amount : 0,
        mult : 1
    }
    luises.push(luis);
}

// Function that buys a generator of index luis_index.
function BuyLuis(luis_index)
{
    let luis = luises[luis_index];

    // First we pay for it.
    makis -= luis.cost;

    // Then we increase the counter
    ++luis.amount;

    // Increase cost for the next one, using Math.ceil() to round up
    luis.cost = Math.ceil(luis.cost * 1.1);
}

// Add the buttons' actions to buy generators.
$('#luis0').on('click', function () { BuyLuis(0); });
$('#luis1').on('click', function () { BuyLuis(1); });
$('#luis2').on('click', function () { BuyLuis(2); });
$('#luis3').on('click', function () { BuyLuis(3); });


// Main function to update the currency.
function UpdateCurrency(time_since_last_update_in_seconds)
{
    makis_per_second = luises[0].amount * luises[0].mult;
    for (let luis_index = 1; luis_index < luises.length; ++luis_index) {
        let luis_gakusei = luises[luis_index - 1];
        let luis_sensei = luises[luis_index];
        luis_gakusei.amount += luis_sensei.amount * luis_sensei.mult / 5 * time_since_last_update_in_seconds
    }
    makis += makis_per_second * time_since_last_update_in_seconds;
}

// Updates the display of the currency related objects.
function UpdateCurrencyUI()
{
    // Update the widgeteers with their current prices
    $('#luis0').text('Hire Luis('+ FormatNumber(luises[0].amount) +') - ' + FormatNumber(luises[0].cost));
    $('#luis1').text('Hire Peneman Garcia('+ FormatNumber(luises[1].amount) +') - ' + FormatNumber(luises[1].cost));
    $('#luis2').text('Hire Master of Dating Sims('+ FormatNumber(luises[2].amount) +') - ' + FormatNumber(luises[2].cost));
    $('#luis3').text('Hire Touchpad Sensei('+ FormatNumber(luises[3].amount) +') - ' + FormatNumber(luises[3].cost));

    // Enable/disable the widgeteer buttons based on our numWidgets
    $('#luis0').prop('disabled', luises[0].cost > makis);
    $('#luis1').prop('disabled', luises[1].cost > makis);
    $('#luis2').prop('disabled', luises[2].cost > makis);
    $('#luis3').prop('disabled', luises[3].cost > makis);
}