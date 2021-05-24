import re
I_op = {'lui': 15, 'addi': 8, 'sltu': 0, 'sltiu': 11, 'andi': 12, 'ori': 13, 'xori':14, 'lw': 35, 'lwx': 34,
        'lh': 33, 'lhx': 32, 'lhu': 37, 'lhux': 36, 'sw': 43, 'swx': 42, 'sh': 41, 'shx': 40, 'beq': 4,
        'bne': 5, 'bgezal': 1}

R_fun = {'add': 32, 'sub': 34, 'slt': 42, 'and': 36, 'or': 37, 'xor': 38, 'nor': 39, 'syscall': -1,
         'sll': 0, 'sllv': 4, 'srl': 2, 'srlv': 6, 'sra': 3, 'srav': 7, 'jr': 8, 'jalr': 9, 'slti': 10}

J_op = {'j': 2, 'jal': 3}

C_type = ['mfc0', 'mtc0', 'eret']

Reg_map = {'zero': 0, 'at': 1, 'v0': 2, 'v1': 3, 'a0': 4, 'a1': 5, 'a2': 6, 'a3': 7, 't0': 8, 't1': 9,
           't2': 10, 't3': 11, 't4': 12, 't5': 13, 't6': 14, 't7': 15, 's0': 16, 's1': 17, 's2': 18,
           's3': 19, 's4': 20, 's5': 21, 's6': 22, 's7': 23, 't8': 24, 't9': 25, 'k0': 26, 'k1': 27,
           'gp': 28, 'sp': 29, 'fp': 30, 'ra': 31}


def int_to_bin(i, shift):  # convert an integer to binary including minus values
    return (bin(((1 << shift) - 1) & i)[2:]).zfill(shift)


def re_print(s):
    temp = str('{:x}'.format(int(s[:4], 2)))
    temp += str('{:x}'.format(int(s[4:8], 2)))
    temp += str('{:x}'.format(int(s[8:12], 2)))
    temp += str('{:x}'.format(int(s[12:16], 2)))
    temp += str('{:x}'.format(int(s[16:20], 2)))
    temp += str('{:x}'.format(int(s[20:24], 2)))
    temp += str('{:x}'.format(int(s[24:28], 2)))
    temp += str('{:x}'.format(int(s[28:32], 2)))

    print(temp)


def compiler(exp):
    exp = exp.lower()  # convert the expression to lower case

    cmd = exp.split(' ')[0]  # get the operation
    reg = re.findall(r'\$\w+', exp)  # get the registers
    reg = list(map(lambda x: x.strip('$'), reg))
    reg_num = len(reg)  # compute the number of registers

    m_code = ''
    if cmd in I_op:
        if cmd == 'bgezal':
            op = int_to_bin(I_op[cmd], 6)
            rs = int_to_bin(Reg_map[reg[0]], 5)
            dat = int_to_bin(int(int(re.findall(r'\-?\d+', exp.replace(reg[0], ''))[-1])/2 - 1), 16)
            m_code = op + rs + int_to_bin(17, 5) + dat
        elif reg_num == 3:  # the cmd is 'sltu'
            op = int_to_bin(I_op[cmd], 6)
            rd = int_to_bin(Reg_map[reg[0]], 5)
            rs = int_to_bin(Reg_map[reg[1]], 5)
            rt = int_to_bin(Reg_map[reg[2]], 5)
            m_code = op + rs + rt + rd + int_to_bin(0, 5) + int_to_bin(43, 6)
        elif reg_num == 2:
            op = int_to_bin(I_op[cmd], 6)
            rt = int_to_bin(Reg_map[reg[0]], 5)
            rs = int_to_bin(Reg_map[reg[1]], 5)
            if cmd == "beq" or cmd == "bne":
                rs, rt = rt, rs
                dat = int_to_bin(int(int(re.findall(r'\-?\d+', exp.replace(reg[0], '').replace(reg[1], ''))[-1])/2 - 1), 16)
            else:
                dat = int_to_bin(int(re.findall(r'\-?\d+', exp.replace(reg[0], '').replace(reg[1], ''))[-1]), 16)
            m_code = op + rs + rt + dat
        else:
            op = int_to_bin(I_op[cmd], 6)
            rs = int_to_bin(0, 5)
            rt = int_to_bin(Reg_map[reg[0]], 5)
            dat = int_to_bin(int(re.findall(r'\-?\d+', exp.replace(reg[0], ''))[-1]), 16)
            m_code = op + rs + rt + dat

    elif cmd in R_fun:
        op = int_to_bin(0, 6)  # op number for all R-type
        if reg_num == 3:  # if it has three parameters
            rd = int_to_bin(Reg_map[reg[0]], 5)
            rs = int_to_bin(Reg_map[reg[0]], 5)
            rt = int_to_bin(Reg_map[reg[0]], 5)
            sa = int_to_bin(0, 5)
            fun = int_to_bin(R_fun[cmd], 6)
            m_code = op + rs + rt + rd + sa + fun
        elif cmd == 'jalr':
            rs = int_to_bin(Reg_map[reg[0]], 5)
            rd = int_to_bin(Reg_map[reg[1]], 5)
            m_code = op + rs + int_to_bin(0, 5) + rd + int_to_bin(0, 5) + int_to_bin(9, 6)
        elif cmd == 'jr':
            rs = int_to_bin(Reg_map[reg[0]], 5)
            fun = int_to_bin(8, 6)
            m_code = op + rs + int_to_bin(0, 15) + fun
        elif reg_num == 2:
            rd = int_to_bin(Reg_map[reg[0]], 5)
            rs = int_to_bin(Reg_map[reg[1]], 5)
            sa = int_to_bin(int(exp.split(',')[-1]), 5)
            fun = int_to_bin(R_fun[cmd], 6)
            m_code = op + rs + int_to_bin(0, 5) + rd + sa + fun
        elif cmd == 'syscall':
            m_code = int_to_bin(12, 32)

    elif cmd in J_op:  # J-type
        op = int_to_bin(J_op[cmd], 6)  # op number for all R-type
        addr = int_to_bin(int(exp.replace(cmd, '')), 26)
        m_code = op + addr

    elif cmd in C_type:  # C_type
        if cmd == 'eret':
            m_code = int_to_bin(16, 6) + int_to_bin(16, 5) + int_to_bin(24, 21)
        elif cmd == 'mfc0':
            rt = int_to_bin(Reg_map[reg[0]], 5)
            rc = int_to_bin(Reg_map[reg[1]], 5)
            m_code = int_to_bin(16, 6) + int_to_bin(0, 5) + rt + rc + int_to_bin(0, 11)
        elif cmd == 'mtc0':
            rt = int_to_bin(Reg_map[reg[0]], 5)
            rc = int_to_bin(Reg_map[reg[1]], 5)
            m_code = int_to_bin(16, 6) + int_to_bin(4, 5) + rt + rc + int_to_bin(0, 11)


    if m_code:
        re_print(m_code)
    else:
        print('Wrong input!')
