ID=$1
TOKEN=$2

curl https://aqueous-atoll-85096.herokuapp.com/sign-out/$ID \
-iX "DELETE" \
-H "Authorization: Token token=${TOKEN}"
