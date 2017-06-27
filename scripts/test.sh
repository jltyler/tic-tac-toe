ID=$1
INDEX=$2
VALUE=$3
GAMEOVER=$4
TOKEN=$5

curl http://httpbin.org/patch \
-iX "PATCH" \
-H "Authorization: Token token=${TOKEN}" \
-d "{
  \"id\":${ID}
  \"game\":{
    \"cell\":{
      \"index\":${INDEX},
      \"value\":\"${VALUE}\"
    },
    \"over\":${GAMEOVER}
  }
}"
