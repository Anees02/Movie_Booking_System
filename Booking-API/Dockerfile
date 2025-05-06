
FROM maven:3.8.4-openjdk-17 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build  /app/target/Booking-API-0.0.1-SNAPSHOT.jar .

EXPOSE 8080


ENTRYPOINT ["java", "-jar", "/app/Booking-API-0.0.1-SNAPSHOT.jar"]