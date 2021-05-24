#include<iostream>
#include<fstream>
#include"tinyxml.h"
#include"serialization.h"

using namespace std;


int main() {
    //=======arithmetic types
    int n0 = 5;
    int n1;
    serialization::serialize(n0, "int.xml");
    serialization::deserialize(n1, "int.xml");
    if (n0==n1)
        cout << "int passed" << endl;

    //=======vector
    vector<int> n2 = {1,1,1};
    vector<int> n3;
    serialization::serialize(n2, "vector.xml");
    serialization::deserialize(n3, "vector.xml");
    if (n2==n3)
        cout << "vector passed" << endl;

    //=======pair
    pair<int, double> n4(1, 2.341);
    pair<int, double> n5;
    serialization::serialize(n4, "pair.xml");
    serialization::deserialize(n5, "pair.xml");
    if (n4==n5)
        cout << "pair passed" << endl;

    //=======map
    map<float, string> n6 = {{2.2, "test"}};
    map<float, string> n7;
    serialization::serialize(n6, "map.xml");
    serialization::deserialize(n7, "map.xml");
    if (n6==n7)
        cout << "map passed" << endl;

    //=======list
    list<int> n8 = {1,2,4};
    list<int> n9;
    serialization::serialize(n8, "list.xml");
    serialization::deserialize(n9, "list.xml");
    if (n8==n9)
        cout << "list passed" << endl;

    //=======set
    set<int> n10 = {1,2,3};
    set<int> n11;
    serialization::serialize(n10, "set.xml");
    serialization::deserialize(n11, "set.xml");
    if (n10==n11)
        cout << "set passed" << endl;

    //=======string
    string n12 = "test";
    string n13;
    serialization::serialize(n12, "string.xml");
    serialization::deserialize(n13, "string.xml");
    if (n12==n13)
        cout << "string passed" << endl;

    //=======user_defined_type
    cout << "========" << endl;
    cout << "Test for user_defined_types" << endl;
    UserDefinedType shit;
    UserDefinedType fuck;
    shit.idx = 20;
    shit.name = "haha";
    shit.data = {2,2,21324.3};
    serialization::serialize(shit, "user.xml");
    serialization::deserialize(fuck, "user.xml");
    cout << fuck.idx << " " << fuck.name << endl;
    for (auto i: fuck.data) {
        cout << i << " " << flush;
    }

}
