# OOP第一次作业

> Write a program that asks you 10 records of students. Each record consists of a name (w/o space), and scores for three courses (in integer, 1 to 5). Output a list as following and calculate average score (in float) of each student and each course. Output the lowest and highest score for each course.
>
> ```
> no      name    score1  score2  score3  average
> 1       K.Weng  5       5       5       5
> 2       T.Dixon 4       3       2       3
> 3       V.Chu   3       4       5       4
> 4       L.Tson  4       3       4       3.66667
> 5       L.Lee   3       4       3       3.33333
> 6       I.Young 4       2       5       3.66667
> 7       K.Hiro  4       2       1       2.33333
> 8       G.Ping  4       4       4       4
> 9       H.Gu    2       3       4       3
> 10      J.Jon   5       4       3       4
>         average 3.8     3.4     3.6
>         min     2       2       1
>         max     5       5       5
> 
> 
>       
>     
> ```
>
> **Evaluation standard**
>
> 1. result correctness
> 2. c++ code quality (compact and reasonable)
> 3. comments quality (clean and accurate)
> 4. c functions like `printf` and `scanf` are not allowed
>
> **Required Files**: source code, makefile (Mac, Linux), exe (Windows)



---

类的定义：

## Student:

### 成员：

- name:

Type: string

- scores:

Type: int []

### 成员函数：

- 构造函数：

参数：string name, int *scores

操作：进行初始化

- getname()

Type: string

操作：读取名字

- getscore(int i)

Type: 读取第i科目的成绩

- getave()

Type: double

Do: calculate the average scores

