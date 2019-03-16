COMMAND=$1

if [ -z $TARGET ]; then
  echo "Usage: TARGET=\$TARGET npm run $COMMAND"
  exit 1
fi

cd $TARGET
make $COMMAND
