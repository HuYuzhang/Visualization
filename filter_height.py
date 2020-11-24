'''
The raw data contains some dirty data, after this filter, the file becomes the format:
country male_height female_height
'''
from IPython import embed

height_f = 'height.txt'
target_f = 'clean_height.txt'

name2height = {}

f_out = open(target_f, 'w', encoding='utf-8')


for line in open(height_f, 'r').readlines():
    country, m_h, f_h = line.split('\t')
    country = country[1:]
    if m_h[3] == '.':
        m_h = float(m_h[:5])
    else:
        m_h = float(m_h[:3])
    if f_h[3] == '.':
        f_h = float(f_h[:5])
    else:
        f_h = float(f_h[:3])

    f_out.write("%s %f %f\n"%(country, m_h, f_h))

f_out.close()
# embed()