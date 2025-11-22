# Variable Definitions
CXX = g++
CXXFLAGS = -Wall -std=c++17
TARGET = vault_core

# The default rule: "make" will run this
all: $(TARGET)

# How to build the c++ executable
$(TARGET): vault_core.cpp
	@echo "Compiling C++ Core..."
	$(CXX) $(CXXFLAGS) vault_core.cpp -o $(TARGET)
	@echo "Build Complete."

# Helper to run the Node Backend
run: all
	@echo "Starting Backend Server..."
	@echo "IMPORTANT: Open a new terminal in 'client/' and run 'npm start' to see the UI."
	node server.js

# Clean up build files
clean:
	@echo "Cleaning up..."
	rm -f $(TARGET) $(TARGET).exe secure_store.dat