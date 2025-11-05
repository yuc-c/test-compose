FROM node:24.11-trixie-slim

ENV TZ="Asia/Taipei"
WORKDIR /home
EXPOSE 6173

#宣告變數war_file並設定預設值為xxx.war
ARG publish_dir=dist
COPY ./${publish_dir} .

RUN ["/bin/bash", "-c", "npm install --global serve"]

CMD ["serve", "-p", "6173"]