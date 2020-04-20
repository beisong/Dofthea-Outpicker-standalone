echo "which port"
read port
lsof -i :$port
echo "kill PID"
read PID
kill -9 $PID
