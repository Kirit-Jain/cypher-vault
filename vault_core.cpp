#include <iostream>
#include <fstream>
#include <string>
#include <vector>

using namespace std;

const string VAULT_KEY = "XYZ123";

string processData(string input)
{
    string output = input;

    for (int i = 0; i < output.size(); i++)
    {
        output[i] = input[i] ^ VAULT_KEY[i % VAULT_KEY.size()];
    }

    return output;
}


int main(int argc, char* argv[])
{
    if(argc < 2)
    {
        cout << "Error: No data is provided" << endl;
        return 1;
    }

    string raw_password = argv[1];
    if (raw_password.empty()) 
    {
        std::cerr << "Error: Password cannot be empty." << std::endl;
        return 1;
    }

    string encrypted_password = processData(raw_password);


    ofstream vault_file("vault.dat", ios::app);


    if(vault_file.is_open())
    {
        vault_file << encrypted_password << endl;
        vault_file.close();

        cout << "Success: Data encypted and stored in vault.dat" << endl;
    }
    else
    {
        cout << "Error: Unable to open vault.dat for writing" << endl;
        return 1;
    }

    return 0;
}