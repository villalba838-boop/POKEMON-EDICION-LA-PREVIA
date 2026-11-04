# Pokémon Edición La Previa — Web 6.43 (primera migración)

Proyecto estático generado a partir del HTML completo 6.42. No es una reimplementación: mantiene el motor y diálogos originales; únicamente extrae CSS, JavaScript e imágenes/audio como archivos estáticos.

## Ejecutar localmente

```bash
python3 -m http.server 8000
```

Abrir http://localhost:8000/. No abrir `index.html` mediante `file://` porque las rutas absolutas `/assets/...` necesitan un servidor web.

## Publicar

Subir el contenido de esta carpeta (no el ZIP como archivo visible) a un proyecto estático independiente de Vercel. Elegir Framework Preset **Other** y sin build command. El archivo `vercel.json` configura caché de assets, no de partidas.

## Guardados

El juego utiliza `localStorage` y sus claves anteriores, pero cada origen web tiene un almacenamiento independiente. Un guardado de un HTML `file://` no aparece automáticamente en la web. Exportar una partida desde la versión anterior e importarla desde la nueva; guardar una copia antes del cambio. Los archivos de partida no se suben automáticamente al servidor. No se sincronizan entre móviles.

## Advertencias

- Esta versión es la primera migración. Requiere verificar los 92 escenarios en un navegador y un teléfono reales antes de considerarla de producción.
- Conservar siempre la versión 6.42 como respaldo.
- No mezclar este proyecto con PokéDraft.
- Los recursos en `assets/` tienen nombres basados en su contenido para evitar colisiones y permitir caché estable.
