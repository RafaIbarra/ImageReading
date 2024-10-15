const environments = {
  development: {
    //apiUrl: "http://localhost:3000/api",
    apiUrl: "https://docs.rafaelibarra.xyz/api/",
  },
  production: {
    apiUrl: "https://docs.rafaelibarra.xyz/api/",
  },
};

const currentEnvironment = import.meta.env.MODE; // Esto toma el entorno actual de Vite (development, production, etc.)

export default environments[currentEnvironment];
