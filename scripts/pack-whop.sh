#!/usr/bin/env bash
set -e

echo "Building Vite application..."
npm run build

echo "Staging Whop edge hosting package..."
rm -rf dist/package_staging
mkdir -p dist/package_staging/client dist/package_staging/server

cp -r dist/assets dist/package_staging/client/
cp -r dist/images dist/package_staging/client/
cp -r dist/badges dist/package_staging/client/
cp dist/favicon.svg dist/package_staging/client/
cp dist/index.html dist/package_staging/client/

cat << 'EOF' > dist/package_staging/server/index.js
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
EOF

cat << 'EOF' > dist/package_staging/manifest.json
{
  "manifest_version": "1.0",
  "name": "ApexShield Roofing",
  "server": "server/index.js",
  "client": "client",
  "static": "client"
}
EOF

cd dist/package_staging
zip -q -r ../whop-build.zip .
cd ../..
rm -rf dist/package_staging

echo "dist/whop-build.zip successfully created ($(du -sh dist/whop-build.zip | cut -f1))"
