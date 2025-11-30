export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    image: string;
    stock: number;
}

export interface OrderItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    customer: {
        id: string;
        name: string;
    };
    status: 'pending' | 'confirmed';
    timestamp: string;
}
