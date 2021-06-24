var diff = 0;
var date = Date.now();
var player

const FORMS = {
    getGain() { return E(2).pow(player.upgrades) },
    getCost() { return E(1.5).pow(player.upgrades).mul(10) },
    buy() {
        let cost = this.getCost()
        if (player.numbers.gte(cost)) {
            player.numbers = player.numbers.sub(cost)
            player.upgrades = player.upgrades.add(1)
        }
    }
}

function loop() {
    diff = Date.now()-date;
    calc(diff/1000);
    date = Date.now();
}

function format(ex, acc=3) {
    ex = E(ex)
    if (ex.isInfinite()) return 'Infinity'
    let e = ex.log10().floor()
    if (e.lt(9)) {
        if (e.lt(3)) {
            return ex.toFixed(acc)
        }
        return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
        if (ex.gte("eeee9")) {
            let slog = ex.slog()
            return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(3)) + "F" + format(slog.floor(), 0)
        }
        let m = ex.div(E(10).pow(e))
        return (e.log10().gte(9)?'':m.toFixed(3))+'e'+format(e,0)
    }
}

setInterval(loop, 50)