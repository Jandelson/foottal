<?php

class BancoDados
{
    public $conn;
    private $host = 'localhost';
    private $dbname = 'jandelso_foottal';
    private $user = '';
    private $senha = '';

    public function __construct()
    {
        try {
            $this->conn = new PDO('mysql:host=localhost;dbname=jandelso_foottal', $this->user, $this->senha);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          } catch(PDOException $e) {
              echo 'ERROR: ' . $e->getMessage();
          }
    }
}

class Sincronismo extends BancoDados
{
    public function __construct()
    {
        parent::__construct();
    }

    public function analisaDados($dados)
    {
        foreach ($dados as $key => $value) {
            $sql = "select id_time from time where id_time='{$value['id_time']}'";
            $consulta = $this->conn->query($sql);
            $time = $consulta->fetch(PDO::FETCH_ASSOC);
            if ($time['id_time']) {
                $this->atualizaDados($value);
            } else {
                $this->insereDados($value);
            }
        }
    }

    private function insereDados($dados)
    {
        $sql = [];
        $sql[] =
        "INSERT INTO time (id_time,email,nometime,nomequadra,nometecnico,formacao)
        VALUES (
            '{$dados['id_time']}',
            '{$dados['email']}',
            '{$dados['nometime']}',
            '{$dados['nomequadra']}',
            '{$dados['nometecnico']}',
            '{$dados['formacao']}'
        )";

        $sql[] =
        "INSERT INTO jogador (id_time,jogador_1,jogador_2,jogador_3,jogador_4,jogador_5,jogador_6)
        VALUES (
            '{$dados['id_time']}',
            '{$dados['jogador_1']}',
            '{$dados['jogador_2']}',
            '{$dados['jogador_3']}',
            '{$dados['jogador_4']}',
            '{$dados['jogador_5']}',
            '{$dados['jogador_6']}'
        )";

        foreach ($sql as $k => $v) {
            if ($this->conn->query($v) === TRUE) {
                echo "Dados do time inseridos";
            }    
        }
    }

    private function atualizaDados($dados)
    {
        $sql = [];
        $sql[] =
        "UPDATE time set 
            email='{$dados['email']}',
            nometime='{$dados['nometime']}',
            nomequadra='{$dados['nomequadra']}',
            nometecnico='{$dados['nometecnico']}',
            formacao='{$dados['formacao']}'
        where id_time='{$dados['id_time']}'
        ";

        $sql[] =
        "UPDATE jogador set
            jogador_1='{$dados['jogador_1']}',
            jogador_2='{$dados['jogador_2']}',
            jogador_3='{$dados['jogador_3']}',
            jogador_4='{$dados['jogador_4']}',
            jogador_5='{$dados['jogador_5']}',
            jogador_6='{$dados['jogador_6']}'
        where id_time='{$dados['id_time']}'
        ";

        foreach ($sql as $k => $v) {
            if ($this->conn->query($v) === TRUE) {
                echo "Dados atualizados";
            }
        }    
    }
}

$foottal = new Sincronismo();
$foottal->analisaDados($_POST['dados']);