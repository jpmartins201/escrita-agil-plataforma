# Estágio de build
FROM node:20-alpine AS build

WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Constrói a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:stable-alpine

# Copia os arquivos construídos do estágio de build
COPY --from=build /app/dist /usr/share/nginx/html

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o novo arquivo de configuração
COPY nginx.conf /etc/nginx/conf.d

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]