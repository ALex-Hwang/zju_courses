#include"func.h"

// initialize testcase
void initTestcase(string& test) {
    int size = test.size();
    for (int i = 0; i < size; i++) {
        test[i] = '/';
    }
}

// to fill the pool
void generator(vector<vector<int>>& parameters, unordered_map<string, int>& pool, vector<int>& uncoveredNum) {
    int size = parameters.size();
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            for (auto v1: parameters[i]) {
                for (auto v2: parameters[j]) {
                    string temp;
                    temp.push_back(v1+'0');
                    temp.push_back(v2+'0');
                    uncoveredNum[v1]++;
                    uncoveredNum[v2]++;
                    pool[temp] = 1;
                }
            }
        }
    }
}

// override the generator
void generator(vector<vector<int>>& parameters, vector<string>& res) {
    int size = parameters.size();
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            for (auto v1: parameters[i]) {
                for (auto v2: parameters[j]) {
                    string temp;
                    temp.push_back(v1+'0');
                    temp.push_back(v2+'0');
                    res.push_back(temp);
                }
            }
        }
    }
}




int getValue(vector<int>& uncoveredNum) {
    int size = uncoveredNum.size();
    int Max = uncoveredNum[0];
    int index = 0;
    for (int i = 0; i < size; i++) {
        if (uncoveredNum[i]>Max) {
            index = i;
            Max = uncoveredNum[i];
        }
    }
    return index;
}


int getFirstParam(int index, vector<vector<int>>& parameters) {
    int size = parameters.size();
    int cur = 0;
    for (; cur < size; cur++) {
        if (index <= parameters[cur].back())
            return cur;
    }
    return cur;
}

int testcaseCover(string& testcase, unordered_map<string, int>& pool) {
    int res = 0;
    int size = testcase.size();
    string temp;
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            temp.clear();
            temp.push_back(testcase[i]);
            temp.push_back(testcase[j]);
            res += pool[temp];
        }
    }
    return res;
}

int valueCover(string& testcase, int index, int value, unordered_map<string, int>& pool) {
    int res = 0;
    string temp;
    int size = testcase.size();
    for (int i = 0; i < index; i++) {
        if (testcase[i]=='/')
            continue;
        temp.clear();
        temp.push_back(testcase[i]);
        temp.push_back(value+'0');
        res+=pool[temp];
    }
    for (int i = index+1; i < size; i++) {
        if (testcase[i]=='/')
            continue;
        temp.clear();
        temp.push_back(value+'0');
        temp.push_back(testcase[i]);
        res+=pool[temp];
    }
    return res;
}

int getNextValue(string& testcase, int index, vector<int>& values, unordered_map<string, int>& pool) {
    int Max = 0;
    int temp = 0;
    int res;
    for (auto value: values) {
        temp = valueCover(testcase, index, value, pool);
        if (temp >= Max) {
            Max = temp;
            res = value;
        }
    }
    return res;
}


void updatePool(string& testcase, unordered_map<string, int>& pool, vector<int>& uncoveredNum) {
    int size = testcase.size();
    string temp;
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            temp.clear();
            temp.push_back(testcase[i]);
            temp.push_back(testcase[j]);
            uncoveredNum[testcase[i] - '0'] -= pool[temp];
            uncoveredNum[testcase[j] - '0'] -= pool[temp];
            pool[temp] = 0;
        }
    }
}

bool isDone(vector<int>& uncoveredNum) {
    for (auto a: uncoveredNum) {
        if (a!=0)
            return false;
    }
    return true;
}


// three-way version is here
void generator_3(vector<vector<int>>& parameters, unordered_map<string, int>& pool, vector<int>& uncoveredNum) {
    int size = parameters.size();
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            for (int k = j + 1; k < size; k++) {
                for (auto a: parameters[i]) {
                    for (auto b: parameters[j]) {
                        for (auto c: parameters[k]) {
                            string temp;
                            temp.push_back(a+'0');
                            temp.push_back(b+'0');
                            temp.push_back(c+'0');
                            pool[temp] = 1;
                            uncoveredNum[a]++;
                            uncoveredNum[b]++;
                            uncoveredNum[c]++;
                        }
                    }
                }
            }
        }
    }
}

int testcaseCover_3(string& testcase, unordered_map<string, int>& pool) {
    int res = 0;
    string temp;
    int size = testcase.size();
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            for (int k = j + 1; k < size; k++) {
                temp.clear();
                temp.push_back(testcase[i]);
                temp.push_back(testcase[j]);
                temp.push_back(testcase[k]);
                //res += pool[temp];
                if (pool.find(temp)!=pool.end()) {
                    res++;
                }
            }
        }
    }
    return res;
}


int valueCover_3(string& testcase, int index, int value, unordered_map<string, int>& pool) { // how to choose the second value
    int size = testcase.size();
    int res = 0;
    int first = 0;
    string temp;

    int count = 0;
    for (int i = 0; i < size; i++) {
        if (testcase[i]!='/') {
            count++;
            first = i;
        }
    }
    if (count==1) {
        return twoCover(testcase[first], value+'0', pool);
    }


    for (int i = 0; i < index; i++) {
        for (int j = i + 1; j < index; j++) {
            if (testcase[i]=='/'||testcase[j]=='/')
                continue;
            temp.clear();
            temp.push_back(testcase[i]);
            temp.push_back(testcase[j]);
            temp.push_back(value+'0');
            //res += pool[temp];
            if (pool.find(temp)!=pool.end()) {
                res++;
            }
        }
    }

    for (int i = 0; i < index; i++) {
        for (int j = index + 1; j < size; j++) {
            if (testcase[i]=='/'||testcase[j]=='/')
                continue;
            temp.clear();
            temp.push_back(testcase[i]);
            temp.push_back(value+'0');
            temp.push_back(testcase[j]);
            //res += pool[temp];
            if (pool.find(temp)!=pool.end()) {
                res++;
            }
        }
    }

    for (int i = index + 1; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            if (testcase[i]=='/'||testcase[j]=='/')
                continue;
            temp.clear();
            temp.push_back(value+'0');
            temp.push_back(testcase[i]);
            temp.push_back(testcase[j]);
            //res += pool[temp];
            if (pool.find(temp)!=pool.end()) {
                res++;
            }
        }
    }
    return res;
}

int getNextValue_3(string& testcase, int index, vector<int>& values, unordered_map<string, int>& pool) {
    int Max = 0;
    int temp = 0;
    int res;
    for (auto value: values) {
        temp = valueCover_3(testcase, index, value, pool);
        if (temp >= Max) {
            Max = temp;
            res = value;
        }
    }
    return res;
}

void updatePool_3(string& testcase, unordered_map<string, int>& pool, vector<int>& uncoveredNum) {
    int size = testcase.size();
    string temp;
    for (int i = 0; i < size; i++) {
        for (int j = i + 1; j < size; j++) {
            for (int k = j + 1; k < size; k++) {
                temp.clear();
                temp.push_back(testcase[i]);
                temp.push_back(testcase[j]);
                temp.push_back(testcase[k]);
                if (pool.find(temp)!=pool.end()) {
                    uncoveredNum[testcase[i] - '0'] --;
                    uncoveredNum[testcase[j] - '0'] --;
                    uncoveredNum[testcase[k] - '0'] --;
                }
                //pool[temp] = 0;
                pool.erase(temp);
            }
        }
    }
}


int twoCover(char a, char b, unordered_map<string, int>& pool) {
    bool f1 = false;
    bool f2 = false;
    int res = 0;
    for (auto iter = pool.begin(); iter != pool.end(); iter++) {
        f1 = false;
        f2 = false;
        for (char c: iter->first) {
            if (a==c)
                f1 = true;
            if (b==c)
                f2 = true;
        }
        if (f1&&f2)
            res += iter->second;
    }
    return res;

}
