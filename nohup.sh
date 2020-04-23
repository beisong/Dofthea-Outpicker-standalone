export MONGO_URL="mongodb://localhost:27017/dofthea"
nohup meteor run --port 3000 --settings settings.json> meteor_logs/$(date +"%F|%T").log &

