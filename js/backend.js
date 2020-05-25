function enviarDados()
{
    var dados = [];

    db.transaction(function (transaction) {
        transaction.executeSql(
            "SELECT t.*,j.* FROM time t, jogador j where t.id_time = j.id_time ",
            [],
            function (transaction, result) {
                for (var i = 0; i < result.rows.length; i++) {
                    dados.push(result.rows.item(i));
                    console.log(result.rows.item(i));
                }
                $.ajax({
                    url: "backend.php",
                    type: "post",
                    data: {'dados':dados},
                    dataType: "html"
                }).done(function(resposta){
                    console.log(resposta);
                }).fail(function(jqXHR, textStatus) {
                    console.log("Fail: " + textStatus);
                }).always(function() {
                    alert('Dados enviados com sucesso!');
                    console.log('Finalizado...');
                });
            },
            function (transaction, error) {
                console.log('Problemas com retorno de dados!');
                console.log(error);
            }
        );
    });
}