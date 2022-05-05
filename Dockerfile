FROM maven:amazoncorretto AS buildApp
WORKDIR /usr/src/mymaven
COPY pom.xml .
COPY dashboard-qube-app/ dashboard-qube-app
COPY dashboard-qube-api/ dashboard-qube-api
COPY dashboard-qube-web/ dashboard-qube-web
RUN mvn install -Pprod -pl '!dashboard-qube-api,!dashboard-qube-web' -DskipTests

FROM amazoncorretto:11
COPY --from=buildApp /usr/src/mymaven/dashboard-qube-app/target/dashboard-qube-app*.jar ./dashboard-qube-app.jar
ENTRYPOINT ["java", "-jar", "./dashboard-qube-app.jar"]
EXPOSE 8080