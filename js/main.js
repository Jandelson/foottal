function bancoDados() {
    console.log('Criando banco de dados...');
    db = openDatabase('foottal', '1.0', 'Times e jogos Foottal', 2 * 1024 * 1024);
    console.log(db);

    if (!db) {
        alert('Problemas com o banco de dados!');
    }

    db.transaction(function (transaction) {
        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS time '+
            '(id_time TEXT, email TEXT, nometime TEXT, nomequadra TEXT, nometecnico Text,'+ 
            'formacao TEXT, timestamp REAL)'
        );
    });

    db.transaction(function (transaction) {
        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS jogador '+
            '(id_time TEXT, jogador_1 TEXT, jogador_2 TEXT, jogador_3 TEXT, '+
            'jogador_4 Text, jogador_5 TEXT, jogador_6 TEXT, timestamp REAL)'
        );
    });
}

bancoDados();