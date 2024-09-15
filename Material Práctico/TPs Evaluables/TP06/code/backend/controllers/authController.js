const connection = require("../config/db");

const login = (req, res) => {
  const { email, password } = req.body;

  const queryUsuario = "SELECT * FROM Usuarios WHERE email = ?";
  connection.query(queryUsuario, [email], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });
    if (results.length === 0)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const queryDador = "SELECT * FROM Dadores WHERE usuario_id = ?";
    connection.query(queryDador, [user.id], (err, dadorResults) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error al verificar el rol de dador" });

      if (dadorResults.length > 0) {
        const dador = dadorResults[0];
        const userData = {
          id: dador.id,
          username: user.username,
          email: user.email,
          role: "dador", 
        };
        return res.json(userData);
      }

      const queryTransportista = "SELECT * FROM Transportistas WHERE usuario_id = ?";
      connection.query(
        queryTransportista,
        [user.id],
        (err, transportistaResults) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Error al verificar el rol de transportista" });

          if (transportistaResults.length > 0) {
            const transportista = transportistaResults[0];
            const userData = {
              id: transportista.id, 
              username: user.username,
              email: user.email,
              role: "transportista",
            };
            return res.json(userData);
          }

          return res.status(403).json({ error: "Rol no encontrado" });
        }
      );
    });
  });
};

const logout = (req, res) => {
  res.json({ message: "Logout exitoso" });
};

module.exports = { login, logout };
