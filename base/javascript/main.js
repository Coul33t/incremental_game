var id          = ["units",       "cursors",      "meta_cursors",     "meta_meta_cursors"];

var number      = {"units":100000,  "cursors":0,    "meta_cursors":0,   "meta_meta_cursors":0};

var base_cost   = {"units":0,     "cursors":10,   "meta_cursors":100, "meta_meta_cursors":1000};
var cost        = {"units":0,     "cursors":10,   "meta_cursors":100, "meta_meta_cursors":1000};

var unlocked    = {"units":true,  "cursors":true, "meta_cursors":false, "meta_meta_cursors":false};

var multiplier  = {"units":1,     "cursors":1,   "meta_cursors":1, "meta_meta_cursors":1};

var multiplier_base_cost =  {"units":0,     "cursors":100,   "meta_cursors":1000, "meta_meta_cursors":10000};
var multiplier_cost =       {"units":0,     "cursors":100,   "meta_cursors":1000, "meta_meta_cursors":10000};

var autobuyer   =           {"units":false,     "cursors":false,   "meta_cursors":false, "meta_meta_cursors":false};
var autobuyer_interval =    {"units":1,     "cursors":10,   "meta_cursors":10, "meta_meta_cursors":10};

var autobuyer_base_cost =   {"units":0,     "cursors":1000,   "meta_cursors":10000, "meta_meta_cursors":100000};
var autobuyer_cost =        {"units":0,     "cursors":1000,   "meta_cursors":10000, "meta_meta_cursors":100000};



function unitsClick(number_to_create) {
    number["units"] += number_to_create;
    document.getElementById("units").innerHTML = Math.floor(number["units"]);
}

function buyGeneric(type) {
    if(id.indexOf(type) > -1) {
        if (number["units"] >= cost[type]) {
            number[type] += 1;
            number["units"] -= cost[type];
            document.getElementById("units").innerHTML = Math.floor(number["units"]);
            document.getElementById(type).innerHTML = Math.floor(number[type]);
            cost[type] = Math.floor(base_cost[type] * Math.pow(1.1,number[type]));
            document.getElementById(type+"_COST").innerHTML = cost[type];
        }
    }
}

function createGeneric(type, number_to_create) {
    if (id.indexOf(type) > -1) {
        number[type] += number_to_create;
        document.getElementById(type).innerHTML = Math.floor(number[type]);
    }
}

function updateCost() {
    for (var i = 1; i < id.length; i++) {
        cost[id[i]] = Math.floor(base_cost[id[i]] * Math.pow(1.1, number[id[i]]));
        multiplier_cost[id[i]] = Math.floor(multiplier_base_cost[id[i]] * Math.pow(11.11, multiplier[id[i]]));
        autobuyer_cost[id[i]] = Math.floor(autobuyer_base_cost[id[i]] * Math.pow(5.5, 1/autobuyer_interval[id[i]]));
    }
}

function updateUnlocked() {
    for (var i = 1; i <id.length; i++)
        if (unlocked[id[i]] == false && number[id[i-1]] >= 10)
            unlocked[id[i]] = true;
}

function buyMultiplier(type) {
    if(id.indexOf(type) > -1) {
        if (number["units"] >= multiplier_cost[type]) {
            number["units"] -= multiplier_cost[type];
            multiplier[type] += 1;
        }
    }
}

function buyAutobuyer(type) {
     if(id.indexOf(type) > -1) {
        if (autobuyer[type] == true) {
            if (number["units"] >= autobuyer_cost[type]) {
                number["units"] -= autobuyer_cost[type];
                autobuyer_interval[type] = autobuyer_interval[type] / 1.5;
            }
        }

        else {
            autobuyer[type] = true;
        }
    }
}

function updateDisplay() {
    
    setVisible();

    for (var i = 0; i < id.length; i++) {
        var num_tot = (number[id[i]] > 10000) ? Math.floor(number[id[i]]).toExponential(2) : Math.floor(number[id[i]]);
        // Values (number of)
        document.getElementById(id[i]).innerHTML = num_tot;
        

        if (id[i] != "units") {
            var num_cost = (cost[id[i]] > 10000) ? cost[id[i]].toExponential(2) : Math.floor(cost[id[i]]);
            document.getElementById(id[i] + '_COST').innerHTML = num_cost;
            
            // Multipliers
            document.getElementById(id[i] + '_multiplier_display').innerHTML = multiplier[id[i]];
            document.getElementById(id[i] + '_multiplier').innerHTML = multiplier[id[i]];
            var num_cost_m = (multiplier_cost[id[i]] > 10000) ? multiplier_cost[id[i]].toExponential(2) : Math.floor(multiplier_cost[id[i]]);
            document.getElementById(id[i] + '_multiplier_COST').innerHTML = num_cost_m;

            // Auto-buyers
            if (autobuyer[id[i]] == false)
                document.getElementById(id[i] + '_autobuyer_interval').innerHTML = autobuyer[id[i]];
            else
                document.getElementById(id[i] + '_autobuyer_interval').innerHTML = autobuyer_interval[id[i]].toFixed(2);

            var num_cost_a = (autobuyer_cost[id[i]] > 10000) ? autobuyer_cost[id[i]].toExponential(2) : Math.floor(autobuyer_cost[id[i]]);
            document.getElementById(id[i] + '_autobuyer_COST').innerHTML = num_cost_a;

        }
    }
}

function setVisible() {
    for (var i = 1; i <id.length; i++) {
        if (document.getElementById(id[i] + "_row").style.display == 'none' && unlocked[id[i]] == true)
            document.getElementById(id[i] + "_row").style.display = 'inline';
    }
}

$("#save").on("submit", function(e) {

    console.log("saveAll() called.");

    e.preventDefault();
    var player =  document.getElementById("player_save").value;

    save("number", player, number);
    save("base_cost", player, base_cost);
    save("cost", player, cost);
});

function save(dataname, player, data) {

    console.log("save() called.");

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {

            console.log("Server responded : data saved.");
        }
    };

    xhr.open("GET","http://127.0.0.1:8080/save?dataname=" + dataname + "&player=" + player + "&data=" + JSON.stringify(data), true);
    xhr.send();
}

$("#load").on("submit", function(e) {

    console.log("loadAll() called.");

    e.preventDefault();
    var player =  document.getElementById("player_load").value;

    load("number", player, number);
    load("base_cost", player, base_cost);
    load("cost", player, cost);

});

function load(dataname, player, data) {

    console.log("load() saved.");

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            //TODO: samarchpa
            set_data_load(dataname, xhr.responseText);
        }
    };

    xhr.open("GET","http://127.0.0.1:8080/load?dataname=" + dataname + "&player=" + player, true);
    xhr.send();
}

function set_data_load(dataname, data) {

    console.log("setDataLoad() called.");

    data = JSON.parse(data);
    for (var key in window[dataname]) {
        window[dataname][key] = data[key];
    }
}

function leaderboard() {
    console.log("leaderboard() called.");

    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://127.0.0.1:8080/leaderboard", true);
    xhr.send();
}






var timeInterval = 50;

window.setInterval(function() {
    updateUnlocked();

    unitsClick(number["cursors"]*(timeInterval/1000)*multiplier["cursors"]);

    for (var x = 1; x < id.length - 1 ; x++) {
        createGeneric(id[x], number[id[x+1]]*(timeInterval/1000)*multiplier[id[x+1]]);
    }

    updateCost();
    updateDisplay();
    //console.log(number);
    //console.log(cost);

},timeInterval)