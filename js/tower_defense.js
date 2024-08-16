var world_map = new Map();
var you_position = [0, 0];

cell = {
    Empty: {
        text: 'E',
        walkable: true,
        background_color: 'lightgray'
    },
    Base: {
        text: 'B',
        walkable: true,
        background_color: 'red'
    },
    Forest: {
        text: 'F',
        walkable: false,
        background_color: 'green'
    },
    Water: {
        text: 'W',
        walkable: true,
        background_color: 'blue'
    }
}

//function Initialize()
{
    for (var i = -10; i <= 10; ++i)
    {
        for (var j = -10; j <= 10; ++j)
        {
            let r = Math.random();
            if (i == 0 && j == 0)
                world_map.set(i * 1000 + j, cell.Base);
            else if (r < 0.4)
                world_map.set(i * 1000 + j, cell.Forest);
            //else if (r < 0.6)
            //    aaa_world_map.set(i * 1000 + j, cell.Water);
            else
                world_map.set(i * 1000 + j, cell.Empty);
        }
    }
}

function GetCell(i, j)
{
    return world_map.get(i * 1000 + j);
}

function TryToMove(new_position)
{
    let cell = GetCell(new_position[0], new_position[1]);
    if (cell.walkable)
        you_position = new_position;
}

function TowerDefenseReactToKey(event)
{
    new_position = [you_position[0], you_position[1]];
    switch (event.keyCode)
    {
        case 37: // ArrowLeft
            new_position[1] -= 1;
            break;
        case 38: // ArrowUp
            new_position[0] -= 1;
            break;
        case 39: // ArrowRight
            new_position[1] += 1;
            break;
        case 40: // ArrowDown
            new_position[0] += 1;
            break;
    }
    TryToMove(new_position);
}

function UpdateTowerDefenseUI()
{
    const map_container = document.getElementById('TDMap');
    map_container.innerHTML = '';
    for (var i = -5; i <= 5; ++i)
    {
        let x = `<div class="map_row" id="row_${i}">`
        for (var j = -5; j <= 5; ++j)
        {
            x += `<div class="map_cell" id="cell_${i}_${j}">`
            let y = GetCell(i, j);
            x += y.text;
            x += `</div>`
        }
        x += `</div>`
        map_container.innerHTML += x;
    }

    for (var i = -5; i <= 5; ++i)
    {
        for (var j = -5; j <= 5; ++j)
        {
            cell_string = '#cell_' + i + '_' + j;
            let y = GetCell(i, j);
            $(cell_string).css('background-color', y.background_color);

            let cell_text = y.text;
            if (you_position[0] == i && you_position[1] == j)
                cell_text += " + Y";
            $(cell_string).text(cell_text);
        }
    }
}