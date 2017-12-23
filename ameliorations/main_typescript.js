class Ressource {
    // Constructor
    constructor(level, display_name, count, base_cost, current_cost, unlocked) {
        this.level = level;
        this.display_name = display_name;
        this.count = count;
        this.base_cost = base_cost;
        this.current_cost = current_cost;
        this.multiplier = new Multiplier(1, 10000, 10000);
        this.autobuyer = null;
        this.unlocked = unlocked;
    }
    compute_next_cost() {
        this.current_cost = Math.floor(this.base_cost * Math.pow(1.5, this.count));
    }
}
class Multiplier {
    constructor(value, base_cost, current_cost) {
        this.value = value;
        this.base_cost = base_cost;
        this.current_cost = current_cost;
    }
    compute_next_cost() {
        this.current_cost = Math.floor(this.base_cost * Math.pow(100, this.value));
    }
}
class Autobuyer {
    constructor(count, base_cost, current_cost) {
        this.count = count;
        this.base_cost = base_cost;
        this.current_cost = current_cost;
        this.multiplier = 1;
    }
    compute_next_cost() {
        this.current_cost = Math.floor(this.base_cost * Math.pow(1.5, this.count));
    }
}
class Engine {
    constructor(interval) {
        this.interval = interval;
        this.ress = [];
        this.nb_units = 10;
        console.log("Engine created");
    }
    init() {
        _this.ress.push(new Ressource(1, "cursors", 0, 10, 10, true));
        _this.ress.push(new Ressource(2, "meta_cursors", 0, 100, 100, false));
        _this.ress.push(new Ressource(3, "meta_meta_cursors", 0, 1000, 1000, false));
    }
    set_names(names) {
        // -1 because units are not in ress
        if (names.length - 1 == _this.ress.length) {
            for (let i = 0; i < names.length; i++) {
                if (i == 0) {
                    document.getElementById("lvl_" + String(i)).innerHTML = names[i];
                }
                else {
                    _this.ress[i - 1].display_name = names[i];
                    document.getElementById("lvl_" + String(i)).innerHTML = names[i];
                }
            }
        }
    }
    add_unit(number_to_add) {
        _this.nb_units += number_to_add;
        document.getElementById("lvl_0_count").innerHTML = String(Math.floor(_this.nb_units));
    }
    //TODO: add number_to_add as parameter (check cost etc.)
    buy(type) {
        let obj = _this.ress.find(obj => "lvl_" + obj.level === type);
        if (_this.nb_units >= obj.current_cost) {
            _this.nb_units -= obj.current_cost;
            obj.count += 1;
            document.getElementById("lvl_0_count").innerHTML = String(Math.floor(_this.nb_units));
            document.getElementById(type + "_count").innerHTML = String(Math.floor(obj.count));
            obj.compute_next_cost();
            document.getElementById(type + "_cost").innerHTML = String(Math.floor(obj.current_cost));
        }
    }
    create(type, number_to_create) {
        let obj = _this.ress.find(obj => "lvl_" + obj.level === type);
        obj.count += number_to_create;
        obj.compute_next_cost();
        document.getElementById(type + "_count").innerHTML = String(Math.floor(obj.count));
    }
    check_unlocked() {
        for (let i = 1; i < _this.ress.length; i++) {
            if (_this.ress[i].unlocked === false && _this.ress[i - 1].count >= 10) {
                _this.ress[i].unlocked = true;
                document.getElementById("lvl_" + _this.ress[i].level + "_row").style.display = 'inline';
            }
        }
    }
    update_display() {
        _this.check_unlocked();
        document.getElementById("lvl_0_count").innerHTML = String(Math.floor(_this.nb_units));
        for (let obj of _this.ress) {
            if (obj.unlocked) {
                document.getElementById("lvl_" + String(obj.level) + "_count").innerHTML = String(Math.floor(obj.count));
                document.getElementById("lvl_" + String(obj.level) + "_cost").innerHTML = String(Math.floor(obj.current_cost));
            }
        }
    }
    update() {
        let lvl_1_ref = _this.ress.find(obj => obj.level === 1);
        _this.add_unit(lvl_1_ref.count * (_this.interval / 1000) * lvl_1_ref.multiplier.value);
        for (let i = 1; i < _this.ress.length; i++) {
            _this.create("lvl_" + String(i), _this.ress[i].count * (_this.interval / 1000) * _this.ress[i].multiplier.value);
        }
        _this.update_display();
    }
    run() {
        window.setInterval(_this.update, _this.interval);
    }
}
let basic_names = ["units", "cursors", "meta-cursors", "meta-meta-cursors"];
let memory_names = ["bits leaked", "faulty pointer", "un-dereferenced pointers", "out-of-bounds index"];
let eng = new Engine(50);
let _this = eng;
eng.init();
eng.set_names(memory_names);
eng.run();
