# Web Scraping - Taller de Lenguajes

Este trabajo practico fue diseñado para crear un "Top 3 de Lenguajes de Programación más usados en 2024" según diferentes páginas web que encontré y comparandose entre ellas.

### ¿Qué es Web Scraping?
La técnica del Web Scraping se aplica para la extracción de datos en diferentes páginas, de forma automatizada, simulando la navegación de un humano. Estos datos pueden ser sobre textos, imágenes, precios, entre otros, especificos a un tema. Estos datos podrian ser utiles para diferentes causas (análisis de la bolsa y sus diferentes monedas, precios de productos especificos en diferentes paginas, creacion de estadisticas de destinos de viajes, etc) 

### Descripción del proyecto
Dentro de este proyecto se encuentra un archivo index.js que es donde se encuentra, junto a la libreria Playwright, los comandos basicos para realizar dicho trabajo. Este script visitará distintas páginas web (solo tres en este caso) y extraerá la información necesaria y precisa, para generar el top, almacenandose dicha informacion en un archivo ".xlsx" viendose de la siguiente manera:

  | Iberpixel | Bambu Mobile |  Teclab  |
  |    --     |     --       |    --    |
  | Puesto 1  |   Puesto 1   | Puesto 1 |
  | Puesto 2  |   Puesto 2   | Puesto 2 |
  | Puesto 3  |   Puesto 3   | Puesto 3 |
