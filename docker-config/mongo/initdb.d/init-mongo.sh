set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')

db.createUser({
    user: '$MONGO_INITDB_USER',
    pwd: '$MONGO_INITDB_PASSWORD',
    roles: [{
        role: 'readWrite',
        db: '$MONGO_INITDB_DATABASE'
    }]
})
EOF