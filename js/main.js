// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var makis = 500;
var base_attack = 0;
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
    base_attack++;
});


// Tab buttons:
function ToggleAchievementWindows(achievements_open)
{
    $('#MainTab').css('display', achievements_open ? 'none' : 'block');
    $('#AchievementTab').css('display', achievements_open ? 'block' : 'none');
}

$('#GoToAchievementsButton').on('click', function () { ToggleAchievementWindows(/* achievements_open */ true); });
$('#BackFromAchievementsTab').on('click', function () { ToggleAchievementWindows(/* achievements_open */ false); });


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

function UpdateUI()
{
    // Update the text showing how many widgets we have, using Math.floor() to round down.
    $('#widget-count').text(FormatNumber(makis));

    // Update the text showing the makis per second.
    $('#widget-rate').text(FormatNumber(Math.floor(makis_per_second)));

    // Update the text showing the attack per second.
    $('#dps').text(FormatNumber(Math.floor(base_attack)) + ' (' + FormatNumber(Math.floor(GetTotalAttack())) + ')');

    UpdateCurrencyUI();
    UpdateBuyingMultUI();
    UpdateBattleUI();
    UpdateAchievementUI();
    UpdateUpgradesUI();
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
