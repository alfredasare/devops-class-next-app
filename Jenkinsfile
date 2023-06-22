#!/usr/bin/env groovy

def gv

pipeline {
    agent any

    stages {
        stage("init") {
            steps {
                script {
                    echo "initialize"
                    gv = load "script.groovy"
                }
            }
        }

        stage("test") {
            steps {
                script {
                    gv.test()
                }
            }
        }

        stage("deploy") {
            steps {
                script {
                    gv.deploy()
                }
            }
        }
    }
}
