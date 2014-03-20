import random

print ('studentid' + ',' +
       'gender' + ',' +
       'agegroup' + ',' +
       'continent' + ',' +
       'background')



ids = range(1030165, 1034165)
for i in ids:
    random.seed()
    # Gender
    r = random.random()
    gender = 'M'
    if r >=.81:
        gender = 'F'

    # Age Group
    r = random.random()
    agegroup = '0'
    if r >= .03:
        agegroup = '18'
    if r >= .36:
        agegroup = '25'
    if r >= .75:
        agegroup = '35'
    if r >= .90:
        agegroup = '45'
    if r >= .96:
        agegroup = '55'
    if r >= .99:
        agegroup = '65'

    # Continent
    r = random.random()
    continent = 'North America'
    if r >= .35:
        continent = 'South America'
    if r >= .40:
        continent = 'Asia'
    if r >= .54:
        continent = 'Africa'
    if r >= .62:
        continent = 'Europe'
    if r >= .84:
        continent = 'Australia'
    if r >= .85:
        continent = 'Unknown'

    # Background in Recursion
    r = random.random()
    background = 'A'
    if r >= .21:
        background = 'B'
    if r >= .40:
        background = 'C'
    if r >= .75:
        background = 'D'


    
    print (str(i) + ',' +
           str(gender) + ',' +
           str(agegroup) + ',' +
           str(continent) + ',' +
           str(background))

