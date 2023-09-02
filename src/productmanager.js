import fs from 'fs/promises';


export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            products.push(product);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log("Producto agregado:", product);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === id);

            if (!product) {
                console.log("Producto no encontrado.");
            }

            return product;
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex((p) => p.id === id);

            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...updatedFields };
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log("Producto actualizado:", products[productIndex]);
            } else {
                console.log("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter((p) => p.id !== id);
            
            if (updatedProducts.length !== products.length) {
                await fs.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
                console.log("Producto eliminado con éxito.");
            } else {
                console.log("Producto no encontrado.");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
}


