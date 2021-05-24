from MIPS_c import Reg_map
# 无符号右移
import ctypes


def int_overflow(val):
    maxint = 2147483647
    if not -maxint-1 <= val <= maxint:
        val = (val + (maxint + 1)) % (2 * (maxint + 1)) - maxint - 1
    return val


def unsigned_right_shitf(n, i):
    if n < 0:
        n = ctypes.c_uint32(n).value
    if i < 0:
        return -int_overflow(n << abs(i))
    return int_overflow(n >> i)


reg_list = list(Reg_map)  # a list containing all the register names
reg_status = Reg_map.copy()  # the Registers's status

rs_f = 0x3e00000
rt_f = 0x1f0000
rd_f = 0xf800
sa_f = 0x7c0
fun_f = 0x3f
ofs_f = 0xffff
adr_f = 0x0cffffff

rs_m = 21
rt_m = 16
rd_m = 11
sa_m = 6

Memory = []
pc = 0


def runner(cmd, run):

    pc = 0
    op = cmd >> 26
    if op == 1:  # bgezal
        rs = reg_list[(cmd & rs_f) >> rs_m]
        ofs = cmd & ofs_f
        ofs = (ofs + 1) * 2
        final = "bgezal " + "$" + rs + ", " + str(ofs)
    elif op == 15:  # LUi
        rt = reg_list[(cmd & rt_f) >> rt_m]
        ofs = cmd & ofs_f
        if run == 1:
            reg_status[rt] = ofs << 16
        final = "LUi $" + rt + ", " + str(ofs)
    elif op == 8:  # addi
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        if run == 1:
            reg_status[rt] = reg_status[rs] + dat
        final = "ADDi $" + rt + ", $" + rs + ", " + str(dat)
    elif op == 12:  # andi
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        if run == 1:
            reg_status[rt] = reg_status[rs] & dat
        final = "ANDi $" + rt + ", $" + rs + ", " + str(dat)
    elif op == 13:  # ori
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        if run == 1:
            reg_status[rt] = reg_status[rs] | dat
        final = "ORi $" + rt + ", $" + rs + ", " + str(dat)
    elif op == 14:  # xori
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        if run == 1:
            reg_status[rt] = reg_status[rs] ^ dat
        final = "XORi $" + rt + ", $" + rs + ", " + str(dat)
    elif op == 4:  # beq
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        if run == 1:
            if reg_status[rs] == reg_status[rt]:
                pc += dat
        final = "BEQ $" + rt + ", $" + rs + ", " + str(dat)
    elif op == 5:  # beq
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        if run == 1:
            if reg_status[rs] != reg_status[rt]:
                pc += dat
        final = "BNE $" + rt + ", $" + rs + ", " + str(dat)
    elif op == 16:  # some sys
        rs = (cmd & rs_f) >> rs_m
        rt = reg_list[(cmd & rt_f) >> rt_m]
        rd = reg_list[(cmd & rd_f) >> rd_m]
        if run == 1:
            if rs == 0:  # MFC0
                reg_status[rt] = reg_status[rd]
            elif rs == 4:
                reg_status[rd] = reg_status[rt]
    elif op == 0:  # the R type
        fun = cmd & fun_f
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        rd = reg_list[(cmd & rd_f) >> rd_m]
        sa = (cmd & sa_f) >> sa_m
        if fun == 32:  # add
            if run == 1:
                reg_status[rd] = reg_status[rs] + reg_status[rt]
            final = "ADD $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 34:  # sub
            if run == 1:
                reg_status[rd] = reg_status[rs] - reg_status[rt]
            final = "SUB $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 42:  # slt
            if run == 1:
                if reg_status[rs] < reg_status[rt]:
                    reg_status[rd] = 1
                else:
                    reg_status[rd] = 0
            final = "SLT $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 36:  # and
            if run == 1:
                reg_status[rd] = reg_status[rs] & reg_status[rt]
            final = "AND $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 37:  # or
            if run == 1:
                reg_status[rd] = reg_status[rs] | reg_status[rt]
            final = "OR $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 38:  # xor
            if run == 1:
                reg_status[rd] = reg_status[rs] ^ reg_status[rt]
            final = "XOR $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 39:  # nor
            if run == 1:
                reg_status[rd] = ~(reg_status[rs] | reg_status[rt])
            final = "NOR $" + rd + ", $" + rs + ", $ " + rt
        elif fun == 0:  # sll
            if run == 1:
                reg_status[rd] = reg_status[rs] << sa
            final = "SLL $" + rd + ", $" + rs + str(sa)
        elif fun == 4:  # sllv
            if run == 1:
                reg_status[rd] = reg_status[rs] << reg_status[rt]
            final = "SLLv $" + rd + ", $" + rs + ", $" + rt
        elif fun == 2:  # srl
            if run == 1:
                reg_status[rd] = unsigned_right_shitf(reg_status[rs], sa)
            final = "SRL $" + rd + ", $" + rs + str(sa)
        elif fun == 6:  # slrv
            if run == 1:
                reg_status[rd] = unsigned_right_shitf(reg_status[rs], reg_status[rt])
            final = "SRLv $" + rd + ", $" + rs + ", $" + rt
        elif fun == 3:  # sra
            if run == 1:
                reg_status[rd] = reg_status[rs] << sa
            final = "SRA $" + rd + ", $" + rs + str(sa)
        elif fun == 7:  # srav
            if run == 1:
                reg_status[rd] = reg_status[rs] << reg_status[rt]
            final = "SRAv $" + rd + ", $" + rs + ", $" + rt
        elif fun == 8:  # jr
            if run == 1:
                pc = reg_status[rs]
            final = "JR $" + rs
        elif fun == 9:  # jalr
            if run == 1:
                reg_status[rd] = pc
                pc = reg_status[rs]
            final = "JALr $" + rs + ", $" + rd
    elif op == 35:  # lw
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        final = "LW $" + rt + ", " + str(dat) + "($" + rs + ")"
        if run == 1:
            reg_status[rt] = Memory[reg_status[rs] + dat]
    elif op == 43:  # sw
        rs = reg_list[(cmd & rs_f) >> rs_m]
        rt = reg_list[(cmd & rt_f) >> rt_m]
        dat = cmd & ofs_f
        final = "SW $" + rt + ", " + str(dat) + "($" + rs + ")"
        if run == 1:
            Memory[reg_status[rs] + dat] = reg_status[rt]




    print(final)
