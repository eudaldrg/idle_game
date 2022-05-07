
// Saves the game state using local storage.
function SaveGame()
{
    var save_game = {
        current_makis: makis,
        current_attack: attack,
        current_luises: luises,
        current_enemies: enemies,
        current_next_attack_time: next_attack_time,
        current_zone: zone,
        current_achievements: achievements
    }

    localStorage.setItem("save", JSON.stringify(save_game))
}

// Loads the game state stored in the local storage.
function LoadGame()
{
    var save_game = JSON.parse(localStorage.getItem("save"));

    if (typeof save_game.current_makis !== "undefined")
        makis = save_game.current_makis;
    if (typeof save_game.current_attack !== "undefined")
        attack = save_game.current_attack;
    if (typeof save_game.current_luises !== "undefined")
        luises = save_game.current_luises;
    if (typeof save_game.current_enemies !== "undefined")
        enemies = save_game.current_enemies;
    if (typeof save_game.current_next_attack_time !== "undefined")
        next_attack_time = save_game.current_next_attack_time;
    if (typeof save_game.current_zone !== "undefined")
        zone = save_game.current_zone;
    if (typeof save_game.current_achievements !== "undefined")
        achievements = save_game.current_achievements;
}

// Handle saving the state.
$('#save_button').on('click', function() {
    SaveGame();
});

// Handle loading a save file.
$('#load_button').on('click', function() {
    LoadGame();
});

// Handle reseting the saved state.
$('#reset_load_button').on('click', function() {
    localStorage.removeItem("save");
});