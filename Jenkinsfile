#!/usr/bin/env groovy

pipeline {
    agent any

    parameters {
        choice(name: 'VERSION', choices: ['1.1.0', '1.2.0', '1.3.0'], description: 'My description')
        booleanParam(name: 'executeTests', defaultValue: true, description: '')
    }

    stages {
        stage("init") {
            steps {
                script {
                    echo "initialize"
                }
            }
        }

        stage("test") {
            when {
                expression {
                    params.executeTests
                }
            }

            steps {
                script {
                    echo "testing the application..."
                }
            }
        }

        stage("deploy") {
            steps {
                script {
                    echo "deploying version ${params.VERSION}"
                }
            }
        }
    }
}
