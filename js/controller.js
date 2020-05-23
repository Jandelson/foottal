function Tempo() 
{
    var dataDia = new Date();
    var dia = dataDia.getFullYear() + '-' + dataDia.getMonth() + '-' + dataDia.getDate();
    var hora = dataDia.getHours() + ':' + dataDia.getMinutes() + ':' + dataDia.getSeconds();

    return dia + ' ' + hora;
}