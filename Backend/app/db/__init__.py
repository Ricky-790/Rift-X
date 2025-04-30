from mongoengine import connect
connection_string = "mongodb://localhost:27017/Test_DB"

connect(host=connection_string, db="mydatabase")