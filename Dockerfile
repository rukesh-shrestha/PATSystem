FROM node:18.16.0-slim
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT 3000
ENV DOMAIN_NAME http://localhost:3000
ENV CONNECTION_MONGO_STRING mongodb+srv://admin:admin@rukeshcluster0.8s6e2bj.mongodb.net/PATSystem
ENV GOOGLE_CLIENT_ID 166337648011-df2vk59h4sejg4vis4iasno07l1p2eja.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET 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
ENV SESSION_SECRET_KEY 45$%DfgdfgdfgdzfsgSDDFg@$^22%fdfgdsgg%$@3321b^77g%$%^FGY8_-h
ENV EMAIL_HOST smtp.gmail.com
ENV EMAIL_AUTH_USER rukeshportfolio@gmail.com
ENV EMAIL_AUTH_PASSWORD hpphqmwphakrklga
ENV EMAIL_PORT 465
ENV PRE http://patsystem.shrestharukesh.com.np
EXPOSE 3000
CMD [ "npm","start" ]