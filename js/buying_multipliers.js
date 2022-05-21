
// Initialize the values of the possible multipliers to buy.
const store_multipliers =
{
    MultiplierX1:
    {
        constant_quantity: true,
        value: 1
    },
    MultiplierX10:
    {
        constant_quantity: true,
        value: 10
    },
    MultiplierX100:
    {
        constant_quantity: true,
        value: 100
    },
    MultiplierMAX:
    {
        constant_quantity: false
    }
}
var current_store_multiplier = store_multipliers.MultiplierX1;

// On button click, set the correct multiplier.
$('#buy_store_mult_x1').on('click', function() { current_store_multiplier = store_multipliers.MultiplierX1; });
$('#buy_store_mult_x10').on('click', function() { current_store_multiplier = store_multipliers.MultiplierX10; });
$('#buy_store_mult_x100').on('click', function() { current_store_multiplier = store_multipliers.MultiplierX100; });
$('#buy_store_mult_max').on('click', function() { current_store_multiplier = store_multipliers.MultiplierMAX; });



// Function that tells whether we can afford to buy from an object with the given base cost and cost growth ratio.
function CanAfford(current_currency, base_cost, cost_growth_ratio)
{
    // If the store multiplier is MAX, then we can buy as soon as we can buy 1.
    if (current_store_multiplier == store_multipliers.MultiplierMAX)
        return base_cost <= current_currency;

    // Otherwise, we will need to check whether we can afford x of the given objects.
    var total_cost = 0;
    var current_cost = base_cost;
    for (let i = 0; i < current_store_multiplier.value; ++i)
    {
        total_cost += current_cost;
        current_cost = Math.ceil(current_cost * cost_growth_ratio);
    }
    return total_cost <= current_currency;
}


function UpdateBuyingMultUI()
{
    $('#buy_store_mult_x1').css('background-color', current_store_multiplier == store_multipliers.MultiplierX1 ? 'darkgray' : 'lightgray');
    $('#buy_store_mult_x10').css('background-color', current_store_multiplier == store_multipliers.MultiplierX10 ? 'darkgray' : 'lightgray');
    $('#buy_store_mult_x100').css('background-color', current_store_multiplier == store_multipliers.MultiplierX100 ? 'darkgray' : 'lightgray');
    $('#buy_store_mult_max').css('background-color', current_store_multiplier == store_multipliers.MultiplierMAX ? 'darkgray' : 'lightgray');
}