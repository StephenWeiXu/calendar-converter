echo "npm build latest assets files..."
npm run build

echo "Copy file to s3..."
aws s3 sync build/ s3://calendarconverter.net/

echo "Copy done..."
echo "Check out the site at http://calendarconverter.net"
