#include<iostream>
#include<vector>
#include<string>

using namespace std;

// read the data from the csv
int read_csv(vector<vector<int>>& parameters, vector<string>& parameterTbl, vector<string>& valueTbl);

// interpret the output
string interpreter(string& testcase, vector<string>& valueTbl);