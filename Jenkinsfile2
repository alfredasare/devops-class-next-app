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

        stage('set current version') {
            steps {
                script {
                    def version = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
                    echo "Current version: ${version}"
                    env.CURRENT_VERSION = version
                }
            }
        }

        stage('update current version') {
            steps {
                script {
                    def new_version = sh(script: "npm version patch --no-git-tag-version", returnStdout: true).trim()
                    echo "Updated version: ${new_version}"
                    env.NEW_VERSION = new_version
                }
            }
        }

        stage("build Docker Image") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "docker build -t ${IMAGE_NAME}-${NEW_VERSION} ."
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push ${IMAGE_NAME}-${NEW_VERSION}"
                    }
                }
            }
        }

        stage("deploy app") {
            steps {
                script {
                    echo "Deploying our app..."
                    echo "Deploying to our EC2 instance"
                    def shellCmd = "bash ./server-cmds.sh ${IMAGE_NAME}-${NEW_VERSION}"
                    def ec2Instance = "ubuntu@44.201.74.15"
                    def home = "/home/ubuntu"

                    sshagent(['next-app-server']) {
                        sh "scp -o StrictHostKeyChecking=no server-cmds.sh ${ec2Instance}:${home}"
                        sh "scp -o StrictHostKeyChecking=no docker-compose.yaml ${ec2Instance}:${home}"
                        sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${shellCmd}"
                    }
                }
            }
        }

        stage("commit version update") {
            steps {
                script {
                    sshagent(credentials: ['']) {
                        sh 'git remote set-url origin git@github.com:alfredasare/devops-class-next-app.git'
                        sh 'git add .'
                        sh 'git commit -m "ci: version bump"'
                        sh "git push origin HEAD:${BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
