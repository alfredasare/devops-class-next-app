#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage("install dependencies") {
            steps {
                scripts {
                    echo "Installing dependencies"
                }
            }
        }

        stage("test") {
            steps {
                scripts {
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
            steps {
                script {
                    echo "Deploying our app"
                }
            }
        }
    }
}
