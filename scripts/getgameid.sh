ID=$1
TOKEN=$2

curl https://aqueous-atoll-85096.herokuapp.com/games/$ID \
-iX "GET" \
-H "Authorization: Token token=${TOKEN}"
