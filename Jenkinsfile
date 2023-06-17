#!/usr/bin/env groovy

pipeline {
    agent any

    environment {
        NEXT_ENV = "dev"
    }

    stages {
        stage("install dependencies") {
            steps {
                script {
                    echo "Installing dependencies"
                }
            }
        }

        stage("test") {
            steps {
                script {
                    echo "Running tests"
                }
            }
        }

        stage("build app") {
            steps {
                script {
                    echo "Building our app"
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
