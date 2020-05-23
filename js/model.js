function listaTimes() {
    var html = '';
    $("#ul_listatime").empty();
    db.transaction(function (transaction) {
        transaction.executeSql(
            "SELECT * FROM time",
            [],
            function (transaction, result) {
                console.log('times ok!');
                for (var i = 0; i < result.rows.length; i++) {
                html += '<li><a data-role="button" href="#listaJogador" data-rel="dialog" onclick="listaJogadores(' + "'" + result.rows.item(i)[['id_time']] + "'" + ')">' + result.rows.item(i)[['nometime']]  + '</a></li>';
                }
                $("#ul_listatime").append(html);
            },
            function (transaction, error) {
                console.log('Problemas com retorno de dados!');
                console.log(error);
            }
        );
    });
}

function listaJogadores(id_time) {
    var html = '';
    $("#ul_listajogador").empty();
    db.transaction(function (transaction) {
        transaction.executeSql(
            "SELECT * FROM jogador where id_time = ?",
            [id_time],
            function (transaction, result) {
                console.log('Jogadores ok!');
                var jogadores = result.rows.item(0);
                html += '<li><a data-role="button" href="#">' + jogadores.jogador_1  + '</a></li>';
                html += '<li><a data-role="button" href="#">' + jogadores.jogador_2  + '</a></li>';
                html += '<li><a data-role="button" href="#">' + jogadores.jogador_3  + '</a></li>';
                html += '<li><a data-role="button" href="#">' + jogadores.jogador_4  + '</a></li>';
                html += '<li><a data-role="button" href="#">' + jogadores.jogador_5  + '</a></li>';
                html += '<li><a data-role="button" href="#">' + jogadores.jogador_6  + '</a></li>';
                $("#ul_listajogador").append(html);
            },
            function (transaction, error) {
                console.log('Problemas com retorno de dados!');
                console.log(error);
            }
        );
    });
}

function InserirTime(dadosTime) {
    db.transaction(function (transaction) {
        transaction.executeSql(
            'INSERT INTO time (id_time, email, nometime, nomequadra, nometecnico, formacao, timestamp)'+
            'VALUES (?,?,?,?,?,?,?)', 
            dadosTime,
            function (transaction, result) {
                console.log("Time: "+ dadosTime[0]);
            },
            function (transaction, error) {
                console.log("Error: " + error.message);
            }
        );
    });
}

function InserirJogador(dadosJogador) {
    db.transaction(function (transaction) {
        transaction.executeSql(
            'INSERT INTO jogador (id_time, jogador_1, jogador_2, jogador_3, jogador_4, jogador_5, jogador_6, timestamp)'+
            'VALUES (?,?,?,?,?,?,?,?)', 
            dadosJogador,
            function (transaction, result) {
                console.log("Jogadores inseridos no time: " + dadosJogador[0]);
                return true;
            },
            function (transaction, error) {
                console.log("Error: " + error.message);
            }
        );
    });
}