require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const cotizacionesRoutes = require('./routes/cotizaciones');
const pagosRoutes = require('./routes/pagos');
const transportistasRoutes = require('./routes/transportista');
const authRoutes = require('./routes/auth'); 
const tarjetasRoutes = require('./routes/tarjetas');
const mailRoutes = require('./routes/mail');

app.use(cors());
app.use(express.json());

app.use('/api/cotizaciones', cotizacionesRoutes);
app.use('/api/transportistas', transportistasRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tarjetas', tarjetasRoutes);
app.use('/api/mail', mailRoutes);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
