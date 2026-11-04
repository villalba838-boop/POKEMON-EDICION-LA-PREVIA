# Pokémon La Previa Online — guía de primera publicación

## Qué se ha preparado

- Página inicial `index.html` pequeña, CSS en `/css` y motor en `/js`.
- Todos los gráficos y sonidos del HTML 6.42 separados en `/assets` sin reescalarlos ni perder calidad.
- `vercel.json` con cacheo largo **solo para gráficos con nombres basados en hash**.
- Iconos y manifest para añadir el enlace a pantalla de inicio.

## Publicación en Vercel

**Requiere autorización del espacio de Vercel y desplegar esta carpeta**, sin mezclarlo con el proyecto PokéDraft. El proyecto se puede llamar `pokemon-la-previa-marcel`.

**Opción con Vercel CLI desde ordenador:**

1. Descomprime el ZIP. Abre un terminal dentro de `Pokemon_La_Previa_6_43_Online`.
2. `npm install -g vercel` (solo si no lo tienes).
3. `vercel login` y `vercel` para crear un despliegue de prueba.
4. Comprueba en la URL de prueba la intro, casa, laboratorio, primer combate, mapas y guardado.
5. Tras validarlo, `vercel --prod` para asignar la URL permanente.

No introduzcas contraseñas ni tokens dentro del código del juego. Si usas GitHub, crea un repositorio **privado** con estos archivos y conecta ese repositorio a un nuevo proyecto Vercel. Las mejoras posteriores pueden publicarse con cada push revisado a la rama principal.

## Pasar partidas antiguas a la web

1. En el HTML antiguo, abre la partida y entra en **START → Pokémon/Equipo → Exportar partida**. Guarda el código en Notas o un archivo privado.
2. Abre el enlace web nuevo desde tu navegador habitual.
3. En las opciones del juego o en **START → Pokémon/Equipo**, selecciona **Importar partida** y pega el código.
4. Comprueba entrenador, Pokémon, medallas y avance. Guarda una copia de seguridad en otro sitio.

Importante: el guardado por `localStorage` es del **origen** (dominio). No migra automáticamente de `file://` a `https://...` ni se sincroniza entre dispositivos. La navegación privada y borrar los datos del navegador pueden eliminar la partida.

## Próximas actualizaciones

Ahora los cambios en `js/`, `css/` y `assets/` se publican por separado; las imágenes no cambiadas mantienen su nombre hash y pueden reutilizar caché.

- Antes de publicar: `python3 scripts/verify_project.py` y `node --check js/*.js` (comprobar cada archivo de forma individual).
- Hacer prueba de nuevo juego, continuar, exportar e importar y varias puertas.
- Preparar siempre un despliegue preview antes de publicar producción; conservar el previo para rollback.

## Estado de pruebas de esta migración

Se ejecutó la interfaz en Chromium usando una copia aislada de recursos aligerados (no la web completa). El arranque, la selección de entrenador y la ausencia de errores de ejecución en esa prueba se han comprobado. **No se ha validado una campaña completa en dominio web ni en móvil físico.**
