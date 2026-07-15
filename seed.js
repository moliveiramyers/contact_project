import { getDB } from "./src/db/connect.js"; // Garante que o caminho para o teu connect.js está correto
import dns from "dns";

// Ativa o teu truque do DNS para garantir a conexão ao Atlas
dns.setServers(['8.8.8.8']);

const seedDatabase = async () => {
    console.log("A conectar à base de dados para inserção...");
    
    // O array com os 10 contactos fake para testes
    const mockContacts = [
        { firstName: "John", lastName: "Smith", email: "john.smith@example.com", favoriteColor: "Blue", birthday: "1995-03-20" },
        { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", favoriteColor: "Red", birthday: "1992-07-14" },
        { firstName: "Carlos", lastName: "Silva", email: "carlos.silva@example.com", favoriteColor: "Green", birthday: "1988-11-02" },
        { firstName: "Ana", lastName: "Santos", email: "ana.santos@example.com", favoriteColor: "Yellow", birthday: "2000-01-25" },
        { firstName: "David", lastName: "Miller", email: "david.miller@example.com", favoriteColor: "Black", birthday: "1994-05-18" },
        { firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com", favoriteColor: "Pink", birthday: "1997-09-09" },
        { firstName: "Michael", lastName: "Brown", email: "michael.brown@example.com", favoriteColor: "Orange", birthday: "1985-12-30" },
        { firstName: "Sofia", lastName: "Ferreira", email: "sofia.f@example.com", favoriteColor: "Purple", birthday: "1999-04-12" },
        { firstName: "James", lastName: "Wilson", email: "james.w@example.com", favoriteColor: "White", birthday: "1991-08-22" },
        { firstName: "Olivia", lastName: "Taylor", email: "olivia.t@example.com", favoriteColor: "Grey", birthday: "1996-10-05" }
    ];

    try {
        const db = getDB();
        
        // Insere todos os 10 de uma só vez na coleção 'contacts'
        const result = await db.collection('contacts').insertMany(mockContacts);
        
        console.log(`Sucesso! ${result.insertedCount} contactos foram adicionados ao MongoDB Atlas.`);
        
        // Exibe os IDs gerados no terminal para poderes usar no teu ficheiro .rest
        console.log("IDs gerados para os teus testes:", result.insertedIds);
        
        process.exit(0);
    } catch (error) {
        console.error("Erro ao inserir contactos:", error);
        process.exit(1);
    }
};

// Aguarda um pequeno segundo para garantir que a conexão à BD arrancou antes de correr o seed
setTimeout(seedDatabase, 2000);