// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var makis = 0;
var last_update = Date.now()

var luises = []
for (let luis_index = 0; luis_index < 4; ++luis_index) {
    let luis = {
        cost : 5**(luis_index + 1),
        bought : 0,
        amount : 0,
        mult : 1
    }
    luises.push(luis);
}

function BuyLuis(luis_index) {
    let luis = luises[luis_index];
    // First we pay for it.
    makis -= luis.cost;

    // Then we increase the counter
    ++luis.amount;

    // Increase cost for the next one, using Math.ceil() to round up
    luis.cost = Math.ceil(luis.cost * 1.1);
}

// Increase numWidgets every time produce-widget is clicked
$('#produce-widget').on('click', function () {
    makis++;
});

$('#luis0').on('click', function () {
    BuyLuis(0);
});
$('#luis1').on('click', function () {
    BuyLuis(1);
});
$('#luis2').on('click', function () {
    BuyLuis(2);
});
$('#luis3').on('click', function () {
    BuyLuis(3);
});

function ScientificFormat(number) {
    let power = Math.floor(Math.log10(number));
    let mantissa = number / Math.pow(10, power);
    if (power < 3)
        return number.toFixed(2);
    
    return mantissa.toFixed(2) + "e" + power;
}

function UpdateUI() {
    // Update the text showing how many widgets we have, using Math.floor() to round down
    $('#widget-count').text(Math.floor(makis));

    // Update the text showing the makis per second
    $('#widget-rate').text(ScientificFormat(Math.floor(makis_per_second)))

    // Update the widgeteers with their current prices
    $('#luis0').text('Hire Luis('+ ScientificFormat(luises[0].amount) +') - ' + ScientificFormat(luises[0].cost));
    $('#luis1').text('Hire Peneman Garcia('+ ScientificFormat(luises[1].amount) +') - ' + ScientificFormat(luises[1].cost));
    $('#luis2').text('Hire Master of Dating Sims('+ ScientificFormat(luises[2].amount) +') - ' + ScientificFormat(luises[2].cost));
    $('#luis3').text('Hire Touchpad Sensei('+ ScientificFormat(luises[3].amount) +') - ' + ScientificFormat(luises[3].cost));

    // Enable/disable the widgeteer buttons based on our numWidgets
    $('#luis0').prop('disabled', luises[0].cost > makis);
    $('#luis1').prop('disabled', luises[1].cost > makis);
    $('#luis2').prop('disabled', luises[2].cost > makis);
    $('#luis3').prop('disabled', luises[3].cost > makis);
}

function MainLoop() {
    new_update = Date.now();
    var time_interval_in_seconds = (new_update - last_update) / 1000;
    last_update = new_update;

    makis_per_second = luises[0].amount * luises[0].mult;
    for (let luis_index = 1; luis_index < luises.length; ++luis_index) {
        let luis_gakusei = luises[luis_index - 1];
        let luis_sensei = luises[luis_index];
        luis_gakusei.amount += luis_sensei.amount * luis_sensei.mult / 5 * time_interval_in_seconds
    }
    makis += makis_per_second * time_interval_in_seconds;

    UpdateUI()

}

// Run main loop update code every 50ms
window.setInterval(MainLoop, 50);

// window is optional, but let's not waste resources on the background.
