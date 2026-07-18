# FeriApp - Privacidad geografica y niveles de usuario

## Proposito

FeriApp debe mostrar cercania sin exponer intimidad. La ubicacion exacta no debe ser un dato publico ni un beneficio automatico por registrarse.

La precision geografica debe aumentar solo cuando existe una razon concreta, consentimiento del propietario y suficiente confianza.

## Principio central

> Mas confianza y permisos pueden habilitar mas precision util, pero nunca deben eliminar el consentimiento del propietario.

## Niveles iniciales

### Visitante

Persona que entra sin cuenta.

Puede:

- explorar publicaciones cercanas;
- ver oportunidades por distancia aproximada;
- mover o mirar el radar cuando exista mapa;
- filtrar categorias basicas;
- abrir publicaciones publicas;
- compartir enlaces.

No puede:

- contactar directamente;
- publicar;
- guardar favoritos;
- crear alertas;
- pedir logistica;
- ver ubicacion exacta.

Ubicacion visible:

```text
Bicicleta rodado 26 - a menos de 1 km
Servicio de jardineria - cerca de tu zona
Mesa plegable - a menos de 2 km
```

### Cuenta gratuita

Usuario registrado con identidad minima.

Puede:

- publicar;
- contactar o marcar interes;
- guardar publicaciones;
- ver barrio o zona aproximada;
- recibir mas contexto de distancia;
- iniciar coordinacion dentro de FeriApp.

No puede:

- ver domicilio exacto automaticamente;
- saltar la coordinacion de FeriApp por defecto;
- acceder a herramientas avanzadas de logistica o confianza sin validacion adicional.

Ubicacion visible:

```text
Bicicleta rodado 26 - Barrio Centro, aprox. 900 m
Mesa plegable - Villa Norte, aprox. 1.4 km
```

### Usuario de confianza

Usuario con historial, verificaciones o permisos avanzados.

Puede:

- solicitar mas precision cuando hay interes real;
- coordinar retiro con mayor detalle;
- acceder a mas herramientas de logistica;
- usar funciones futuras de reserva, mediacion o reputacion.

No puede:

- ver ubicacion exacta sin consentimiento del propietario;
- compartir datos privados fuera de una operacion justificada.

Ubicacion visible:

```text
Zona aproximada + opcion de solicitar punto de encuentro
```

### Propietario

Usuario que crea la publicacion.

Puede:

- definir ubicacion privada;
- decidir que se muestra publicamente;
- aceptar o rechazar interesados;
- compartir mas detalle cuando exista acuerdo;
- pausar, cerrar o actualizar la publicacion.

La app debe generar una ubicacion publica aproximada a partir de la informacion privada.

## Transicion recomendada

El flujo sano es:

1. Visitante descubre una oportunidad cercana.
2. Visitante crea cuenta para contactar o guardar.
3. Usuario marca interes.
4. Propietario acepta o responde.
5. FeriApp habilita coordinacion.
6. Ambas partes pueden acordar punto cercano, retiro o logistica.

## Regla de producto

La ubicacion exacta nunca se muestra en publico. Tampoco se muestra por el simple hecho de tener cuenta gratuita.

La precision adicional requiere:

- accion concreta;
- consentimiento;
- trazabilidad minima;
- contexto de confianza.

## Riesgos a evitar

- incentivar encuentros inseguros;
- exponer domicilios;
- convertir la cuenta gratuita en atajo para sacar la operacion de FeriApp;
- cobrar por ver informacion sensible;
- prometer precision geografica antes de tener backend y permisos claros.

## Aplicacion en la demo

En esta etapa, el radar debe usar datos simulados y mostrar:

- visitante: distancia parcial y tentadora;
- cuenta gratuita: barrio y distancia mas precisa;
- usuario de confianza: mensaje de coordinacion avanzada futura;
- propietario: ubicacion privada separada de ubicacion publica.
