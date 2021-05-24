//
// Created by Alex_Hwang on 2020/5/17.
//

#ifndef SIXTHASSIGNMENT_VECTOR_H
#define SIXTHASSIGNMENT_VECTOR_H
#include<iostream>
#include<array>
#include <cmath>

using namespace std;
template <class T>

class Vector {
public:
    Vector();// creates an empty vector
    Vector(int size);// creates a vector for holding 'size' elements
    Vector(const Vector& r);// the copy ctor
    ~Vector();                     // destructs the vector
    T& operator[](int index);      // accesses the specified element without bounds checking
    T& at(int index);              // accesses the specified element, throws an exception of type 'std::out_of_range' when index <0 or >=m_nSize
    [[nodiscard]] int size() const;		 // return the size of the container
    void push_back(const T& x);    // adds an element to the end
    void clear();                  // clears the contents
    [[nodiscard]] bool empty() const;            // checks whether the container is empty
    int capacity();                // for testing
private:
    void inflate();                // expand the storage of the container to a new capacity, e.g. 2*m_nCapacity
    T *m_pElements;                // pointer to the dynamically allocated storage
    int m_nSize;                   // the number of elements in the container
    int m_nCapacity;               // the number of elements that can be held in currently allocated storage
};



#endif //SIXTHASSIGNMENT_VECTOR_H
