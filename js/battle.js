
// Battle constants.
const health_growth_ratio = 1.1;
const minions_cost_growth_ratio = 1.05;

// The player attacks once per second. This is the time when its next attack should happen.
var next_attack_time = Date.now();

// Initialize the enemies values.
var enemies = [];
var zone = 1;
for (let index = 0; index < 5; ++index)
{
    // Each enemy has a max_health 1.5 times that of the previous enemy.
    let enemy =
    {
        max_health : Math.ceil(10 * (health_growth_ratio ** index)),
        health : Math.ceil(10 * (health_growth_ratio ** index)),
        alive : true,
        rubies : 0
    }
    enemies.push(enemy);
}

// Function that updates the battleground for a new zone full of enemies.
function GenerateNewZone()
{
    ++zone;
    h = enemies[4].max_health
    for (let i = 0; i < 5; ++i)
    {
        h = Math.ceil(h * health_growth_ratio);
        enemies[i].max_health = h;
        enemies[i].health = h;
        enemies[i].alive = true;
        enemies[i].rubies = 0;
    }

    // From zone 10 up, rubies start generating randomly in the universe.
    if (zone >= 10)
    {
        for (let i = 0; i < 5; ++i)
        {
            // With probability 1/5, an enemy will hold a number of rubies randomly between [0, zone)
            if (Math.random() < 0.2)
                enemies[i].rubies = Math.floor(zone * Math.random());
        }
    }
    CheckProgressAchievement(zone);
}

// Initialize the minions values.
var minions = 
{
    normal_minion:
    {
        attack_per_second: 1,
        base_cost: 10,
        current_cost: 10,
        quantity_purchased: 0
    },
    super_minion:
    {
        attack_per_second: 10,
        base_cost: 1000,
        current_cost: 1000,
        quantity_purchased: 0
    },
    mega_minion:
    {
        attack_per_second: 100,
        base_cost: 1000000,
        current_cost: 1000000,
        quantity_purchased: 0
    },
    giga_minion:
    {
        attack_per_second: 1000,
        base_cost: 1e9,
        current_cost: 1e9,
        quantity_purchased: 0
    },
    tera_minion:
    {
        attack_per_second: 10000,
        base_cost: 1e12,
        current_cost: 1e12,
        quantity_purchased: 0
    }
}

/// Function that purchases as many minions as the store multiplier indicates.
/// @pre: We can afford as many minions as the multiplier specifies.
function BuyMinion(minion_to_buy)
{
    // If we are buying a fixed quantity, restrict to the amount bought. Otherwise, buy MAX.
    var quantity_to_buy = 0;
    if (current_store_multiplier.constant_quantity)
        quantity_to_buy = current_store_multiplier.value;

    var quantity_bought = 0;
    while (makis >= minion_to_buy.current_cost && (quantity_to_buy == 0 || quantity_to_buy > quantity_bought))
    {
        minion_to_buy.quantity_purchased++;
        makis -= minion_to_buy.current_cost;
        minion_to_buy.current_cost = Math.ceil(minion_to_buy.current_cost * minions_cost_growth_ratio);
        attack += minion_to_buy.attack_per_second;

        ++quantity_bought;
    }
}

// Add the buttons' actions to buy generators.
$('#buy_normal_minion').on('click', function () { BuyMinion(minions.normal_minion); });
$('#buy_super_minion').on('click', function () { BuyMinion(minions.super_minion); });
$('#buy_mega_minion').on('click', function () { BuyMinion(minions.mega_minion); });
$('#buy_giga_minion').on('click', function () { BuyMinion(minions.giga_minion); });
$('#buy_tera_minion').on('click', function () { BuyMinion(minions.tera_minion); });

// Main function to update the battlefield.
function UpdateBattle(new_update_time)
{
    if (new_update_time >= next_attack_time)
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
                {
                    enemies[i].alive = false;
                    rubies += enemies[i].rubies;
                }
                break;
            }
        }

        // If all the enemies have been defeated, populate the battlefield with stronger ones.
        if (!enemies[4].alive)
            GenerateNewZone();
    }
}

// Updates the display of the battle related objects.
function UpdateBattleUI()
{
    // Update the buttons to buy minions.
    $('#buy_normal_minion').text('Buy Minion ('+ FormatNumber(minions.normal_minion.quantity_purchased) +') - ' + FormatNumber(minions.normal_minion.current_cost));
    $('#buy_super_minion').text('Buy Super Minion ('+ FormatNumber(minions.super_minion.quantity_purchased) +') - ' + FormatNumber(minions.super_minion.current_cost));
    $('#buy_mega_minion').text('Buy Mega Minion ('+ FormatNumber(minions.mega_minion.quantity_purchased) +') - ' + FormatNumber(minions.mega_minion.current_cost));
    $('#buy_giga_minion').text('Buy Giga Minion ('+ FormatNumber(minions.giga_minion.quantity_purchased) +') - ' + FormatNumber(minions.giga_minion.current_cost));
    $('#buy_tera_minion').text('Buy Tera Minion ('+ FormatNumber(minions.tera_minion.quantity_purchased) +') - ' + FormatNumber(minions.tera_minion.current_cost));

    $('#buy_normal_minion').prop('disabled', !CanAfford(makis, minions.normal_minion.current_cost, minions_cost_growth_ratio));
    $('#buy_super_minion').prop('disabled', !CanAfford(makis, minions.super_minion.current_cost, minions_cost_growth_ratio));
    $('#buy_mega_minion').prop('disabled', !CanAfford(makis, minions.mega_minion.current_cost, minions_cost_growth_ratio));
    $('#buy_giga_minion').prop('disabled', !CanAfford(makis, minions.giga_minion.current_cost, minions_cost_growth_ratio));
    $('#buy_tera_minion').prop('disabled', !CanAfford(makis, minions.tera_minion.current_cost, minions_cost_growth_ratio));

    $('#zone').text('Zone ' + zone);
    // Update the enemy boxes with their current health.
    for (let enemy_index = 0; enemy_index < 5; ++enemy_index)
    {
        enemy_string = '#enemy_' + (enemy_index + 1)
        $(enemy_string).text(FormatNumber(enemies[enemy_index].health) + " / " + FormatNumber(enemies[enemy_index].max_health));
        $(enemy_string).css('background-color', enemies[enemy_index].alive == true ? 'lightgreen' : '#ff6666');
        if (enemies[enemy_index].rubies > 0)
            AddRubyIcon($(enemy_string));
    }
}