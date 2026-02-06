# Install MongoDB Locally on Windows

## Method 1: Using Chocolatey (Recommended)

1. **Install Chocolatey** (if not already installed):
   - Open PowerShell as Administrator
   - Run: `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

2. **Install MongoDB**:
   ```powershell
   choco install mongodb
   ```

3. **Start MongoDB Service**:
   ```powershell
   net start MongoDB
   ```

## Method 2: Manual Installation

1. **Download MongoDB**:
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows, Version 7.0+, Package: msi
   - Download and run the installer

2. **Install with default settings**:
   - Choose "Complete" installation
   - Install MongoDB as a Service (recommended)
   - Install MongoDB Compass (optional GUI)

3. **Verify Installation**:
   ```cmd
   mongod --version
   ```

## Method 3: Using Docker (Alternative)

If you have Docker installed:

```bash
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB container
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Stop container when done
docker stop mongodb
```

## After Installation

1. **Test Connection**:
   ```bash
   cd avanta-web
   node scripts/test-db.js
   ```

2. **Seed Initial Data**:
   ```bash
   npm run seed
   npm run create-admin
   ```

## Troubleshooting

- **Service not starting**: Run `net start MongoDB` as Administrator
- **Port 27017 in use**: Check if another MongoDB instance is running
- **Connection refused**: Ensure MongoDB service is running

## Benefits of Local MongoDB

✅ No SSL/TLS issues
✅ Faster development
✅ Works offline
✅ Full control over data
✅ No network dependencies