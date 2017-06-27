EMAIL=$1
PWD=$2
CPWD=$3

curl https://aqueous-atoll-85096.herokuapp.com/sign-up \
-iX "POST" \
-H "Content-Type: application/json" \
-d '{
  "credentials": {
    "email": "'"${EMAIL}"'",
    "password": "'"${PWD}"'",
    "password_confirmation": "'"${CPWD}"'"
  }
}'
