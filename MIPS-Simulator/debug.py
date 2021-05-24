import MIPS_r

MIPS_r.pc = 0


def debugger(cmd):
    cmd = cmd.split()[1].replace("-", "").lower()
    if  cmd == "r":  # show all the registers
        for reg in list(MIPS_r.reg_status):
            print(reg, end=" ")
        print("")
        for value in MIPS_r.reg_status.values():
            print("%2d" % value, end=" ")
        print("")
    elif cmd == "d":
        if len(MIPS_r.Memory) == 0:
            print("Your memory is empty!")
            exit(0)
        print("The raw data in your memory is shown below:")
        for item in MIPS_r.Memory:
            print(item)
    elif cmd == "u":
        if len(MIPS_r.Memory) == 0:
            print("Your memory is empty!")
            exit(0)
        print("The instructions in your memory is shown below:")
        for item in MIPS_r.Memory:
            MIPS_r.runner(eval("0x" + item), 0)
    elif cmd == "a":
        ins = input("Enter the instruction you want to write into your memory:")
        MIPS_r.Memory.append(ins)
        MIPS_r.pc += 1
    elif cmd == "t":
        MIPS_r.runner(eval("0x" + MIPS_r.Memory[MIPS_r.pc - 1]), 1)
        MIPS_r.pc += 1
