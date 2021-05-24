#include"Vector.h"

using namespace std;

template <class T>
Vector<T>::Vector() {
    m_nSize = 0;
    m_nCapacity = 1;
    m_pElements = new T[1];
}

template <class T>
Vector<T>::Vector(int size) {
    int i = 0;
    while (pow(2, i) < size) {
        i++;
    }
    m_nCapacity = pow(2, i);
    m_nSize = size;
    m_pElements = new T[m_nCapacity];
}

template <class T>
Vector<T>::Vector(const Vector &r) {
    m_nSize = r.m_nSize;
    m_nCapacity = r.m_nCapacity;
    m_pElements = new T[m_nCapacity];
    for (int i = 0; i < m_nSize; i++) {
        m_pElements[i] = r.m_pElements[i];
    }
}

template <class T>
Vector<T>::~Vector() {
    delete[] m_pElements;
}
template <class T>
T & Vector<T>::operator[](int index) {
    return m_pElements[index];
}

template <class T>
T & Vector<T>::at(int index) {
    try {
        if (index < 0 || index >= m_nSize)
            throw 1;
        return m_pElements[index];
    }
    catch (int) {
        cerr << "Out of range!" << endl;
    }
}

template <class T>
int Vector<T>::size() const {
    return m_nSize;
}

template <class T>
void Vector<T>::push_back(const T &x) {
    if (m_nSize + 1 > m_nCapacity) {
        inflate();
        m_pElements[m_nSize++] = x;
    } else {
        m_pElements[m_nSize++] = x;
    }
}

template <class T>
void Vector<T>::clear() {
    m_nSize = 0;
}

template <class T>
bool Vector<T>::empty() const {
    return m_nSize == 0;
}

template <class T>
void Vector<T>::inflate() {
    m_nCapacity *= 2;
    T *temp = new T[m_nCapacity];
    for (int i = 0; i < m_nSize; i++) {
        temp[i] = m_pElements[i];
    }
    delete[] m_pElements;
    m_pElements = temp;
}

template <class T>
int Vector<T>::capacity() {
    return m_nCapacity;
}
