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
    stage('Set Logging'){
        steps{
            sh 'rm node_modules/@testomatio/reporter/lib/adapter/playwright.js'
            sh 'mv playwright.js node_modules/@testomatio/reporter/lib/adapter/playwright.js'
        }
    }
    stage('Api Tests'){
        steps{   
            catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
              sh 'npm run tests:api'
        }
    }
    }
    stage('Snyk Review') {
      steps {
        echo 'Testing...'
        snykSecurity(
          snykInstallation: 'snyk@latest',
          snykTokenId: 'snyk-personal',
        )
      }
    }
 }
}