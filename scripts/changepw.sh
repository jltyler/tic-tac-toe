ID=$1
PWD=$2
NEWPWD=$3
TOKEN=$4

curl https://aqueous-atoll-85096.herokuapp.com/change-password/$ID \
-iX "PATCH" \
-H "Content-Type: application/json" \
-H "Authorization: Token token=${TOKEN}" \
-d '{
  "passwords": {
    "old": "'"${PWD}"'",
    "new": "'"${NEWPWD}"'"
  }
}'
