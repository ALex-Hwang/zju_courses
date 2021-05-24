#include<iostream>
#include<map>
#include<vector>
#include<string>
#include<map>
#include<unordered_map>
#include<string>
#include<algorithm>

using namespace std;

/*Functions
 *
 *
 */

// may not be used
// convert the pairs into an integer which is used in pool
//int converter(vector<int> const& pairs);

// generate the pool !!! in the meantime compute the number of covering pairs per value
void generator(vector<vector<int>>& parameters, unordered_map<string, int>& pool, vector<int>& uncoveredNum);

// three-way version
void generator_3(vector<vector<int>>& parameters, unordered_map<string, int>& pool, vector<int>& uncoveredNum);

//override !!! not used
// generate the vector in order to compute the combination of the new and old value
void generator(vector<vector<int>>& parameters, vector<string>& res);

// find the value with the max uncoveredNum
// return the index of the value
// require a convertion from value index to parameter place
int getValue(vector<int>& uncoveredNum);

// to convert the value index to parameter index
int getFirstParam(int index, vector<vector<int>>& parameters);

// to compute the covering pairs of one testcase
int testcaseCover(string& testcase, unordered_map<string, int>& pool);

int testcaseCover_3(string& testcase, unordered_map<string, int>& pool);

// to compute the covering pairs of a new selected value
int valueCover(string& testcase, int index, int value, unordered_map<string, int>& pool);

int valueCover_3(string& testcase, int index, int value, unordered_map<string, int>& pool);

// select the following values
int getNextValue(string& testcase, int index, vector<int>& values, unordered_map<string, int>& pool);

int getNextValue_3(string& testcase, int index, vector<int>& values, unordered_map<string, int>& pool);

//update the pool and the uncoveredNum when a testcase is generated
void updatePool(string& testcase, unordered_map<string, int>& pool, vector<int>& uncoveredNum);

void updatePool_3(string& testcase, unordered_map<string, int>& pool, vector<int>& uncoveredNum);

// check when to terminate the program
bool isDone(vector<int>& uncoveredNum);

// second selection in 3-way
int twoCover(char a, char b, unordered_map<string, int>& pool);

// help initialize the testcase
void initTestcase(string& test);
