from MIPS_c import compiler
from MIPS_r import runner
from debug import debugger
from MIPS_r import reg_status
from MIPS_r import reg_list

if __name__ == "__main__":

    for item in reg_list:
        reg_status[item] = 0

    print('-'*34)
    print("Choose the function you wanna run:")
    print("1. compiler" + " "*14 + "2. runner")
    choose = input()
    if choose == '1':
        print("Input the command you want to compile. Enter q to quit.")
        while True:
            exp = input()
            if exp == "q" or exp == "":
                exit(0)
            elif exp.split()[0].lower() == "debug":
                debugger(exp)
                continue
            compiler(exp)

    elif choose == '2':
        print("Plz enter the command in hex. Enter q to quit.")
        while True:
            cmd = input()  # notice that you should input the command in hex
            if cmd == "q" or cmd == "":
                exit(0)
            elif cmd.split()[0].lower() == "debug":
                debugger(cmd)
                continue
            cmd = "0x" + cmd
            cmd = eval(cmd)  # make it a integer
            runner(cmd, 1)

    elif choose.split()[0].lower() == "debug":
        while True:
            debugger(choose)
            choose = input()
            if choose.split()[0].lower() != "debug":
                exit(0)

