
// Initialize achievements.
achievements = {
    battle_progress: {
        // As these are progressive achievements, we keep track of how many of them we have achieved.
        finished: 0,
        breakpoint: [10, 50, 100],
        ids: ["#10BattleZoneAchievement", "#50BattleZoneAchievement", "#100BattleZoneAchievement"]
    }
}

// Checks the achivement of zone progression.
function CheckProgressAchievement(current_zone)
{
    while (achievements.battle_progress.finished < achievements.battle_progress.breakpoint.length)
    {
        if (current_zone >= achievements.battle_progress.breakpoint[achievements.battle_progress.finished])
            ++achievements.battle_progress.finished;
        else
            break;
    }
}

// Updates the display of the achievements.
function UpdateAchievementUI()
{
    // console.log("Progress.finished=", achievements.battle_progress.finished);
    for (var index = 0; index < achievements.battle_progress.ids.length; ++index)
    {
        $(achievements.battle_progress.ids[index]).css('background-color', achievements.battle_progress.finished > index ? 'lightgreen' : 'lightgray');
    }
}