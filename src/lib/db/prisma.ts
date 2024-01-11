import { PrismaClient } from '@prisma/client';

// This function creates a new instance of PrismaClient when called.
const prismaClientSigleton = () => {
  return new PrismaClient();
}

// This line defines a type alias PrismaClientSingleton which is the return type of the prismaClientSigleton function, i.e., an instance of PrismaClient.
type PrismaClientSingleton = ReturnType<typeof prismaClientSigleton>;

// This line of code is creating a new constant globalForPrisma that is a reference to the global object in Node.js (globalThis). The globalThis object 
// represents the global object in JavaScript, which is window in a browser environment, and global in a Node.js environment. 
// The as unknown as { prisma: PrismaClientSingleton | undefined; } part is a TypeScript type assertion. It's telling TypeScript to treat globalThis as an object with a property prisma that can either be of type PrismaClientSingleton or undefined.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
}

// This line checks if globalForPrisma.prisma already exists. If it does, it uses that; otherwise, it calls prismaClientSigleton() to create a new instance of PrismaClient.
const prisma = globalForPrisma.prisma || prismaClientSigleton();

export default prisma;


// This line checks if the environment is not production. If it's not, it assigns the prisma instance to globalForPrisma.prisma. This is done because in development, the module could be hot reloaded, which would cause new instances of PrismaClient to be created. By assigning the instance to a global variable, it ensures that the same instance is used even after hot reloads.
// This setup allows you to use the same PrismaClient instance across your application, which can help to manage database connections more efficiently, especially in serverless environments.
if(process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}