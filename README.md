# Energy-Consumption-Benchmark

The endpoints that we are gone use is:

    Register user: curl -X POST -H "Content-Type: application/json" -d '{"name": "", "username": "", "email": "","password": ""}' http://localhost:3000/users

    Register Device:curl -X POST -H "Content-Type: application/json" -d '{"user_id": "", "name": "", "location": "", "serial_number": "", "category_id": "", "brand_id": "", "model_id": ""}' http://localhost:3000/devices
    

    Register category: curl -X POST -H "Content-Type: application/json" -d '{"name": "",}' http://localhost:3000/category
    
    Register brand:  curl -X POST -H "Content-Type: application/json" -d '{"name": "",}' http://localhost:3000/brand
    

    Register ecr:  curl -X POST -H "Content-Type: application/json" -d '{"device_id": "", "energy_comsumption": "", "timestamp": ""}' http://localhost:3000/ecr

    Register model: curl -X POST -H "Content-Type: application/json" -d '{"name": "",}' http://localhost:3000/model

    Update username: curl -X PUT -H "Content-Type: application/json" -H "Authorization:" -d '{"username": "", "id": "" }' http://localhost:3000/users/username

    Update email: curl -X PUT -H "Content-Type: application/json" -H "Authorization:" -d '{"email": "", "id": "" }' http://localhost:3000/users/email

    Update nome: curl -X PUT -H "Content-Type: application/json" -H "Authorization:" -d '{"name": "Alexandre"}' http://localhost:3000/users/name

    Upadate senha: curl -X PUT -H "Content-Type: application/json" -H "Authorization:" -d '{"password": "", "id": "" }' http://localhost:3000/users/password

    Login: curl -X POST -H "Content-Type: application/json" -d '{"username_email": "", "password": "" }' http://localhost:3000/login

    Last Login: curl -X GET http://localhost:3000/users/last_login -H "Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcxNTk0NjIzNH0.BKwYwzerOi2eq48C6NZlLcach07uW-dmQebkBuNE2PA" 
