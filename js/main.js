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


// Tab buttons:
function SwitchTab(tab_to_open)
{
    $('#MainTab').css('display', tab_to_open == 0 ? 'block' : 'none');
    $('#AchievementTab').css('display', tab_to_open == 1 ? 'block' : 'none');
    $('#TowerDefenseTab').css('display', tab_to_open == 2 ? 'block' : 'none');
}

$('#MainTabFromAchButton').on('click', function () { SwitchTab(/* tab_to_open */ 0); });
$('#MainTabFromTDButton').on('click', function () { SwitchTab(/* tab_to_open */ 0); });
$('#GoToAchievementsButton').on('click', function () { SwitchTab(/* tab_to_open */ 1); });
$('#GoToTowerDefenseButton').on('click', function () { SwitchTab(/* tab_to_open */ 2); });



// Keyboard handling.
document.onkeydown=function(key){ reactKey(key); }

function reactKey(event)
{
    if ($('#TowerDefenseTab').css('display') === 'block')
        TowerDefenseReactToKey(event);
}


// Numeric formatting.
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


// UI.
function UpdateUI()
{
    // Update the text showing how many widgets we have, using Math.floor() to round down.
    $('#widget-count').text(FormatNumber(makis));
    $('#widget-count-td').text(FormatNumber(makis));

    // Update the text showing the makis per second.
    $('#widget-rate').text(FormatNumber(Math.floor(makis_per_second)));

    // Update the text showing the attack per second.
    $('#dps').text(FormatNumber(Math.floor(base_attack)) + ' (' + FormatNumber(Math.floor(GetTotalAttack())) + ')');

    UpdateCurrencyUI();
    UpdateBuyingMultUI();
    UpdateBattleUI();
    UpdateAchievementUI();
    UpdateTowerDefenseUI();
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
