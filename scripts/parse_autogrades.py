import csv
from collections import defaultdict



def get_assignment(n,k,reader):
    data.seek(0)

    assignment= defaultdict(int)
    firstline=True
    for row in reader:
        if firstline:
            firstline=False
        else:
            if (int(row['HW']) is n): # and (int(row['SUBMISSION']) == k):
                assignment[row['STUDENTID']] = row['SCORE']
    
    return assignment

def get_timestamp(n,k,reader):
    data.seek(0)

    assignment= defaultdict(int)
    firstline=True
    for row in reader:
        if firstline:
            firstline=False
        else:
            if (int(row['HW']) is n) and (int(row['SUBMISSION']) == k):
                assignment[row['STUDENTID']] = row['TIMESTAMP']
    
    return assignment

data = open('proglang002-all-autograder-submissions.csv')
reader = csv.DictReader(data)

studentset = set()
for row in reader:
   studentset.add(row['STUDENTID'])
 
hw1 = get_assignment(5,1,reader)
hw2 = get_assignment(6,1,reader)
hw3 = get_assignment(11,1,reader)
hw4 = get_assignment(13,1,reader)
hw5 = get_assignment(15,1,reader)
hw6 = get_assignment(17,1,reader)
hw7a = get_assignment(20,1,reader)
hw7b = get_assignment(21,1,reader)

t1 = get_timestamp(5,1,reader)
t2 = get_timestamp(6,1,reader)
t3 = get_timestamp(11,1,reader)
t4 = get_timestamp(13,1,reader)
t5 = get_timestamp(15,1,reader)
t6 = get_timestamp(17,1,reader)
t7a = get_timestamp(20,1,reader)
t7b = get_timestamp(21,1,reader)

writeme=csv.writer(open('hw002.csv', 'w'))
writeme.writerow(["ROW", "HW", "STUDENTID", "TIMESTAMP", "SUBMISSION", "SCORE"])
baseid=1040165
i=0
for student in studentset:                      
    newid = baseid+i;

    writeme.writerow([6*i, "5", newid, t1[student], "1", hw1[student]])
    writeme.writerow([6*i+1, "6", newid, t2[student], "1", hw2[student]])
    writeme.writerow([6*i+2, "11", newid, t3[student], "1", hw3[student]])
    writeme.writerow([6*i+3, "13", newid, t4[student], "1", hw4[student]])
    writeme.writerow([6*i+4, "15", newid, t5[student], "1", hw5[student]])
    writeme.writerow([6*i+5, "17", newid, t6[student], "1", hw6[student]])
    i = i+1;


                       
