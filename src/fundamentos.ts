// Nombre completo: Angel Daniel Rodriguez Gallegos NAO ID: 3159  Trayectoria: Full Stack Developer Core

// 1. Varios tipos de datos diferentes.

let nombre : String = "Daniel";
let edad : number = 24;
let estatus : boolean = true;

// 2. Enumeraciones para representar diferentes valores

enum TipoPolizaSeguro {
    Autos,
    Danios,
    Vida
}

//Objetos para reprentar una poliza 

interface PolizaSeguro{
    id : number;
    tipoPoliza : TipoPolizaSeguro;
    nombreCliente : string;
    prima : number;
}

//3. Los tipos any y unknown en diferentes situaciones.

//              Uso de any
let datosDesconocidos: any = {
    id: 7777,
    tipoPoliza: "Vida",
    nombreCliente: "Angel Rodriguez",
    prima: 1500
};
// Función para procesar datos desconocidos sin comprobación de tipo
function procesarDatos(datos: any): void {
    console.log(`Id: ${datos.id}`);
    console.log(`Tipo de Póliza: ${datos.tipoPoliza}`);
    console.log(`Cliente: ${datos.nombreCliente}`);
    console.log(`Prima: $${datos.prima}`);
}
// Uso de la función con datos de tipo any
procesarDatos(datosDesconocidos);

//              Uso de unknow      
let datosDesconocidosUnknown: unknown = {
    id: 7778,
    tipoPoliza: "Autos",
    nombreCliente: "Daniela Mendoza ",
    prima: 1500
};
// Función para procesar datos desconocidos con comprobación de tipo
function procesarDatosSeguro(datos: unknown): void {
    if (typeof datos === 'object' && datos !== null && 'id' in datos && 'tipoPoliza' in datos) {
        const poliza = datos as { id: number; tipoPoliza: string; nombreCliente: string; prima: number };
        console.log(`ID: ${poliza.id}`);
        console.log(`Tipo de Póliza: ${poliza.tipoPoliza}`);
        console.log(`Cliente: ${poliza.nombreCliente}`);
        console.log(`Prima: $${poliza.prima}`);
    } else {
        console.log("Los datos proporcionados no son válidos.");
    }
}
// Uso de la función con datos de tipo unknown
procesarDatosSeguro(datosDesconocidosUnknown);


// 4. Los tipos de unión e intersección en diferentes situaciones.

// Tipo de unión para representar el tipo de cobertura
type TipoCobertura = "Cobertura Básica" | "Cobertura Completa" | boolean;


interface PolizaSeguro {
    id: number;
    nombreCliente: string;
    tipoPoliza: TipoPolizaSeguro;
    cobertura: TipoCobertura;  // Puede ser una cadena o un booleano
}

// Función para describir la cobertura de la póliza
function describirCobertura(cobertura: TipoCobertura): string {
    if (typeof cobertura === 'string') {
        return `Cobertura: ${cobertura}`;
    } else if (typeof cobertura === 'boolean') {
        return cobertura ? "Cobertura Activa" : "Cobertura No Activa";
    } else {
        return "Tipo de cobertura no válido";
    }
}

// Ejemplos de pólizas con diferentes tipos de cobertura
let polizaConCobertura: PolizaSeguro = {
    id: 98765,
    nombreCliente: "Juan Rodriguez",
    tipoPoliza: TipoPolizaSeguro.Autos,
    cobertura: "Cobertura Completa",
    prima: 1500
};

let polizaSinCobertura: PolizaSeguro = {
    id: 54321,
    nombreCliente: "Vanessa Garza",
    tipoPoliza: TipoPolizaSeguro.Vida,
    cobertura: false,
    prima: 4000
};

// Uso de la función con diferentes tipos de cobertura
console.log(describirCobertura(polizaConCobertura.cobertura)); 
console.log(describirCobertura(polizaSinCobertura.cobertura)); 


// Intersección

interface DetallesPoliza {
    id: number;
    nombreCliente: string;
    tipoPoliza: TipoPolizaSeguro;
    cobertura: TipoCobertura;
}

interface ContactoAgente {
    nombreAgente: string;
    telefonoAgente: string;
    emailAgente: string;
}

// Tipo de intersección para combinar detalles de la póliza y del agente
type PolizaConContacto = DetallesPoliza & ContactoAgente;

// Creación de una póliza con detalles y contacto del agente
let polizaConContacto: PolizaConContacto = {
    id: 733464,
    nombreCliente: "Arturo Rodriguez",
    tipoPoliza: TipoPolizaSeguro.Danios,
    cobertura: "Cobertura Básica",
    nombreAgente: "Juan Tenorio",
    telefonoAgente: "7832444",
    emailAgente: "juan.tenorio@mail.com"
};

// Función para mostrar detalles de poliza y contacto de agente
function mostrarPolizaConContacto(poliza: PolizaConContacto): void {
    console.log(`Id: ${poliza.id}`);
    console.log(`Nombre cliente: ${poliza.nombreCliente}`);
    console.log(`Tipo de Póliza: ${TipoPolizaSeguro[poliza.tipoPoliza]}`);
    console.log(`Cobertura: ${describirCobertura(poliza.cobertura)}`);
    console.log(`Agente: ${poliza.nombreAgente}`);
    console.log(`Teléfono del Agente: ${poliza.telefonoAgente}`);
    console.log(`Email del Agente: ${poliza.emailAgente}`);
}

// 5. Los tipos de colección en diferentes situaciones.

// Array de polizas
let polizas: PolizaSeguro[] = [
    { id: 123, nombreCliente: "Angel Rodriguez", tipoPoliza: TipoPolizaSeguro.Danios, cobertura: "Cobertura Básica", prima: 1500 },
    { id: 456, nombreCliente: "Daniela Gomez", tipoPoliza: TipoPolizaSeguro.Vida, cobertura: "Cobertura Completa", prima: 2000 },
    { id: 789, nombreCliente: "Carlos Valle", tipoPoliza: TipoPolizaSeguro.Autos, cobertura: "Cobertura Básica", prima: 1000 }
];

function mostrarPolizas(polizas: PolizaSeguro[]): void {
    polizas.forEach(poliza => {
        console.log(`Id: ${poliza.id}, Cliente: ${poliza.nombreCliente}, Tipo: ${TipoPolizaSeguro[poliza.tipoPoliza]}, Prima: $${poliza.prima}`);
    });
}

// Mostrar todas las pólizas
mostrarPolizas(polizas);