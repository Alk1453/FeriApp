# FeriApp - Domain Model Proposal

## Entidades principales

Perfil:

- representa a una persona, comercio, profesional, empresa o prestador;
- concentra identidad, zona, validaciones, reputacion y permisos.

Nivel de usuario:

- define que puede ver y hacer un perfil o visitante;
- separa visitante, cuenta gratuita, usuario de confianza y propietario;
- aumenta precision y permisos de forma progresiva;
- nunca habilita ubicacion exacta sin consentimiento del propietario.

Publicacion simple:

- oferta puntual de venta, trueque, regalo, donacion o servicio;
- puede existir sin puesto virtual;
- tiene ubicacion privada y ubicacion publica aproximada.

Puesto virtual:

- presencia digital opcional para oferta recurrente;
- puede agrupar publicaciones, productos y servicios.

Validacion:

- registra que se reviso, cuando, por quien, con que evidencia y vencimiento.

Reputacion:

- resume experiencias de operaciones, trabajos y entregas;
- debe ser visible de forma simple y explicable.

Servicio / oferta profesional:

- describe actividad, categoria, zona, disponibilidad y requisitos de
  validacion.

Prestador logistico:

- perfil con medio de transporte, zona, capacidad, disponibilidad y reputacion.

Solicitud de entrega:

- necesidad concreta de traslado asociada o no a una operacion.

Propuesta de entrega:

- oferta de un prestador para resolver una solicitud.

Operacion:

- acuerdo entre partes: compra, trueque, donacion, servicio o entrega.

Valoracion:

- feedback posterior a una operacion o entrega.

Denuncia:

- reporte de problema sobre publicacion, perfil, puesto, operacion o entrega.

Evidencia:

- archivo, imagen, mensaje o registro usado para moderacion o validacion.

Moderacion:

- caso administrativo con estado, acciones y auditoria.

## Relaciones clave

- Perfil crea muchas publicaciones.
- Perfil puede tener cero o muchos puestos virtuales.
- Publicacion puede pertenecer o no a un puesto virtual.
- Perfil puede tener muchas validaciones.
- Operacion puede vincular publicacion, comprador, vendedor y entrega.
- Solicitud de entrega puede nacer desde una operacion o de forma independiente.
- Denuncia puede apuntar a multiples tipos de entidad.
- Evidencia puede asociarse a validaciones, denuncias o moderacion.
