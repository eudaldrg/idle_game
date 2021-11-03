// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var numWidgets = 0;
var numNoviceWidgeteers = 0;
var numMasterWidgeteers = 0;
var numMasterBaiter = 0;
var numSuperBaiter = 0;
var noviceWidgeteerCost = 10;
var masterWidgeteerCost = 25;
var masterBaiterCost = 125;
var superBaiterCost = 2500;
var makis_per_ms = 0;

// Increase numWidgets every time produce-widget is clicked
$('#produce-widget').on('click', function () {
    numWidgets++;
});

// Same for novice-widgeteer
$('#novice-widgeteer').on('click', function () {
    numNoviceWidgeteers++;

    // Deduct cost
    numWidgets -= noviceWidgeteerCost;
    
    // Increase cost for the next one, using Math.ceil() to round up
    noviceWidgeteerCost = Math.ceil(noviceWidgeteerCost * 1.1);
});

// Ditto for master-widgeteer... you get the idea
$('#master-widgeteer').on('click', function () {
    numMasterWidgeteers++;
    numWidgets -= masterWidgeteerCost;
    masterWidgeteerCost = Math.ceil(masterWidgeteerCost * 1.1);
});

// Ditto for master-widgeteer... you get the idea
$('#master-baiter').on('click', function () {
    numMasterBaiter++;
    numWidgets -= masterBaiterCost;
    masterBaiterCost = Math.ceil(masterBaiterCost * 1.1);
});

// Ditto for master-widgeteer... you get the idea
$('#super-baiter').on('click', function () {
    numSuperBaiter++;
    numWidgets -= superBaiterCost;
    superBaiterCost = Math.ceil(superBaiterCost * 1.1);
});

// Run UI update code every 10ms
window.setInterval(function () {
    // Novices add 1 per second (1/100 every 10ms)
    makis_per_ms = (numNoviceWidgeteers * 1 / 100) + (numMasterWidgeteers * 5 / 100) + (numMasterBaiter * 25 / 100) + (numSuperBaiter * 125 / 100)
    numWidgets += makis_per_ms;

    // Update the text showing how many widgets we have, using Math.floor() to round down
    $('#widget-count').text(Math.floor(numWidgets));

    // Update the text showing the makis per second
    $('#widget-rate').text(Math.floor(makis_per_ms * 100))

    // Update the widgeteers with their current prices
    $('#novice-widgeteer').text('Hire Luis - ' + noviceWidgeteerCost);
    $('#master-widgeteer').text('Hire Peneman Garcia - ' + masterWidgeteerCost);
    $('#master-baiter').text('Hire Master of Dating Sims - ' + masterBaiterCost);
    $('#super-baiter').text('Hire Touchpad Sensei - ' + superBaiterCost);

    // Enable/disable the widgeteer buttons based on our numWidgets
    $('#novice-widgeteer').prop('disabled', noviceWidgeteerCost > numWidgets);
    $('#master-widgeteer').prop('disabled', masterWidgeteerCost > numWidgets);
    $('#master-baiter').prop('disabled', masterBaiterCost > numWidgets);
    $('#super-baiter').prop('disabled', superBaiterCost > numWidgets);
}, 10);