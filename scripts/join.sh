ID=$1
TOKEN=$2

curl https://aqueous-atoll-85096.herokuapp.com/games/$ID \
-iX "PATCH" \
-H "Authorization: Token token=${TOKEN}" \
-H "Content-Type: application/json" \
-d "{}"
