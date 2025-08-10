# Veterinaria Simple

1. Instalar dependencias: `npm install`
2. Iniciar servidor: `npm start` (o `npm run dev` si usas nodemon)
3. Abrir en el navegador: http://localhost:3000

## Construir e iniciar con Docker

```bash
# Construir la imagen
docker build -t veterinaria .

# Ejecutar el contenedor
docker run -p 3000:3000 veterinaria
```
