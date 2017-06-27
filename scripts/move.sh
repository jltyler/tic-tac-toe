ID=$1
INDEX=$2
VALUE=$3
GAMEOVER=$4
TOKEN=$5

curl https://aqueous-atoll-85096.herokuapp.com/games/$ID \
-iX "PATCH" \
-H "Authorization: Token token=${TOKEN}" \
-H "Content-Type: application/json" \
-d "{
  \"game\":{
    \"cell\":{
      \"index\":${INDEX},
      \"value\":\"${VALUE}\"
    },
    \"over\":${GAMEOVER}
  }
}"
