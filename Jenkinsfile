pipeline {
     agent any
     tools {nodejs "Node 18"}
     environment{
      TESTOMATIO = credentials('TESTOMATIO')
     }

stages {
    stage('Build'){
        steps{
        cleanWs()
        checkout scm
        }
    }
    stage('Install Dependencies'){
        steps{
            sh 'npm install'
        }
    }
    stage('Api Tests'){
        steps{   
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
              sh 'echo $TESTOMATIO'
              sh 'npm run tests:api'
        }
    }
    }
    stage('Snyk Review') {
      steps {
        echo 'Testing...'
        snykSecurity(
          snykInstallation: 'snyk@latest',
          snykTokenId: 'snyk-synapsis',
        )
      }
    }
 }
}