
// Currency constants.
const generator_cost_ratio = 1.1;

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

// Function that buys as many generators of index luis_index as specified by the store multiplier.
function BuyLuis(luis_index)
{
    let luis = luises[luis_index];

    // If we are buying a fixed quantity, restrict to the amount bought. Otherwise, buy MAX.
    var quantity_to_buy = 0;
    if (current_store_multiplier.constant_quantity)
        quantity_to_buy = current_store_multiplier.value;
        
    var quantity_bought = 0;
    while (makis >= luis.cost && (quantity_to_buy == 0 || quantity_to_buy > quantity_bought))
    {
        // First we pay for it.
        makis -= luis.cost;
    
        // Then we increase the counter
        ++luis.amount;
    
        // Increase cost for the next one, using Math.ceil() to round up
        luis.cost = Math.ceil(luis.cost * generator_cost_ratio);

        ++quantity_bought;
    }
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
    $('#luis0').prop('disabled', !CanAfford(makis, luises[0].cost, generator_cost_ratio));
    $('#luis1').prop('disabled', !CanAfford(makis, luises[1].cost, generator_cost_ratio));
    $('#luis2').prop('disabled', !CanAfford(makis, luises[2].cost, generator_cost_ratio));
    $('#luis3').prop('disabled', !CanAfford(makis, luises[3].cost, generator_cost_ratio));

    // Update secondary currency.
    UpdateRubiesUI();
}