function salvarTime()
{
    var dadosTime = $('#formtime').serializeArray();
    var arrayTime = [
        dadosTime[0].value+dadosTime[1].value,
    ];

    var arrayJogadores = [
        arrayTime[0]
    ];
    var stop = false;
    dadosTime.forEach(function(item, index) {
        if (stop) {
            return;
        }
        if (item.value == '') {
            alert(item.name + ' não informado!');
            stop = true;
        }
        //Time
        if (index < 5) {
            arrayTime.push(item.value);
        }
        // Jogadores
        if (index >= 5) {
            arrayJogadores.push(item.value);
        }
    });

    if(!stop) {
        console.log('Salvando Time...');
        arrayTime.push(Tempo());
        InserirTime(arrayTime);
        arrayJogadores.push(Tempo());
        InserirJogador(arrayJogadores);
        alert('Cadastro realizado com sucesso!');
        console.log('Finalizado cadastro...');
    }
}