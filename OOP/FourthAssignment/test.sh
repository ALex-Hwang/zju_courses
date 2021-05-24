#!/bin/zsh
#this is a shell script to test the program
cd exe
echo "This a test program.\n"
echo "First, we show you the entire diaries stored in the diary.txt.\n"
./pdlist
echo "Then, we create a diary with the date '2020-07-01' and we require you to input something for it to write.\n"
./pdadd "2020-07-01"
echo "Then we show you the content you put in.\n"
./pdshow 2020-07-01
echo "Afterwards, we remove the diary you just tapped in.\n"
./pdremove 2020-07-01
echo "Finally, we run the pdlist again to show the result."
