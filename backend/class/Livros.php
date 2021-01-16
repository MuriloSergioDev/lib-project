<?php
class Livros
{
    // Connection
    private $conn;

    // Table
    private $db_table = "livros";

    // Columns
    public $id;
    public $titulo;
    public $categoria;
    public $autor;


    // Db connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createOne()
    {
        $sql = "INSERT INTO $this->db_table VALUES (null, ?,?,? )";

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute(array($this->categoria, $this->titulo, $this->autor))) {
            return true;
        }
        //print_r( $stmt ->errorInfo());
        return false;
    }

    public function listAll()
    {
        $sql = "SELECT * FROM " . "$this->db_table";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        // $info= $sql->fetchAll();

        return $stmt;
    }

    public function updateOne()
    {
        $sql = "UPDATE 
                    " . $this->db_table . "
                SET
                    titulo = ?, 
                    categoria = ?, 
                    autor = ? 
                WHERE
                    id = ?";

        $stmt = $this->conn->prepare($sql);

        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->categoria = htmlspecialchars(strip_tags($this->categoria));
        $this->autor = htmlspecialchars(strip_tags($this->autor));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->titulo);
        $stmt->bindParam(2, $this->categoria);
        $stmt->bindParam(3, $this->autor);
        $stmt->bindParam(4, $this->id);


        if ($stmt->execute()) {
            return true;
        }
        //print_r( $stmt ->errorInfo());
        return false;
    }

    public function deleteOne()
    {
        $sql = "DELETE FROM $this->db_table WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }
}
