var Pool = require("pg").Pool;
const jwt = require("../service/jwt.service");
const globalDB = require("../config/database.config");

async function login(req, res) {
  var { user, passw, token } = req.body;
  const pool = new Pool(globalDB);
  pool.connect();
  if (user) {
    if (passw) {
      const queryy = "select * from login_usuario($1, $2)";
      await pool.query(queryy, [user, passw], (err, results) => {
        if (!err) {
          res.status(200).json(results.rows);
        } else {
          res.status(200).send({
            ok: false,
            messagge: err
          });
        }
      });
    } else {
      res.status(200).send({
        ok: false,
        messagge: "complete el campo password"
      });
    }
  } else {
    res.status(200).send({
      ok: false,
      messagge: "complete el campo user"
    });
  }
  pool.end();
}

async function cerrarSesion(req, res) {
  var { idUser } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (idUser) {
    const queryy = "CALL cerrar_inicio_sesion(?);";
    await connection.query(queryy, [idUser], (err, rows, fields) => {
      if (!err) {
        if (rows[0][0].exito === 0) {
          res.json({
            ok: false,
            status: "error al cerrar sesion"
          });
        } else {
          res.json({
            ok: true,
            status: rows[0]
          });
        }
      } else {
        res.status(200).send({
          err
        });
      }
    });
  } else {
    res.status(200).send({
      messagge: "complete el campo idUser"
    });
  }
  connection.end();
}

module.exports = {
  login,
  cerrarSesion
};
