cmake_minimum_required(VERSION 3.15)
project(Serialization)

set(CMAKE_CXX_STANDARD 14)

include_directories(src)

add_executable(Serialization
        src/main.cpp
        src/tinystr.cpp
        src/tinystr.h
        src/tinyxml.cpp
        src/tinyxml.h
        src/tinyxmlerror.cpp
        src/tinyxmlparser.cpp
        src/serialization.h
        )
