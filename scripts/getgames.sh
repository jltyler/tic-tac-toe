TOKEN=$1

curl https://aqueous-atoll-85096.herokuapp.com/games \
-iX "GET" \
-H "Authorization: Token token=${TOKEN}"
