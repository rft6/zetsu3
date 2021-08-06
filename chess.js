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
    setRook();
    setBishop();
    setKnight();
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

function setRook() {
    var p = $("#rook").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("R");
        panel[y][x] = "R";
    }
}

function setBishop() {
    var p = $("#bishop").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("B");
        panel[y][x] = "B";
    }
}

function setKnight() {
    var p = $("#knight").val();
    if (p != "" && !isNaN(p)) {
        var x = parseInt((p - 1) % 8, 10);
        var y = parseInt((p - 1) / 8, 10);
        $("#b" + ('00' + p).slice(-2)).text("N");
        panel[y][x] = "N";
    }
}

function calc() {
    resetResultPanle();
    for (var rook = 0; rook < 64; rook++) {
        if (panel[parseInt(rook / 8, 10)][parseInt(rook % 8, 10)] != "") {
            continue;
        }
        panel[parseInt(rook / 8, 10)][parseInt(rook % 8, 10)] = "R";
        resetFlg();
        checkFlg();
        /* 残りがビショップ15+キング9+ナイト9のマス数を超えている場合 */
        if (countFlg() < 64 - 15 - 9 - 9) {
            panel[parseInt(rook / 8, 10)][parseInt(rook % 8, 10)] = "";
            continue;
        }
        for (var bishop = 0; bishop < 64; bishop++) {
            if (panel[parseInt(bishop / 8, 10)][parseInt(bishop % 8, 10)] != "") {
                continue;
            }
            panel[parseInt(bishop / 8, 10)][parseInt(bishop % 8, 10)] = "B";
            resetFlg();
            checkFlg();
            /* 残りがキング9+ナイト9のマス数を超えている場合 */
            if (countFlg() < 64 - 9 - 9) {
                panel[parseInt(bishop / 8, 10)][parseInt(bishop % 8, 10)] = "";
                continue;
            }
            for (var king = 0; king < 64; king++) {
                if (panel[parseInt(king / 8, 10)][parseInt(king % 8, 10)] != "") {
                    continue;
                }
                panel[parseInt(king / 8, 10)][parseInt(king % 8, 10)] = "K";
                resetFlg();
                checkFlg();
                /* 残りがナイト9のマス数を超えている場合 */
                if (countFlg() < 64 - 9) {
                    panel[parseInt(king / 8, 10)][parseInt(king % 8, 10)] = "";
                    continue;
                }
                for (var knight = 0; knight < 64; knight++) {
                    if (panel[parseInt(knight / 8, 10)][parseInt(knight % 8, 10)] != "") {
                        continue;
                    }
                    panel[parseInt(knight / 8, 10)][parseInt(knight % 8, 10)] = "N";
                    resetFlg();
                    checkFlg();
                    if(isAllTrue()){
                        //console.log("rook=" + rook + " bishop=" + bishop + " king=" + king + " knight=" + knight);
                        setResultPanel(rook, bishop, king, knight);
                        panel[parseInt(knight / 8, 10)][parseInt(knight % 8, 10)] = "";
                        panel[parseInt(king / 8, 10)][parseInt(king % 8, 10)] = "";
                        panel[parseInt(bishop / 8, 10)][parseInt(bishop % 8, 10)] = "";
                        panel[parseInt(rook / 8, 10)][parseInt(rook % 8, 10)] = "";
                        return;
                    }
                    panel[parseInt(knight / 8, 10)][parseInt(knight % 8, 10)] = "";
                }
                panel[parseInt(king / 8, 10)][parseInt(king % 8, 10)] = "";
            }
            panel[parseInt(bishop / 8, 10)][parseInt(bishop % 8, 10)] = "";
        }
        panel[parseInt(rook / 8, 10)][parseInt(rook % 8, 10)] = "";
    }
    alert("計算結果なし");
}

function checkFlg() {
    checkQueen();
    checkRook();
    checkBishop();
    checkKnight();
    checkKing();
}

function checkQueen() {
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            if (panel[y][x] == "Q") {
                // 駒のある位置をTRUE
                panelFlg[y][x] = true;
                // 右
                for (var x2 = x + 1; x2 < 8; ++x2) {
                    // 他の駒がある場合は終了
                    if (panel[y][x2] != "") {
                        break;
                    }
                    panelFlg[y][x2] = true;
                }
                // 左
                for (var x2 = x - 1; x2 >= 0; --x2) {
                    // 他の駒がある場合は終了
                    if (panel[y][x2] != "") {
                        break;
                    }
                    panelFlg[y][x2] = true;
                }
                // 上
                for (var y2 = y - 1; y2 >= 0; --y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x] != "") {
                        break;
                    }
                    panelFlg[y2][x] = true;
                }
                // 下
                for (var y2 = y + 1; y2 < 8; ++y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x] != "") {
                        break;
                    }
                    panelFlg[y2][x] = true;
                }
                // 右上
                for (var x2 = x + 1, y2 = y - 1; x2 < 8 && y2 >= 0; ++x2, --y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                // 右下
                for (var x2 = x + 1, y2 = y + 1; x2 < 8 && y2 < 8; ++x2, ++y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                // 左上
                for (var x2 = x - 1, y2 = y - 1; x2 >= 0 && y2 >= 0; --x2, --y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                // 左下
                for (var x2 = x - 1, y2 = y + 1; x2 >= 0 && y2 < 8; --x2, ++y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                return;
            }
        }
    }
}

function checkRook() {
    var count = 0;
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            if (panel[y][x] == "R") {
                // 駒のある位置をTRUE
                panelFlg[y][x] = true;
                // 右
                for (var x2 = x + 1; x2 < 8; ++x2) {
                    // 他の駒がある場合は終了
                    if (panel[y][x2] != "") {
                        break;
                    }
                    panelFlg[y][x2] = true;
                }
                // 左
                for (var x2 = x - 1; x2 >= 0; --x2) {
                    // 他の駒がある場合は終了
                    if (panel[y][x2] != "") {
                        break;
                    }
                    panelFlg[y][x2] = true;
                }
                // 上
                for (var y2 = y - 1; y2 >= 0; --y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x] != "") {
                        break;
                    }
                    panelFlg[y2][x] = true;
                }
                // 下
                for (var y2 = y + 1; y2 < 8; ++y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x] != "") {
                        break;
                    }
                    panelFlg[y2][x] = true;
                }

                ++count;
                if (count >= 2) {
                    return;
                }
            }
        }
    }

}

function checkBishop() {
    var count = 0;
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            if (panel[y][x] == "B") {
                // 駒のある位置をTRUE
                panelFlg[y][x] = true;
                // 右上
                for (var x2 = x + 1, y2 = y - 1; x2 < 8 && y2 >= 0; ++x2, --y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                // 右下
                for (var x2 = x + 1, y2 = y + 1; x2 < 8 && y2 < 8; ++x2, ++y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                // 左上
                for (var x2 = x - 1, y2 = y - 1; x2 >= 0 && y2 >= 0; --x2, --y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }
                // 左下
                for (var x2 = x - 1, y2 = y + 1; x2 >= 0 && y2 < 8; --x2, ++y2) {
                    // 他の駒がある場合は終了
                    if (panel[y2][x2] != "") {
                        break;
                    }
                    panelFlg[y2][x2] = true;
                }

                ++count;
                if (count >= 2) {
                    return;
                }
            }
        }
    }
}

function checkKnight() {
    var count = 0;
    var x2, y2;
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            if (panel[y][x] == "N") {
                // 駒のある位置をTRUE
                panelFlg[y][x] = true;
                // 右上
                x2 = x + 2;
                y2 = y - 1;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 右下
                x2 = x + 2;
                y2 = y + 1;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 左上
                x2 = x - 2;
                y2 = y - 1;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 左下
                x2 = x - 2;
                y2 = y + 1;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 上右
                x2 = x + 1;
                y2 = y - 2;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 上左
                x2 = x - 1;
                y2 = y - 2;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 下右
                x2 = x + 1;
                y2 = y + 2;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 下左
                x2 = x - 1;
                y2 = y + 2;
                if (x2 >= 0 && x2 < 8 && y2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                ++count;
                if (count >= 2) {
                    return;
                }
            }
        }
    }

}

function checkKing() {
    var x2, y2;
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            if (panel[y][x] == "K") {
                // 駒のある位置をTRUE
                panelFlg[y][x] = true;
                // 右
                x2 = x + 1;
                if (x2 < 8) {
                    // 他の駒がない
                    if (panel[y][x2] == "") {
                        panelFlg[y][x2] = true;
                    }
                }
                // 左
                x2 = x - 1;
                if (x2 >= 0) {
                    // 他の駒がない
                    if (panel[y][x2] == "") {
                        panelFlg[y][x2] = true;
                    }
                }
                // 上
                y2 = y - 1;
                if (y2 >= 0) {
                    // 他の駒がない
                    if (panel[y2][x] == "") {
                        panelFlg[y2][x] = true;
                    }
                }
                // 下
                y2 = y + 1;
                if (y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x] == "") {
                        panelFlg[y2][x] = true;
                    }
                }
                // 右上
                x2 = x + 1;
                y2 = y - 1;
                if (x2 < 8 && y2 >= 0) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 右下
                x2 = x + 1;
                y2 = y + 1;
                if (x2 < 8 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 左上
                x2 = x - 1;
                y2 = y - 1;
                if (x2 >= 0 && y2 >= 0) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                // 左下
                x2 = x - 1;
                y2 = y + 1;
                if (x2 >= 0 && y2 < 8) {
                    // 他の駒がない
                    if (panel[y2][x2] == "") {
                        panelFlg[y2][x2] = true;
                    }
                }
                return;
            }
        }
    }
}

function resetFlg() {
    for (var i = 0; i < 8; i++) {
        panelFlg[i] = panelFlg[i].fill(false);
    }
}

function countFlg() {
    var count = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (panelFlg[i][j]) {
                count++;
            }
        }
    }
    return count;
}

function isAllTrue() {
    if (!panelFlg[0][0]) return false;
    if (!panelFlg[0][1]) return false;
    if (!panelFlg[0][2]) return false;
    if (!panelFlg[0][3]) return false;
    if (!panelFlg[0][4]) return false;
    if (!panelFlg[0][5]) return false;
    if (!panelFlg[0][6]) return false;
    if (!panelFlg[0][7]) return false;
    if (!panelFlg[1][0]) return false;
    if (!panelFlg[1][1]) return false;
    if (!panelFlg[1][2]) return false;
    if (!panelFlg[1][3]) return false;
    if (!panelFlg[1][4]) return false;
    if (!panelFlg[1][5]) return false;
    if (!panelFlg[1][6]) return false;
    if (!panelFlg[1][7]) return false;
    if (!panelFlg[2][0]) return false;
    if (!panelFlg[2][1]) return false;
    if (!panelFlg[2][2]) return false;
    if (!panelFlg[2][3]) return false;
    if (!panelFlg[2][4]) return false;
    if (!panelFlg[2][5]) return false;
    if (!panelFlg[2][6]) return false;
    if (!panelFlg[2][7]) return false;
    if (!panelFlg[3][0]) return false;
    if (!panelFlg[3][1]) return false;
    if (!panelFlg[3][2]) return false;
    if (!panelFlg[3][3]) return false;
    if (!panelFlg[3][4]) return false;
    if (!panelFlg[3][5]) return false;
    if (!panelFlg[3][6]) return false;
    if (!panelFlg[3][7]) return false;
    if (!panelFlg[4][0]) return false;
    if (!panelFlg[4][1]) return false;
    if (!panelFlg[4][2]) return false;
    if (!panelFlg[4][3]) return false;
    if (!panelFlg[4][4]) return false;
    if (!panelFlg[4][5]) return false;
    if (!panelFlg[4][6]) return false;
    if (!panelFlg[4][7]) return false;
    if (!panelFlg[5][0]) return false;
    if (!panelFlg[5][1]) return false;
    if (!panelFlg[5][2]) return false;
    if (!panelFlg[5][3]) return false;
    if (!panelFlg[5][4]) return false;
    if (!panelFlg[5][5]) return false;
    if (!panelFlg[5][6]) return false;
    if (!panelFlg[5][7]) return false;
    if (!panelFlg[6][0]) return false;
    if (!panelFlg[6][1]) return false;
    if (!panelFlg[6][2]) return false;
    if (!panelFlg[6][3]) return false;
    if (!panelFlg[6][4]) return false;
    if (!panelFlg[6][5]) return false;
    if (!panelFlg[6][6]) return false;
    if (!panelFlg[6][7]) return false;
    if (!panelFlg[7][0]) return false;
    if (!panelFlg[7][1]) return false;
    if (!panelFlg[7][2]) return false;
    if (!panelFlg[7][3]) return false;
    if (!panelFlg[7][4]) return false;
    if (!panelFlg[7][5]) return false;
    if (!panelFlg[7][6]) return false;
    if (!panelFlg[7][7]) return false;
    return true;
}

function setResultPanel(rook, bishop, king, knight){
    var p = $("#queen").val();
    if (p != "" && !isNaN(p)) {
        $("#a" + ('00' + p).slice(-2)).text("Q");
    }
    p = $("#rook").val();
    if (p != "" && !isNaN(p)) {
        $("#a" + ('00' + p).slice(-2)).text("R");
    }
    p = $("#bishop").val();
    if (p != "" && !isNaN(p)) {
        $("#a" + ('00' + p).slice(-2)).text("B");
    }
    p = $("#knight").val();
    if (p != "" && !isNaN(p)) {
        $("#a" + ('00' + p).slice(-2)).text("N");
    }

    $("#a" + ('00' + (rook + 1)).slice(-2)).text("R");
    $("#a" + ('00' + (bishop+1)).slice(-2)).text("B");
    $("#a" + ('00' + (king+1)).slice(-2)).text("K");
    $("#a" + ('00' + (knight+1)).slice(-2)).text("N");
}

function resetResultPanle(){
    for(var i = 1; i <= 64; i++){
        $("#a" + ('00' + i).slice(-2)).text("");
    }
}