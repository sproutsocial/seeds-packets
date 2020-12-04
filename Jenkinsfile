def slack_channel = "#eng-design-systems"
def isNotJenkins() {
    def lastCommitter = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true)
    return lastCommitter != 'Sprout Jenkins'
}
pipeline {
    agent {
        node { label 'docker' }
    }

    environment {
        credentials_id = "9ed36245-2654-4261-b4df-c0a6e8611916"
        project_name = "seeds-packets"
        docker_container = "seeds-packets-build-image"
        docker_command = "docker run -e NODE_ENV=ci -e NPM_TOKEN -e HOME=. -u 10037 --rm -v ${workspace}:/workspace -w /workspace ${docker_container}:${env.GIT_COMMIT}"
        GH_TOKEN = credentials('aea69198-c3a0-41e1-9866-40937f0f0ced')
        NPM_TOKEN = credentials('npm_publish_token')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Pull Latest Docker Container') {
            steps {
                script {
                    timeout(time: 10, unit: 'MINUTES') {
                        withCredentials([sshUserPrivateKey(credentialsId: '6863b8aa-868f-42ec-bb6d-3aea529449a5', keyFileVariable: 'keyfile', passphraseVariable: '', usernameVariable: '')]) {
                            script {
                              def nodeCmd = 'docker run --rm node:alpine node -e'
                              def keyfileParts = sh(script: nodeCmd + " \"" + /process.stdout.write(JSON.stringify('/ + keyfile + /'.split('\/')).replace(\/\"\/g, '\''))/ + "\"", returnStdout: true).trim()
                              def contextPath = sh(script: "${nodeCmd} \"process.stdout.write(${keyfileParts}.slice(0, -1).join('/'))\"", returnStdout: true).trim()
                              def keyfileName = sh(script: "${nodeCmd} \"process.stdout.write(${keyfileParts}.slice(-1)[0])\"", returnStdout: true).trim()

                              sh "cp Dockerfile ${contextPath}"
                              sh "docker build --build-arg KEYFILE_NAME=${keyfileName} -t ${docker_container}:${env.GIT_COMMIT} ${contextPath}"
                            }
                        }
                    }
                }
            }
        }

        stage('Install dependencies') {
            when {
                allOf {
                    branch 'main'
                    expression {
                        isNotJenkins()
                    }
                }
            }
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        try {
                            sh "${docker_command} rm .npmrc"
                            sh "${docker_command} rm -rf node_modules"
                        } catch (err) {
                            // ignore, okay to file might not exist
                        }

                        sshagent(['6863b8aa-868f-42ec-bb6d-3aea529449a5']) {
                            sh "git checkout ${env.BRANCH_NAME};"
                            sh "git fetch --tags"
                        }

                        sh "${docker_command} /bin/sh -c 'echo \"//registry.npmjs.org/:_authToken=$NPM_TOKEN\" >> .npmrc'"
                        sh "${docker_command} yarn"
                    }
                }
            }
        }

        stage('Deploy production') {
            when {
                allOf {
                    branch 'main'
                    expression {
                        isNotJenkins()
                    }
                }
            }
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    sh "${docker_command} yarn build"
                    sh "docker run -e NODE_ENV=ci -e NPM_TOKEN -u 10037 --rm -v ${workspace}:/workspace -w /workspace ${docker_container}:${env.GIT_COMMIT} yarn release"
                }
            }
        }
    }

    post {
        always {
            // remove docker generated stuff
            sh "docker run --rm -v ${workspace}:/workspace -w /workspace ${docker_container}:${env.GIT_COMMIT} /bin/sh -c \"rm -rf node_modules packets\""

            // clear workspace
            deleteDir()
        }
  }
}