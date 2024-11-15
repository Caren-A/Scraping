import playwright from 'playwright';
import xlsx from 'xlsx';

(async () => {
    const data = { 'Iberpixel': [], 'Bambu Mobile': [], 'Teclab': [] };

    const urls = [
        { url: "https://www.iberpixel.com/insights/soluciones-software/los-lenguajes-de-programacion-mas-usados-en-2024/", site: "Iberpixel"}, //ABRIL
        { url: "https://bambu-mobile.com/10-lenguajes-de-programacion-mas-usados/", site: "Bambu Mobile"}, //MAYO
        { url: "https://teclab.edu.ar/tecnologia-y-desarrollo/lenguajes-de-programacion-mas-usados/", site: "Teclab"} //JULIO
    ];
    
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const { url, site } of urls) {
        await page.goto(url);
        console.log(`Visitando ${site}...`);
        await page.waitForSelector('body'); // vista por consola página cargando el contenido correctamente

        let lenguajes = [];
        
        if (site === "Iberpixel") {
            lenguajes = await page.$$eval('div#post_contenido h4 span', items => {
                return [
                    items[0]?.innerText.trim().replace(/:.*/g, ''),  
                    items[1]?.innerText.trim().replace(/:.*/g, ''),  
                    items[2]?.innerText.trim().replace(/:.*/g, '')  
                ].filter(Boolean); // Elimina posibles valores undefined
            }
            );
        } else if (site === "Bambu Mobile") {
            lenguajes = await page.$$eval('h3.elementor-size-default', items => {
                return [
                    items[0]?.innerText.trim().replace(/[0-9.]/g, ''),  
                    items[2]?.innerText.trim().replace(/[0-9.]/g, ''),  
                    items[4]?.innerText.trim().replace(/[0-9.]/g, '')  
                ].filter(Boolean); // Elimina posibles valores undefined
            }
         );
        } else if (site === "Teclab") {
            lenguajes = await page.$$eval('ol.wp-block-list li', items => 
                items.slice(0, 3).map(item => item.innerText.trim())
            );
        }

        // Guarda los datos extraídos
        console.log(`Top 3 en Lenguajes mas usados según la página ${site}:`, lenguajes);
        data[site] = lenguajes;
    }

    await browser.close();

    // Crea las filas para el archivo Excel
    const maxRows = Math.max(...Object.values(data).map(langs => langs.length));
    const worksheetData = Array.from({ length: maxRows }, (_, i) => {
        const row = {};
        for (const site in data) {
            row[site] = data[site][i] || '';  // Rellena con una cadena vacía si no hay más datos
        }
        return row;
    });

    // Crea y guarda el archivo Excel
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(worksheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Lenguajes más usados en el 2024');
    
    xlsx.writeFile(workbook, 'Lenguajes_Mas_Usados_2024.xlsx');
    console.log('Los datos del scraping fueron guardados en el archivo "Lenguajes_Mas_Usados_2024.xlsx"');
})();