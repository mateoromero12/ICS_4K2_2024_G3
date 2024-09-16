const nodemailer = require("nodemailer");

//ver en el momento que cuenta nos da de prueba https://ethereal.email/create
//para ver los correos simulados deben entrar a messages
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sarah.funk14@ethereal.email",
    pass: "UJ6ghAbnc6sXABdnZJ",
  },
});

const enviarCorreoNuevaCotizacion = (correoTransportista, cotizacion) => {
  const fechaRetiroFormateada = new Date(cotizacion.fecha_retiro).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const fechaEntregaFormateada = new Date(cotizacion.fecha_entrega).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const mailOptions = {
    from: "sarah.funk14@ethereal.email",
    to: correoTransportista,
    subject: "Nueva Cotización Confirmada",
    html: `
        <div style="color: #CAF0F8; padding: 30px; background-color: #03045E; border-radius: 12px; max-width: 600px; margin: 20px auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #CAF0F8; font-weight: 600; text-align: center; margin-bottom: 20px;">Nueva Cotización Confirmada</h2>
        <p style="font-size: 16px; color: #90E0EF; text-align: center;">Tienes una nueva cotización confirmada. Detalles a continuación:</p>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse; color: #000000; background-color: #FFFFFF; text-align: left;">
            <tr>
            <td style="padding: 12px; border: 1px solid #00B4D8; font-weight: 500;">Cotización ID</td>
            <td style="padding: 12px; border: 1px solid #00B4D8;">${cotizacion.id}</td>
            </tr>
            <tr>
            <td style="padding: 12px; border: 1px solid #00B4D8; font-weight: 500;">Importe</td>
            <td style="padding: 12px; border: 1px solid #00B4D8;">${cotizacion.importe}</td>
            </tr>
            <tr>
            <td style="padding: 12px; border: 1px solid #00B4D8; font-weight: 500;">Fecha de Retiro</td>
            <td style="padding: 12px; border: 1px solid #00B4D8;">${fechaRetiroFormateada}</td>
            </tr>
            <tr>
            <td style="padding: 12px; border: 1px solid #00B4D8; font-weight: 500;">Fecha de Entrega</td>
            <td style="padding: 12px; border: 1px solid #00B4D8;">${fechaEntregaFormateada}</td>
            </tr>
        </table>

        <p style="margin-top: 30px; font-size: 14px; color: #90E0EF; text-align: center;">Gracias por usar nuestros servicios.</p>
        </div>
        `,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
    } else {
      console.log(`Correo enviado a: ${correoTransportista}`);
      console.log("Detalles del correo:", info);
    }
  });
};

module.exports = { enviarCorreoNuevaCotizacion };
