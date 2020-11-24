from IPython import embed

target_cty = set([
 '中国',
 '伊朗',
 '加拿大',
 '南非',
 '印度',
 '土耳其',
 '埃及',
 '墨西哥',
 '奥地利',
 '巴西',
 '德国',
 '意大利',
 '日本',
 '智利',
 '朝鲜',
 '柬埔寨',
 '比利时',
 '沙特阿拉伯',
 '波兰',
 '泰国',
 '澳大利亚',
 '瑞典',
 '瑞士',
 '美国',
 '英国',
 '荷兰',
 '菲律宾',
 '葡萄牙',
 '蒙古',
 '西班牙',
 '阿根廷',
 '韩国',
 '马来西亚'])

life_f = 'clean_life.txt'
height_f = 'clean_height.txt'
out_f = 'combine_hgt_life.txt'

# collect life
life_cty = []
cty2life = {}
for line in open(life_f, 'r', encoding='utf-8').readlines():
    line = line[:-1]
    cty, m_life, f_life= line.split(' ')
    cty2life[cty] = (m_life, f_life)

# collect height
hgt_cty = []
cty2hgt = {}
for line in open(height_f, 'r', encoding='utf-8').readlines():
    line = line[:-1]
    cty, m_hgt, f_hgt= line.split(' ')
    cty2hgt[cty] = (m_hgt, f_hgt)


with open(out_f, 'w', encoding='utf-8') as f:
    for cty in target_cty:
        f.write("%s %s %s %s %s\n"%(cty, cty2hgt[cty][0], cty2hgt[cty][1], cty2life[cty][0], cty2life[cty][1])) # format is: country male_height, female_height, male_life, female_life
        

# embed()