const expres = require("express");
const router = expres.Router();

const usuario = require("../controllers/user.controllers");

router.post("/login", usuario.login);
router.post("/cerrar-sesion", usuario.cerrarSesion);

module.exports = router;
