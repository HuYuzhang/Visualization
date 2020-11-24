'''
The raw data contains some dirty data, after this filter, the file becomes the format:
country male_height female_height
'''
from IPython import embed

life_f = 'life.txt'
target_f = 'clean_life.txt'

name2height = {}

f_out = open(target_f, 'w', encoding='utf-8')


for line in open(life_f, 'r').readlines():
    country, avg_l, m_l, f_l = line.split('\t')
    country = country[1:]
    f_l = float(f_l)
    m_l = float(m_l[:-1])

    f_out.write("%s %f %f\n"%(country,m_l, f_l))

f_out.close()
# embed()