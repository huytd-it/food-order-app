#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create .nojekyll file to bypass Jekyll processing
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# Add CNAME file if you have a custom domain
# echo "yourdomain.com" > dist/CNAME

echo "Deployment files are ready in the dist folder"
echo "Please commit and push to trigger GitHub Actions" 