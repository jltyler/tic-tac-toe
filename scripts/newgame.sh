TOKEN=$1

curl https://aqueous-atoll-85096.herokuapp.com/games \
-iX "POST" \
-H "Authorization: Token token=${TOKEN}"
