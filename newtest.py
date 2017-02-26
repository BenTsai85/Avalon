# -*- coding: utf-8 -*-
import numpy as np

import sys


tempstr = sys.argv[1:21]
temp = [float(x) for x in tempstr]
humidstr = sys.argv[21:41]
humid = [float(x) for x in humidstr]

#print len(temp)
'''
raw_data = np.genfromtxt('test_X.csv', delimiter=',')[ :,2:]
#print raw_data
test_id_para_hour=[]
for i in range(240):
	test_id_para_hour.append([])
	for j in range(18):
		test_id_para_hour[i].append([])
        
		test_id_para_hour[i][j]+=(raw_data[18*i+j].tolist())
#print test_id_para_hour[28][0]
#w =[]#w[labels][0+days]
#for i in range(18):
#    w.append([])
'''

temp_pre = np.genfromtxt('20temp.csv',delimiter = ',')
temp_b = temp_pre[2][0]
temp_w0 = temp_pre[0].tolist()
temp_w11 = temp_pre[1].tolist()
#print temp_w0
humid_pre = np.genfromtxt('20humid.csv',delimiter = ',')
humid_b = humid_pre[2][0]
humid_w0 = humid_pre[0].tolist()
humid_w11 = humid_pre[1].tolist()
#w6 = pre[2]
#w12= pre[3]
#w[0]+=w0.tolist()
#w[11]+=w11.tolist()
#w[6]+=w6.tolist()
#w[12]+=w12.tolist()
#print w

def mod(p,data,T0_H1):#b+w[0]pm[0]+w[1]pm[1]+w[2]pm[2]+wx4....
    l=0.0
    if T0_H1==0:
        w0=temp_w0
        w11=temp_w11
    if T0_H1==1:
        w0 = humid_w0
        w11 = humid_w11

    if p ==0:
        for i in range (20):
            l += data[i]*w0[i]
    if p ==11:
        for i in range (20):
            l += data[i]*w11[i]
    else : 
        return 0
    return l



def mod2(te,hu,T0_H1):
    if T0_H1==0:
        b=temp_b
    if T0_H1==1:
        b = humid_b
    mod2_temp=b+mod(0,te,T0_H1)+mod(11,hu,T0_H1)
    return mod2_temp


new_temp = mod2(temp,humid,0)
new_humid = mod2(temp,humid,1)

print new_temp,',',new_humid
