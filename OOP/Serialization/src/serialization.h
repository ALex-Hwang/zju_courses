#include<iostream>
#include<fstream>
#include<cstring>
#include"tinyxml.h"
#include<sstream>
#include<vector>
#include<set>
#include<map>
#include<list>

struct UserDefinedType {
    int idx;
    std::string name;
    std::vector<double> data;
};

template <class T>
T stoall(std::string temp) { // change string to T
    T res;
    std::stringstream sstr;
    sstr << temp;
    sstr >> res;
    sstr.clear();
    return res;
}

template <class T>
std::string alltos(T temp) { // change T to string
    std::stringstream sstr;
    std::string res;
    sstr << temp;
    sstr >> res;
    sstr.clear();
    return res;
}

namespace serialization {
    //handle the arithmetic types 
    template <class T>
    void serialize(T a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* element = new TiXmlElement(typeid(T).name());
        element -> SetAttribute("val", alltos<T>(a).c_str());
        serialization -> LinkEndChild(element);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T>
    void deserialize(T &a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* Element = rootElement->FirstChildElement();
            TiXmlAttribute* val = Element -> FirstAttribute();
            a = stoall<T>(val -> Value());
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    void serialize(std::string a, std::string filename) { // to serialize a string
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        //TiXmlDeclaration * decl = new TiXmlDeclaration("1.0", "", "");
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* stringElement = new TiXmlElement("std_string");
        stringElement -> SetAttribute("val",  a.c_str());
        //doc.LinkEndChild(decl);
        serialization -> LinkEndChild(stringElement);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    void deserialize(std::string &a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* stringElement = rootElement->FirstChildElement(); // string
            TiXmlAttribute* val = stringElement -> FirstAttribute();
            a = val -> Value();
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    template <class T1, class T2>
    void serialize(std::pair<T1, T2> a, std::string filename) { // to serialize a pair
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* pair = new TiXmlElement("std_pair");
        TiXmlElement* first = new TiXmlElement("first");
        first -> SetAttribute("val", alltos<T1>(a.first).c_str());
        TiXmlElement* second = new TiXmlElement("second");
        second -> SetAttribute("val", alltos<T2>(a.second).c_str());
        pair -> LinkEndChild(first);
        pair -> LinkEndChild(second);
        serialization -> LinkEndChild(pair);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T1, class T2>
    void deserialize(std::pair<T1, T2> &a, std::string filename) { // to deserialize a pair
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* pair = rootElement -> FirstChildElement(); // pair
            TiXmlElement* first = pair -> FirstChildElement(); // first
            TiXmlAttribute* firstAttribute = first -> FirstAttribute();
            a.first = stoall<T1>(firstAttribute -> Value());
            TiXmlElement* second = first -> NextSiblingElement();
            TiXmlAttribute* secondAttribute = second -> FirstAttribute();
            a.second = stoall<T2>(secondAttribute -> Value());
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    template <class T>
    void serialize(std::vector<T> a, std::string filename) { // to serialize a vector
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* vector = new TiXmlElement("std_vector");
        std::vector<TiXmlElement*> storage;
        TiXmlElement* cur;

        int size = a.size();
        for (int i = 0; i < size; i++) {
            //cur = new TiXmlElement(alltos<int>(i).c_str());
            cur = new TiXmlElement("element");
            cur -> SetAttribute("val", alltos<T>(a[i]).c_str());
            storage.push_back(cur);
        }
        for (auto i: storage) {
            vector -> LinkEndChild(i);
        }

        serialization -> LinkEndChild(vector);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T>
    void deserialize(std::vector<T> &a, std::string filename) { // to deserialize a vector
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* vector = rootElement -> FirstChildElement(); // vector
            TiXmlElement* vector_member = vector -> FirstChildElement();
            int i = 0;
            for (; vector_member != nullptr; i++, vector_member = vector_member -> NextSiblingElement()) {
                TiXmlAttribute* temp = vector_member -> FirstAttribute();
                a.push_back(stoall<T>(temp -> Value()));
            }
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }

    }

    template <class T>
    void serialize(std::set<T> a, std::string filename) { // to serialize a set
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* set = new TiXmlElement("std_set");
        TiXmlElement* cur;
        for (auto i = a.begin(); i != a.end(); i++ ) {
            cur = new TiXmlElement("element");
            cur -> SetAttribute("val", alltos<T>(*i).c_str());
            set -> LinkEndChild(cur);
        }
        serialization -> LinkEndChild(set);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T>
    void deserialize(std::set<T> &a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* set = rootElement -> FirstChildElement(); // set
            TiXmlElement* set_member = set -> FirstChildElement();
            int i = 0;
            for (; set_member != nullptr; i++, set_member = set_member -> NextSiblingElement()) {
                TiXmlAttribute* temp = set_member -> FirstAttribute();
                a.insert(stoall<T>(temp -> Value()));
            }
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    template <class T1, class T2>
    void serialize(std::map<T1, T2> a, std::string filename) { // to serialize a map
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* map = new TiXmlElement("std_map");
        TiXmlElement* cur;
        for (auto i = a.begin(); i != a.end(); i++) {
            cur = new TiXmlElement("element");
            cur -> SetAttribute("key", alltos<T1>((*i).first).c_str());
            cur -> SetAttribute("val", alltos<T2>((*i).second).c_str());
            map -> LinkEndChild(cur);
        }
        serialization -> LinkEndChild(map);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T1, class T2>
    void deserialize(std::map<T1, T2>& a, std::string filename) { // to deserialize a map
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* map = rootElement -> FirstChildElement(); // map
            TiXmlElement* map_member = map -> FirstChildElement();
            int i = 0;
            for (; map_member != nullptr; i++, map_member = map_member -> NextSiblingElement()) {
                TiXmlAttribute* first = map_member -> FirstAttribute();
                TiXmlAttribute* second = first -> Next();
                a.insert(std::make_pair(stoall<T1>(first -> Value()), stoall<T2>(second -> Value())));
            }
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    template <class T>
    void serialize(std::list<T> a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* list = new TiXmlElement("std_list");
        TiXmlElement* cur;
        for (auto i = a.begin(); i != a.end(); i++) {
            cur = new TiXmlElement("element");
            cur -> SetAttribute("val", alltos<T>((*i)).c_str());
            list -> LinkEndChild(cur);
        }
        serialization -> LinkEndChild(list);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T>
    void deserialize(std::list<T>& a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* list = rootElement -> FirstChildElement(); // list
            TiXmlElement* list_member = list -> FirstChildElement();
            int i = 0;
            for (; list_member != nullptr; i++, list_member = list_member -> NextSiblingElement()) {
                TiXmlAttribute* temp = list_member -> FirstAttribute();
                a.push_back(stoall<T>(temp -> Value()));
            }
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    void serialize(UserDefinedType a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* user = new TiXmlElement("UserDefinedType");
        TiXmlElement* idx = new TiXmlElement("idx");
        idx -> SetAttribute("val", alltos<int>(a.idx).c_str());
        TiXmlElement* name = new TiXmlElement("name");
        name -> SetAttribute("val", alltos<std::string>(a.name).c_str());
        TiXmlElement* data = new TiXmlElement("data");
        TiXmlElement* data_member;

        for (auto i: a.data) {
            data_member = new TiXmlElement("element");
            data_member -> SetAttribute("val", alltos<double>(i).c_str());
            data -> LinkEndChild(data_member);
        }
        user -> LinkEndChild(idx);
        user -> LinkEndChild(name);
        user -> LinkEndChild(data);
        serialization -> LinkEndChild(user);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    void deserialize(UserDefinedType &a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* user = rootElement -> FirstChildElement(); // user
            TiXmlElement* idx = user -> FirstChildElement();
            TiXmlElement* name = idx -> NextSiblingElement();
            TiXmlElement* data = name -> NextSiblingElement();

            TiXmlAttribute* idxA = idx -> FirstAttribute();
            a.idx = stoall<int>(idx->Value());
            TiXmlAttribute* nameA = name -> FirstAttribute();
            a.name = name -> Value();

            TiXmlElement* cur = data -> FirstChildElement();
            for (; cur != nullptr; cur = cur -> NextSiblingElement()) {
                TiXmlAttribute* attr = cur -> FirstAttribute();
                a.data.push_back(stoall<double>(attr->Value()));
            }
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }

    template <class T>
    void serialize(std::shared_ptr<T> a, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        TiXmlElement* serialization = new TiXmlElement("serialization");
        TiXmlElement* share = new TiXmlElement("share_ptr");
        share -> SetAttribute("address", alltos<long>((long)a.get()).c_str());
        serialization -> LinkEndChild(share);
        doc.LinkEndChild(serialization);
        doc.SaveFile(xmlFile);
    }

    template <class T>
    void deserialze(std::shared_ptr<T> &b, std::string filename) {
        std::string Path = "../conf/";
        Path += filename;
        const char* xmlFile = Path.c_str();
        TiXmlDocument doc;
        if (doc.LoadFile(xmlFile)) {
            TiXmlElement* rootElement = doc.RootElement(); // serialization
            TiXmlElement* share = rootElement -> FirstChildElement(); // share
            TiXmlAttribute* address = share -> FirstAttribute();
            //long add = stoall<long>(address->Value());
            //memcpy(&b, &add, 8);
            return;
        } else {
            std::cerr << "cannot load file " << filename << "!" << std::endl;
            return;
        }
    }
}

