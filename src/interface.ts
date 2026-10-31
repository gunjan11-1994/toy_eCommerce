export interface Book {
    name: string;
    image: string;
    edition: string;
    author: string;
    publicationYear: string;
    format: string;
    price: number;
    mrp: number;
    discount: string;
    delivery: string;
}

export interface Toys {
    id: number,
    name: string,
    image: string,
    color: string,
}

export interface OfferToy {
    id: number,
    title: string,
    subtitle: string,
    image: string,
    btnText: string,
}
export interface CommonSwiperProps {
    heading: string;
    children: React.ReactNode;
}
export interface AgeSort {
    age: string;
    image: string
}

export interface SpecialOffer {
    id: number;
    image: string;
    name: string;
    price: number;
    MRP: number;
    category: string;
    material: string;
}

export interface Login {
    id: number,
    email: string,
    password: string
}

export interface Register {
    id: number,
    Fname: string,
    Lname: string
    username: string,
    email: string,
    password: string
}
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string[];
    color: string;
    weight: string;
    material: string;
    rating: number;
    available: boolean;
}



export interface Category {
    id: number;
    name: string;
    image: string;
    color: string;
    category: string;
}

export interface FilterState {
    inStock: boolean;
    outOfStock: boolean;
    materials: string[];
    minPrice: number;
    maxPrice: number;
}

export interface Toy {
    available: boolean;
    id: number;
    name: string;
    price: number;
    material: string;
    category: string;
    image: string;
    stock: number;
    description: string;
    rating: number;
    addedOn: string;
    favorite: boolean
}


export interface CartItem extends Omit<Toy, "id"> {
    id: number;       // Unique cart record ID
    toyId: number;    // Original toy ID
    quantity: number;
    userId: string;
}

export interface WishlistItem {
    id: string;
    userId: string;
    toyId: number;
}

export interface CartContextType {
    items: CartItem[];
    addToCart: (toy: Toy, quantity: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}


export interface BillingAddress {
    id?: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    postcode: string;
    orderNotes: string;
}

export interface Order {
    id?: number;
    userId: string | number;
    billingAddressId: number | null;
    billingAddress: BillingAddress;
    items: CartItem[];
    total: number;
    status: string;
    orderDate: string;
}