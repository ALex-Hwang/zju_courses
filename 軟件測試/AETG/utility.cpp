#include"utility.h"
#include<sstream>
#include<fstream>

using namespace std;

int read_csv(vector<vector<int>>& parameters, vector<string>& parameterTbl, vector<string>& valueTbl) {
    ifstream fp("../3-way.csv");
    bool isFirst = true;
    string temp;
    int pCount = 0;
    int vCount = 0;
    vector<int> values;

    while (getline(fp, temp, '\r')) {
        istringstream value(temp);
        string v;
        values.clear();
        while (getline(value, v, ',')) {
            if (isFirst) {
                parameterTbl.push_back(v);
                isFirst = false;
            } else {
                if (!v.empty()) {
                    valueTbl.push_back(v);
                    values.push_back(vCount++);
                }
            }
            if (v.empty())
                continue;
        }
        parameters.push_back(values);
        isFirst = true;
    }
    fp.close();
}

string interpreter(string& testcase, vector<string>& valueTbl) {
    string res;
    for (char a: testcase) {
        res += valueTbl[a-'0'];
        res.push_back(',');
    }
    return res;
}
