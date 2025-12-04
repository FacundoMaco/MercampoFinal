import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

// Read existing products to preserve price and stock
const existingProductsPath = path.join(srcDir, 'data', 'products.ts');
let existingProducts = [];
try {
    const content = fs.readFileSync(existingProductsPath, 'utf-8');
    // Extract the array part roughly
    const match = content.match(/export const products: Product\[\] = (\[[\s\S]*?\]);/);
    if (match) {
        // This is a bit hacky, but we just need the IDs and their price/stock.
        // Since it's TS, we can't just require it.
        // Let's use a regex to parse objects.
        const objectStrings = match[1].match(/\{[\s\S]*?\}/g);
        if (objectStrings) {
            existingProducts = objectStrings.map(s => {
                try {
                    // loose parsing
                    const id = s.match(/"id":\s*"([^"]+)"/)?.[1];
                    const price = parseFloat(s.match(/"price":\s*([0-9.]+)/)?.[1] || '0');
                    const stock = parseInt(s.match(/"stock":\s*([0-9]+)/)?.[1] || '0');
                    return { id, price, stock };
                } catch (e) { return null; }
            }).filter(Boolean);
        }
    }
} catch (e) {
    console.log("Could not read existing products, starting fresh.");
}

const productMap = new Map(existingProducts.map(p => [p.id, p]));

// CSV Files
const csvFiles = [
    { path: path.join(rootDir, 'Mercampo - productos.csv'), type: 'general' },
    { path: path.join(rootDir, '_mercampo todo  - productos frutas.csv'), type: 'fruit' }
];

let newProducts = [];

function parseCSV(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(l => l.trim());
    const headers = lines[0].split(',');

    // Helper to find index
    const idx = (name) => headers.findIndex(h => h.trim() === name);

    const idIdx = idx('ProductoID');
    const nameIdx = idx('ProductoNombre');
    const presIdx = idx('Presentación');
    const unitIdx = idx('Unidad');

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Handle commas inside quotes if necessary, but simple split for now as data seems simple
        const parts = line.split(',');
        if (parts.length < 4) continue;

        const id = parts[idIdx]?.trim();
        if (!id) continue;

        const name = parts[nameIdx]?.trim();
        const presentation = parts[presIdx]?.trim();
        const unit = parts[unitIdx]?.trim();

        // Determine Category
        let category = 'Otros';
        if (id.startsWith('TUB-') || id.startsWith('VER-')) category = 'Verduras y tubérculos';
        else if (id.startsWith('UND-')) category = 'Hortalizas';
        else if (id.startsWith('HIE-')) category = 'Hierbas y aromáticas';
        else if (id.startsWith('GOU-')) category = 'Especialidades y brotes';
        else if (id.startsWith('FRU-')) category = 'Frutas';

        // Get existing price/stock or default
        const existing = productMap.get(id);
        const price = existing ? existing.price : 0;
        const stock = existing ? existing.stock : 100; // Default stock to 100 if new

        newProducts.push({
            id,
            name,
            category,
            price,
            unit,
            presentation,
            image: "",
            stock
        });
    }
}

csvFiles.forEach(f => parseCSV(f.path));

// Generate TS content
const tsContent = `import type { Product } from '../types';

export const products: Product[] = ${JSON.stringify(newProducts, null, 2)};
`;

fs.writeFileSync(existingProductsPath, tsContent);
console.log(`Generated ${newProducts.length} products.`);
