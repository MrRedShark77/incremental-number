function E(x){return new ExpantaNum(x)};
function ex(x){
    let nx = new E(0);
    nx.array = x.array;
    nx.sign = x.sign;
    nx.layer = x.layer;
    return nx;
}

function calc(dt) {
    player.time += dt
    player.numbers = player.numbers.add(FORMS.getGain().mul(dt))
    if (player.time >= 125) location.reload()
}

const PLAYER_DATA = {
    numbers: E(0),
    upgrades: E(0),
    time: 0,
    roll: 0,
}

function wipe() {
    player = PLAYER_DATA
    player.roll = Math.floor(6*Math.random())+1
}

function loadPlayer(load) {
    player = load
    checkIfUndefined()
    convertToExpNum()
}

function checkIfUndefined() {

}

function convertToExpNum() {

}

function save(){
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",btoa(JSON.stringify(player)))
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    save();
    let file = new Blob([btoa(JSON.stringify(player))], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Test Save.txt"
    a.click()
}

function importy() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
    if (loadgame != null) {
        load(loadgame)
    }
}

function loadGame() {
    wipe()
    loadVue()
    document.getElementById("app").style.display = "block"
}