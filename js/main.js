function bancoDados() {
    console.log('Criando banco de dados...');
    db = openDatabase('foottal', '1.0', 'Times e jogos Foottal', 2 * 1024 * 1024);
    console.log(db);

    if (!db) {
        alert('Problemas com o banco de dados!');
    }

    db.transaction(function (transaction) {
        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS time (id REAL UNIQUE, email TEXT, nometime TEXT, nomequadra TEXT, nometecnico Text, formacao TEXT, timestamp REAL)'
        );
    });

    db.transaction(function (transaction) {
        transaction.executeSql('INSERT INTO time (id, email, nometime, nomequadra, nometecnico, timestamp) VALUES (?,?,?,?,?,?)', [1, 'jandelson_oliveira@yahoo.com.br','Largartixa do interior', 'Terra viva', 'Jandelson', '2020-05-22']);
    });

    db.transaction(function (transaction) {
        transaction.executeSql('INSERT INTO time (id, email, nometime, nomequadra, nometecnico, timestamp) VALUES (?,?,?,?,?,?)', [2, 'jandelson_oliveira@yahoo.com.br','AucaDemia', 'Salvação da Amizade', 'Júlio', '2020-05-22']);
    });

    db.transaction(function (transaction) {
        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS jogador (id REAL UNIQUE, id_time REAL, jogador_1 TEXT, jogador_2 TEXT, jogador_3 TEXT, jogador_4 Text, jogador_5 TEXT, jogador_6 TEXT, timestamp REAL)'
        );
    });
}

function listaTimes() {
    var html = '';
    //$("#ul_listatime").empty();
    db.transaction(function (transaction) {
        transaction.executeSql(
            "SELECT * FROM time",
            [],
            function (transaction, result) {
                console.log('times ok!');
                for (var i = 0; i < result.rows.length; i++) {
                    html += '<li><a href="#">' + result.rows.item(i)[['nometime']]  + '</a></li>';
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

bancoDados();