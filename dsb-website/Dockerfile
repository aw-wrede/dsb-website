FROM node:18.2-alpine
ENV NODE_ENV production
WORKDIR /web
ENV PATH ="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]