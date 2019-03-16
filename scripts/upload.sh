if [ -z $S3_BUCKET ]; then
  echo "Usage: S3_BUCKET=\$S3_BUCKET npm run upload"
  exit 1
fi

cp static/index.html dist/
aws s3 sync dist/ s3://$S3_BUCKET/ --cache-control max-age=0,no-cache --delete

# the wasm file is not automatically compressed by cloudfront :(
# but we can compress it ourselves and add the right content-encoding headers
WASM_FILE=$(ls dist/ | grep '.wasm$');
npm run brotli dist/*.wasm
BROTLI_FILE=$(ls dist/ | grep wasm.br);
mv dist/$BROTLI_FILE dist/$WASM_FILE

aws s3 cp dist/*.wasm s3://$S3_BUCKET/ \
  --cache-control max-age=0,no-cache \
  --content-encoding br \
  --content-type application/wasm
