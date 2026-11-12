# Pokémon Edición La Previa Web 8.0 — revisión para aprobar

Fecha: 12 de noviembre de 2026. Estado: candidata de revisión; producción sin modificar.

Repositorio: https://github.com/villalba838-boop/POKEMON-EDICION-LA-PREVIA
Rama: `review/8.0-audit-20261112`.
Vista previa probada: https://pokemon-la-previa-marcel-5s6m3oa6g-marcel-s-projects-fc490bb7.vercel.app/

## Base y conservación

Se extrajo el ZIP 8.0 adjunto y se comparó con el repositorio y el despliegue publicado. La producción es 6.62, commit `e1cf43da703400094b1b507bc2bd58b2494916d8`, despliegue `dpl_2u59VkPw2Mn4VbZT4qGzJR1zR5C7`.

El ZIP 8.0 partía de una revisión anterior y no incorporaba las correcciones posteriores de producción. Se conservaron el motor 6.62, sus escenas nativas, el menú simplificado, las correcciones de Sergio y todas las funciones y recursos publicados, integrando encima la expansión. No falta ningún archivo de producción en el proyecto de revisión. Los recursos originales conservan sus bytes; se incorporaron 35 imágenes de la expansión. El inventario completo verifica 1.588 recursos mediante tamaño y SHA-256.

Se creó un ZIP íntegro de producción antes de modificar la revisión. Las operaciones remotas se hicieron exclusivamente en la rama de revisión; no se fusionó ni se promovió ningún despliegue a producción.

## Errores corregidos

| Problema | Corrección |
|---|---|
| Módulos 7.x/8.0 cargados fuera del ámbito privado del motor | Compilación de los módulos dentro del mismo ámbito. Se conservan las fuentes y un script reproducible de compilación. |
| El ZIP usaba la clave de guardado de una revisión | Se mantiene la clave publicada `la-previa-web-demo-v04`, esquema `v:1`, y se admite la clave de revisión anterior como origen de lectura. |
| El validador rechazaba los objetos nuevos de reliquias y caos | Validación acotada de las estructuras nuevas sin retirar las comprobaciones antiguas. |
| Sergio no entregaba el pase desde determinadas representaciones del personaje | Se conserva el arreglo publicado que reconoce a Sergio en Silla, pabellón, descanso y oficina. |
| Funciones nuevas sin conexión real con la historia publicada | Se conserva toda la cadena de Burger y los disparadores de Robert, cápsula de Mewtwo y ataque conjunto. |
| Recados completables únicamente por visitar una ciudad | Se añaden seis pistas examinables en los mapas; la recompensa se reclama una sola vez en el diario. |
| Identificación incorrecta de las pistas nuevas | Corregido el prefijo de sus identificadores; verificadas las seis pistas y sus premios. |
| Identificadores de Festivern y Zaragoza incompatibles con la detección de ciudad | Se reconocen Picassent y los interiores `z534_`. |
| Combates de Borxeta podían activar el avance de Blas | Resultados y banderas independientes. Borxeta tiene su nombre de entrenador en combate. |
| Presentación de Borxeta superpuesta al diálogo del inicial | Se espera al cierre del diálogo de Alfaro. El primer duelo también se puede recuperar desde el diario. |
| Botón de saltar la introducción omitía el nuevo cierre | Se enlaza al cierre actualizado; se verifican las nueve presentaciones. |
| Diario permitía movimiento detrás del panel | Pausa del mundo y liberación de teclas/joystick al abrir y cerrar. |
| Recuperación colocaba al jugador sin comprobar obstáculos | Reutiliza la búsqueda de una posición libre de producción. |
| Escenas nuevas fuera del contenedor de pantalla completa | Se montan en el elemento fullscreen cuando existe. Se mantienen las escenas nativas de producción. |
| Barra superior y botones flotantes tapaban el diario/cinemáticas en móvil | Se ocultan durante esos paneles y reaparecen al cerrarlos. |
| Robert 404 encontrado primero podía contabilizar ambos ecos | Bits independientes para los dos personajes. |
| Avance 404 separado del guardado normal | Fragmentos, ecos y final se guardan también en banderas de la partida; el formato local antiguo sigue siendo compatible. |

## Pruebas ejecutadas

Se ejecutó la aplicación real en Chrome sobre despliegues de vista previa de Vercel. Se incluyó una página `audit80.html` con pruebas de navegador y controles para reproducir escenarios de ensayo. Las pruebas usan partidas preparadas; no equivalen a completar la campaña desde cero.

- **146 comprobaciones principales: todas correctas.** Carga y decodificación de las 35 imágenes nuevas; importación de formato anterior; recarga con reliquias/caos; diario; seis pistas y premios sin duplicación; Sergio en pabellón; nueve presentaciones; tres iniciales; dibujo y cierre de 19 cinemáticas; recuperación; recorrido completo de Dimensión 404 con sus tres fragmentos, dos ecos y final; conservación al cargar; premio de 404 monedas sin duplicación.
- **29 comprobaciones de misiones y minijuegos: todas correctas.** Blas → Patri → Irene → cocina, error de receta recuperable, factura y salto de escena, bloqueo y desbloqueo del desafío, regalo de Eevee una sola vez, Última Comanda, Javi Grau, pase de Sergio, almacén cerrado/abierto y apertura de los diez minijuegos desde los marcadores.
- **28 comprobaciones de colisiones, puertas y guardados: todas correctas.** Accesibilidad de NPC, puntos de interés y puertas de Burger con radio del jugador; mobiliario sólido; cocina y exterior de ida y vuelta; puerta de postjuego bloqueada; migración de cuatro posiciones antiguas conservando equipo, bolsa, dinero, medallas y banderas; posición libre y serialización en el navegador. La muestra de Benifaió/plaza mantiene cero diferencias respecto a la geometría base.
- **Combate jugado mediante la interfaz:** Borxeta envía Squirtle; se seleccionó Ataque Ala con el botón de ataque, se aplicó daño y se llegó a la victoria con EXP. El motor resolvió el combate; no se invocó la victoria de prueba para esta comprobación.
- **Móvil simulado:** vistas 390 × 844 y 844 × 390. Diario sin desbordamiento horizontal, cierre accesible y escena de Mewtwo con botones visibles en horizontal. Capturas reales incluidas.
- **Pantalla ampliada:** se comprobó el modo inmersivo de respaldo. El navegador remoto no activó un elemento `:fullscreen`; no se certifica la API nativa de pantalla completa en este entorno. El montaje dentro del contenedor fullscreen y el cierre/restauración tienen además pruebas específicas de código.
- **Verificación adicional:** sintaxis JavaScript, integridad de 1.588 recursos y pruebas del sistema de ocho medallas, recuperación de escenas pendientes, pausa/repetición/cierre, callbacks únicos y dibujo de 19 escenas nativas. Estas verificaciones complementan las pruebas jugables.

Los informes JSON adjuntos conservan los resultados individuales. Total de comprobaciones de navegador en las tres suites: **203 correctas, 0 fallidas**. La consola no mostró excepciones atribuibles al juego durante los recorridos comprobados; hubo mensajes de una extensión del navegador ajena al proyecto.

## Límites de lo verificado

No se ha realizado una partida completa desde cero hasta capturar a Mewtwo ni se han ganado por juego manual todos los gimnasios. Sueca, Festivern, Zaragoza y el postjuego conservan el código publicado; se verificaron escenas y recursos relacionados, pero no todas sus ramas narrativas y recompensas de principio a fin. La prueba de minijuegos comprueba su apertura y salida, no todas las puntuaciones o condiciones de premio.

La compatibilidad se comprobó con partidas de ensayo y variantes de posiciones antiguas, no con una exportación de la partida personal de Marcel. No se han probado dispositivos Android/iOS físicos, Safari/Firefox, ni la escucha perceptiva de todos los sonidos. Estas limitaciones no se presentan como verificaciones superadas.

La vista previa tiene otro origen web: la partida de producción no aparece automáticamente allí. El juego conserva su exportación/importación y los respaldos; la clave publicada se mantiene para la futura actualización en el mismo dominio.

## Archivos y reproducción

- ZIP de producción 6.62 previo a los cambios.
- ZIP de la revisión 8.0, con el código que coincide con la vista previa, fuentes de los módulos, recursos y este informe.
- JSON de las tres suites y capturas reales de Burger, diario móvil y Mewtwo.
- `python3 scripts/build80.py` recompila `js/17.js` desde `js/engine80.js` y los módulos 21–35. `python3 scripts/verify_project.py` verifica los recursos. `node scripts/test-medals660.cjs` comprueba el sistema de medallas y escenas nativas.

No se ha autorizado aún publicar esta revisión en la rama principal o en el dominio de producción. La aprobación debe referirse a esta candidata y a los límites documentados.
