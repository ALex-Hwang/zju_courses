#include <fstream>
#include"func.h"
#include"utility.h"

using namespace std;

int main() {
    /*parameters
     *
     */
    ofstream fout("../test.csv");



    int factors; // number of parameters
    int valueSize; // number of all the values
    int M = 50; // number of candidates
    int firstParam; // the first parameter
    int firstValue; // the first value
    int nextValue; // the temp value for next value
    vector<string> parameterTbl;
    vector<string> valueTbl;
    vector<vector<int>> parameters; // parameters and its values


    read_csv(parameters, parameterTbl, valueTbl);
    factors = parameters.size();
    valueSize = valueTbl.size();


    unordered_map<string, int> pool; // containing all the pairs
    vector<int> porder; // the order of the parameters !!! whose size is the number of parameters
    vector<int> uncoveredNum(valueSize, 0); // number of uncoveredPairs per value !!! whose size is the number of all the values
    string testcase(factors, '/'); // one test case
    int testcaseValue; // temp value for testcase
    vector<string> testcases; // all the testcases
    string candidate; // the winning candidate
    int candidateValue = 0; // the winning candidate value

    // porder initialization
    for (int i = 0; i < factors; i++) {
        porder.push_back(i);
    }



    // pool initialization
    generator_3(parameters, pool, uncoveredNum);

    while (!isDone(uncoveredNum)) {
        candidateValue = 0;
        for (int i = 0; i < M; i++) {
            initTestcase(testcase);
            // select one testcase
            // get the first parameter and value
            firstValue = getValue(uncoveredNum);
            firstParam = getFirstParam(firstValue, parameters);
            testcase[firstParam] = firstValue + '0'; // the first value

            // shuffle the order !!! remember to exclude the param already chosen
            random_shuffle(porder.begin(), porder.end());

            for (int i = 0; i < factors; i++) {
                if (porder[i]==firstParam)
                    continue;
                nextValue = getNextValue_3(testcase, porder[i], parameters[porder[i]], pool); // change here
                testcase[porder[i]] = nextValue+'0';
            }
            testcaseValue = testcaseCover_3(testcase, pool);
            if (testcaseValue > candidateValue) {
                candidateValue = testcaseValue;
                candidate = testcase;
            }
        }
        fout << interpreter(candidate, valueTbl) << testcaseCover_3(candidate, pool) << endl;
        updatePool_3(candidate, pool, uncoveredNum);
    }
}


