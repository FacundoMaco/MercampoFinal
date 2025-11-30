import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

const csvFiles = [
    { name: 'Mercampo - Hortalizas.csv', category: 'Hortalizas' },
    { name: 'Mercampo - Verduras y Tubérculos.csv', category: 'Verduras' }, // Default category, will refine logic
    { name: 'Mercampo - productos.csv', category: 'General' }
];

function parseCSV(content) {
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
}

function mapProduct(rawProduct, defaultCategory) {
    // Try to find ID, Name, Presentation/Unit
    const id = rawProduct['ID Producto'] || rawProduct['ProductoID'] || `GEN-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const name = rawProduct['Nombre del Producto'] || rawProduct['ProductoNombre'] || 'Producto Desconocido';
    const unit = rawProduct['Unidad'] || 'Unidad';

    // Determine category based on file or content if possible
    let category = defaultCategory;
    if (id.startsWith('TUB')) category = 'Tubérculos';
    if (id.startsWith('FRU')) category = 'Frutas';
    if (id.startsWith('VER')) category = 'Verduras';
    if (id.startsWith('HOR')) category = 'Hortalizas';

    // Generate realistic stock (simulation)
    // Bias towards high stock (50-500), but some low stock (0-20) for simulation
    const isLowStock = Math.random() < 0.1; // 10% chance of low stock
    const stock = isLowStock
        ? Math.floor(Math.random() * 20)
        : Math.floor(Math.random() * 450) + 50;

    return {
        id,
        name,
        category,
        price: Number((Math.random() * 20 + 2).toFixed(2)), // Random price between 2.00 and 22.00
        unit,
        image: "", // Empty string to use placeholder
        stock
    };
}

const allProducts = [];

csvFiles.forEach(file => {
    const filePath = path.join(projectRoot, file.name);
    if (fs.existsSync(filePath)) {
        console.log(`Processing ${file.name}...`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const rawProducts = parseCSV(content);

        rawProducts.forEach(p => {
            if (p['Nombre del Producto'] || p['ProductoNombre']) { // Basic validation
                allProducts.push(mapProduct(p, file.category));
            }
        });
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});

// Remove duplicates by ID
const uniqueProducts = Array.from(new Map(allProducts.map(item => [item.id, item])).values());

const outputContent = `import type { Product } from '../types';

export const products: Product[] = ${JSON.stringify(uniqueProducts, null, 2)};
`;

const outputPath = path.join(projectRoot, 'src', 'data', 'products.ts');
fs.writeFileSync(outputPath, outputContent);

console.log(`Successfully generated products.ts with ${uniqueProducts.length} products.`);
