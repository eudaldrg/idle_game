// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var makis = 500;
var attack = 0;
var last_update = Date.now()
var hack_time_to_debug = 1;

// Hacks to speedup development.
$('#hacky_mult').on('input', function() {
    hack_time_to_debug = this.value
});

// Handle changes in number formatting.
$('#number_formatting').on('change', function() {
    format_mode = new FormatMode(this.value);
});

// Increase numWidgets every time produce-widget is clicked
$('#produce-widget').on('click', function () {
    makis++;
});
// Increase the attack of the player.
$('#increase-attack').on('click', function () {
    attack++;
});

class FormatMode {
    static Standard = new FormatMode("standard")
    static Scientific = new FormatMode("scientific")
    static Engineering = new FormatMode("engineering")
    static LongScale = new FormatMode("longscale")

    constructor(name) {
        this.name = name
    }
}
var format_mode = FormatMode.Engineering;
function FormatNumber(number)
{
    return numberformat.formatShort(number, {format: format_mode.name})
}

function UpdateUI() {
    // Update the text showing how many widgets we have, using Math.floor() to round down
    $('#widget-count').text(FormatNumber(makis));

    // Update the text showing the makis per second
    $('#widget-rate').text(FormatNumber(Math.floor(makis_per_second)))

    // Update the text showing the attack per second
    $('#dps').text(FormatNumber(Math.floor(attack)))

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

    $('#zone').text('Zone ' + zone);
    // Update the enemy boxes with their current health.
    for (let enemy_index = 0; enemy_index < 5; ++enemy_index)
    {
        enemy_string = '#enemy_' + (enemy_index + 1)
        $(enemy_string).text(FormatNumber(enemies[enemy_index].health) + " / " + FormatNumber(enemies[enemy_index].max_health));
        $(enemy_string).css('background-color', enemies[enemy_index].alive == true ? 'lightgreen' : '#ff6666');
    }
}

function MainLoop()
{
    new_update_time = Date.now();
    var time_interval_in_seconds = (new_update_time - last_update) / 1000 * hack_time_to_debug;
    last_update = new_update_time;

    UpdateCurrency(time_interval_in_seconds);
    UpdateBattle(new_update_time);

    UpdateUI();
}

// Run main loop update code every 50ms
window.setInterval(MainLoop, 50);

// window is optional, but let's not waste resources on the background.
