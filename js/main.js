// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var makis = 500;
var attack = 0;
var last_update = Date.now()
var hack_time_to_debug = 1;


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

// The player attacks once per second. This is the time when its next attack should happen.
var next_attack_time = Date.now();
// Initialize the enemies values.
var enemies = []
for (let index = 0; index < 5; ++index)
{
    // Each enemy has a max_health 1.5 times that of the previous enemy.
    let enemy =
    {
        max_health : 10 * (1.5 ** index),
        health : 10 * (1.5 ** index),
        alive : true
    }
    enemies.push(enemy);
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

    // Update the enemy boxes with their current health.
    $('#enemy_1').text(FormatNumber(enemies[0].health) + " / " + FormatNumber(enemies[0].max_health));
    $('#enemy_2').text(FormatNumber(enemies[1].health) + " / " + FormatNumber(enemies[1].max_health));
    $('#enemy_3').text(FormatNumber(enemies[2].health) + " / " + FormatNumber(enemies[2].max_health));
    $('#enemy_4').text(FormatNumber(enemies[3].health) + " / " + FormatNumber(enemies[3].max_health));
    $('#enemy_5').text(FormatNumber(enemies[4].health) + " / " + FormatNumber(enemies[4].max_health));
}

function MainLoop() {
    new_update = Date.now();
    var time_interval_in_seconds = (new_update - last_update) / 1000 * hack_time_to_debug;
    last_update = new_update;

    makis_per_second = luises[0].amount * luises[0].mult;
    for (let luis_index = 1; luis_index < luises.length; ++luis_index) {
        let luis_gakusei = luises[luis_index - 1];
        let luis_sensei = luises[luis_index];
        luis_gakusei.amount += luis_sensei.amount * luis_sensei.mult / 5 * time_interval_in_seconds
    }
    makis += makis_per_second * time_interval_in_seconds;

    if (new_update >= next_attack_time)
    {
        next_attack_time += 1000; // We add one second.

        // Iterate through the enemies to find the first alive one.
        for (let i = 0; i < 5; ++i)
        {
            // Attack the first alive enemy.
            if (enemies[i].alive == true)
            {
                enemies[i].health = Math.max(0, enemies[i].health - attack);
                if (enemies[i].health <= 0)
                    enemies[i].alive = false;
                break;
            }
        }

        // If all the enemies have been defeated, populate the battlefield with stronger ones.
        if (!enemies[4].alive)
        {
            h = enemies[4].max_health
            for (let i = 0; i < 5; ++i)
            {
                h *= 1.5;
                enemies[i].max_health = h;
                enemies[i].health = h;
                enemies[i].alive = true;
            }
        }
    }

    UpdateUI()
}

// Run main loop update code every 50ms
window.setInterval(MainLoop, 50);

// window is optional, but let's not waste resources on the background.
