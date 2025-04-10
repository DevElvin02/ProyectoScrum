// Mantén solo las exportaciones
export const productosIniciales = [
  { 
    id: 1, 
    nombre: "Laptop HP", 
    descripcion: "Laptop HP 15 pulgadas", 
    precio: 799.99 
  },
  { 
    id: 2, 
    nombre: "Monitor Dell", 
    descripcion: "Monitor 24 pulgadas 4K", 
    precio: 299.99 
  }
];

export const clientesIniciales = [
  { 
    id: 1, 
    nombre: "Juan Pérez", 
    email: "juan@ejemplo.com" 
  },
  { 
    id: 2, 
    nombre: "María García", 
    email: "maria@ejemplo.com" 
  }
];

export const pedidosIniciales = [
  { 
    id: 1, 
    cliente_nombre: "Juan Pérez", 
    total: 799.99,
    fecha: "2024-04-05" 
  },
  { 
    id: 2, 
    cliente_nombre: "María García", 
    total: 299.99,
    fecha: "2024-04-04" 
  }
];

export const proveedoresIniciales = [
  { 
    id: 1, 
    name: "Tecnología SA",
    category: "Electrónicos",
    email: "tech@ejemplo.com"
  },
  { 
    id: 2, 
    name: "Computadoras XYZ",
    category: "Hardware",
    email: "xyz@ejemplo.com"
  }
];

export const ofertasIniciales = [
  { 
    id: 1, 
    nombre: "Descuento Laptops", 
    descripcion: "20% de descuento en laptops",
    vigencia: "2024-05-05"
  },
  { 
    id: 2, 
    nombre: "2x1 en Monitores", 
    descripcion: "Lleva 2 monitores por el precio de 1",
    vigencia: "2024-05-10"
  }
];