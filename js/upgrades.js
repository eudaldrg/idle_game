
var upgrades = {
    duplicate_attack_1: {
        purchased: false,
        attack_multiplier: 2,
        rubies_cost: 10,
        id: "#upgrade_attack_1"
    },
    duplicate_attack_2: {
        purchased: false,
        attack_multiplier: 2,
        rubies_cost: 50,
        id: "#upgrade_attack_2"
    },
    duplicate_attack_3: {
        purchased: false,
        attack_multiplier: 2,
        rubies_cost: 200,
        id: "#upgrade_attack_3"
    },
    duplicate_attack_4: {
        purchased: false,
        attack_multiplier: 2,
        rubies_cost: 1000,
        id: "#upgrade_attack_4"
    }
}

for (let key in upgrades)
{
    let upgrade = upgrades[key]
    $(upgrade.id).on('click', function () {
        rubies -= upgrade.rubies_cost;
        upgrade.purchased = true;
    });
}

function UpdateUpgradesUI()
{
    for (let key in upgrades)
    {
        let upgrade = upgrades[key]
        $(upgrade.id).text('X2 Attack -- ' + FormatNumber(upgrade.rubies_cost));
        AddRubyIcon($(upgrade.id));
        $(upgrade.id).prop('disabled', upgrade.purchased || upgrade.rubies_cost > rubies);
        $(upgrade.id).css('background-color', upgrade.purchased ? 'darkgray' : 'lightgray');
    }
}