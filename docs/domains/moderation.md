# Domain - Moderation and Safety

## Objetivo

Proteger compradores, vendedores, profesionales, comercios, prestadores y
personas que realizan entregas.

## Capacidades necesarias

- denunciar publicaciones;
- reportar perfiles;
- restringir categorias;
- moderar productos prohibidos;
- detectar contenido sospechoso;
- registrar cambios relevantes;
- revisar publicaciones de mayor riesgo;
- evitar suplantaciones;
- limitar exposicion de domicilios;
- conservar evidencia administrativa;
- controlar reincidencias.

## Entidades sugeridas

Denuncia:

- id;
- targetType;
- targetId;
- reporterId;
- reason;
- details;
- status;
- evidenceIds;
- createdAt.

Evidencia:

- id;
- type;
- storagePath;
- description;
- submittedBy;
- createdAt.

Caso de moderacion:

- id;
- targetType;
- targetId;
- assignedTo;
- status;
- resolution;
- auditTrail;

## Estados

Denuncias:

- submitted;
- triaged;
- under_review;
- resolved;
- dismissed;
- escalated.

Moderacion:

- open;
- waiting_for_evidence;
- action_required;
- actioned;
- closed.
