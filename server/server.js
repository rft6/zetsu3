var panel = new Array(8);
for (let i = 0; i < 8; i++) {
    panel[i] = new Array(8).fill("");
}

var panelFlg = new Array(8);
for (let i = 0; i < 8; i++) {
    panelFlg[i] = new Array(8).fill("");
}

$(function () {
    setBasePanel();
});

function setBasePanel() {
    resetPanel();
    setQueen();
    setKing();
    setRook1();
    setRook2();
    setBishop1();
    setBishop2();
    setKnight1();
    setKnight2();
   
}

function resetPanel() {
    for (var i = 0; i < 8; i++) {
        panel[i] = panel[i].fill("");
    }
    for (var i = 1; i <= 64; i++) {
        $("#b" + ("00" + i).slice(-2)).text("");
    }
}

function setQueen() {
    var p = $("#queen").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("Q");
        panel[y][x] = "Q";
    }
}

function setKing() {
    var p = $("#king").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("K");
        panel[y][x] = "K";
    }
}

function setRook1() {
    var p = $("#rook1").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("R1");
        panel[y][x] = "R1";
    }
}

function setRook2() {
    var p = $("#rook2").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("R2");
        panel[y][x] = "R2";
    }
}

function setBishop1() {
    var p = $("#bishop1").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("B1");
        panel[y][x] = "B1";
    }
}

function setBishop2() {
    var p = $("#bishop2").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("B2");
        panel[y][x] = "B2";
    }
}

function setKnight1() {
    var p = $("#knight1").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("N1");
        panel[y][x] = "N1";
    }
}

function setKnight2() {
    var p = $("#knight2").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("N2");
        panel[y][x] = "N2";
    }
}
