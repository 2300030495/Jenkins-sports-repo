pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('sportsfrontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                if exist "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/reactsportsdb" (
                    rmdir /S /Q "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/reactsportsdb"
                )
                mkdir "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/reactsportsdb"
                xcopy /E /I /Y "sportsfrontend/dist/*" "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/reactsportsdb"
                """
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('sportsbackend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }


        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                if exist "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/sportsbackend.war" (
                    del /Q "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/sportsbackend.war"
                )
                if exist "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/sportsbackend" (
                    rmdir /S /Q "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/sportsbackend"
                )
                copy "sportsbackend/target/*.war" "C:/Program Files/Apache Software Foundation/Tomcat 10.1/webapps/"
                """
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}