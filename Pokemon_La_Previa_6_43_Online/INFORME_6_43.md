# Pokémon Edición La Previa — 6.43: Migración a proyecto web

## Estado real

**Preparado para despliegue, todavía NO publicado en una URL pública.** El espacio de Vercel de PokéDraft necesita autorización adicional. La migración se ha realizado a partir de la 6.42, conservando el motor y los datos de aventura anteriores.

## Cambios realizados

- `index.html` reducido de **141.954.349 bytes a 14.606 bytes** al sacar los recursos embebidos y JavaScript.
- **1.362 archivos de imagen/audio** separados, con nombres deducidos de SHA-256 (104.443.939 bytes de recursos).
- **19 scripts clásicos** externalizados sin alterar su orden de ejecución.
- **5 hojas CSS** externalizadas; 4 estilos con atributos específicos permanecen en el HTML.
- `manifest.webmanifest`, iconos para pantalla de inicio y `vercel.json` con cacheo de imágenes por hash.
- Se mantiene la función existente del juego para **exportar/importar partidas**.
- Se ha generado `scripts/verify_project.py` para comprobar integridad de los recursos.

## Pruebas completadas

- Todos los scripts pasan `node --check`.
- Las 1.362 imágenes/sonidos extraídos pasan verificación SHA-256 y tamaños originales.
- Chromium, versión aislada con gráficos aligerados, abre el menú en pantalla de escritorio y móvil **sin errores JS observados**.
- Desde el menú es posible seleccionar Nueva Partida y pasar a elegir el entrenador.

## Pruebas pendientes

- Revisión integral del HTML con los recursos gráficos **completos** en un servidor HTTPS accesible.
- Recorrer la aventura completa, comprobar interiores, minijuegos, guardados y transiciones.
- Verificar rendimiento y la opción de instalar la web en un teléfono físico.
- Autorizar el espacio de Vercel, crear proyecto nuevo (sin tocar PokéDraft) y publicar la primera versión de prueba.

## Guardados

Los guardados anteriores de `file://` no se transfieren automáticamente a un dominio `https://`. Exportar el código desde el HTML antiguo e importarlo en la futura web. Las partidas del navegador local siguen siendo independientes de otros dispositivos.

## Entregables

- `Pokemon_La_Previa_6_43_Proyecto_Web.zip` — carpeta web con motor, assets, guías y archivos de configuración.
- `Pokemon_La_Previa_6_43_Online/` — código fuente desplegable con servidor web estático.

No se ha creado una URL ni un despliegue de Vercel todavía. La URL se podrá aportar solo cuando el servicio confirme que está publicado.
