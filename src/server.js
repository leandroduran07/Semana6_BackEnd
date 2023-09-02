import express from 'express';
import { ProductManager } from './productmanager.js'; 
const app = express();
const port = 8080;

const productsFilePath = './productos.json'; 

// Instancia de ProductManager
const productManager = new ProductManager(productsFilePath);

app.use(express.json());

// Endpoint para obtener todos los productos o limitar por query param
app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit); // Obtiene el valor de "limit" de la consulta
        const products = await productManager.getProducts();

        if (!isNaN(limit)) {
            res.json(products.slice(0, limit)); // Devuelve solo los primeros "limit" productos si se proporciona
        } else {
            res.json(products); // Devuelve todos los productos si no se proporciona "limit"
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Obtiene el valor del parámetro de ruta "id"
        const product = await productManager.getProductById(id);

        if (product) {
            res.json(product); // Devuelve el producto si se encuentra
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
