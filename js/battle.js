
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
        max_health : 10 * (1.1 ** index),
        health : 10 * (1.1 ** index),
        alive : true
    }
    enemies.push(enemy);
}


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
                    enemies[i].alive = false;
                break;
            }
        }

        // If all the enemies have been defeated, populate the battlefield with stronger ones.
        if (!enemies[4].alive)
        {
            ++zone;
            h = enemies[4].max_health
            for (let i = 0; i < 5; ++i)
            {
                h *= 1.1;
                enemies[i].max_health = h;
                enemies[i].health = h;
                enemies[i].alive = true;
            }
            CheckProgressAchievement(zone);
        }
    }
}

// Updates the display of the battle related objects.
function UpdateBattleUI()
{
    $('#zone').text('Zone ' + zone);
    // Update the enemy boxes with their current health.
    for (let enemy_index = 0; enemy_index < 5; ++enemy_index)
    {
        enemy_string = '#enemy_' + (enemy_index + 1)
        $(enemy_string).text(FormatNumber(enemies[enemy_index].health) + " / " + FormatNumber(enemies[enemy_index].max_health));
        $(enemy_string).css('background-color', enemies[enemy_index].alive == true ? 'lightgreen' : '#ff6666');
    }
}