#!/usr/bin/env groovy

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'alfredasare/devops-demo-app:next-app'
    }

    stages {
        stage("install dependencies") {
            steps {
                script {
                    echo "Installing dependencies"
                    sh "npm ci"
                }
            }
        }

        stage("test") {
            steps {
                script {
                    echo "Running tests"
                    sh "npm run test:ci"
                }
            }
        }

        stage("build app") {
            steps {
                script {
                    echo "Building our app"
                    sh "npm run build"
                }
            }
        }

        stage("deploy app") {
            when {
                expression {
                    NEXT_ENV == 'prod'
                }
            }

            steps {
                script {
                    echo "Deploying our app"
                }
            }
        }
    }
}
