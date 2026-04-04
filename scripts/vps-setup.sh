#!/bin/bash
# Run this on your VPS after reinstall: bash vps-setup.sh

echo "=== Setting up UFW Firewall ==="
apt-get install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Next.js (only if not using nginx)
ufw --force enable
echo "Firewall enabled"

echo "=== Installing Fail2ban ==="
apt-get install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
echo "Fail2ban running"

echo "=== Installing PM2 ==="
npm install -g pm2
pm2 startup systemd -u root --hp /root
echo "PM2 installed"

echo "=== Installing Nginx ==="
apt-get install -y nginx

cat > /etc/nginx/sites-available/avanta << 'EOF'
server {
    listen 80;
    server_name _;

    # Rate limiting — prevents DDoS / abuse
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;
    limit_req_zone $binary_remote_addr zone=general:10m rate=60r/m;

    location /api/admin/products/upload-image {
        client_max_body_size 20M;
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }

    location /api/ {
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Block common attack paths
    location ~* \.(php|asp|aspx|jsp)$ { return 444; }
    location ~ /\. { deny all; }
}
EOF

ln -sf /etc/nginx/sites-available/avanta /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
echo "Nginx configured with rate limiting"

echo "=== Creating log directory ==="
mkdir -p /root/avanta-web/logs

echo ""
echo "=== DONE. Now deploy your app: ==="
echo "  cd /root/avanta-web"
echo "  npm install"
echo "  npm run build"
echo "  pm2 start ecosystem.config.cjs"
echo "  pm2 save"
