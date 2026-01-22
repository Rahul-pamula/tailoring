#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
}

trap cleanup EXIT

echo "Starting Django Backend..."
cd backend
python3 manage.py runserver &
BACKEND_PID=$!

cd ..

echo "Starting React Frontend..."
npm run dev &
FRONTEND_PID=$!

echo "Both servers are running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:8080"
echo "Press Ctrl+C to stop."

wait
