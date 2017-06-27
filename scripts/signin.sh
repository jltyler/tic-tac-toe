EMAIL=$1
PWD=$2

curl https://aqueous-atoll-85096.herokuapp.com/sign-in \
-iX "POST" \
-H "Content-Type: application/json" \
-d '{
  "credentials": {
    "email": "'"${EMAIL}"'",
    "password": "'"${PWD}"'"
  }
}'
