export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    presentation: string;
    image: string;
    stock: number;
}

export interface OrderItem extends Product {
    quantity: number;
}
