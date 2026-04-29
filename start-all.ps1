$envFilePath = ".\.env"
if (Test-Path $envFilePath) {
    Get-Content $envFilePath | Where-Object { $_ -match '^(.*?)=(.*)$' } | ForEach-Object {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}

Write-Host "Starting Config Server..."
Start-Process "cmd.exe" -ArgumentList "/c mvnw.cmd spring-boot:run" -WorkingDirectory ".\configserver"
Start-Sleep -Seconds 10

Write-Host "Starting Eureka Server..."
Start-Process "cmd.exe" -ArgumentList "/c mvnw.cmd spring-boot:run" -WorkingDirectory ".\eureka"
Start-Sleep -Seconds 15

Write-Host "Starting API Gateway..."
Start-Process "cmd.exe" -ArgumentList "/c mvnw.cmd spring-boot:run" -WorkingDirectory ".\gateway"

Write-Host "Starting User Service..."
Start-Process "cmd.exe" -ArgumentList "/c mvnw.cmd spring-boot:run" -WorkingDirectory ".\userservice"

Write-Host "Starting Activity Service..."
Start-Process "cmd.exe" -ArgumentList "/c mvnw.cmd spring-boot:run" -WorkingDirectory ".\activityservice"

Write-Host "Starting AI Service..."
Start-Process "cmd.exe" -ArgumentList "/c mvnw.cmd spring-boot:run" -WorkingDirectory ".\aiservice"

Write-Host "Starting Frontend..."
Start-Process "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory ".\fitness-app-frontend"

Write-Host "All services have been started in new windows."
