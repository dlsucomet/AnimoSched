import datetime
from z3 import *


def solve():
    z3 = Optimize()
    a = Bool('a')
    b = Bool('b')
    c = Bool('c')
    z3.add_soft(a)
    z3.add_soft(b)
    z3.add_soft(c)
    print(z3.check())
    print(z3.model())



# def start(inputCourses, inputProfs, inputNotSections, inputNotRooms, inputNotBefore, inputNotAfter, inputNotDays, inputCheckFull, num):

#     z3 = Optimize()

#     courses = []
#     courseData = {}
#     courseNames = {}
#     courseDays = {}
#     courseProfs = {}
#     prevCourse = None

#     def filters(z3):
#         return z3

#     def isFull(course):
#         if(inputCheckFull):
#             for c in course:
#                 if(int(c[6]) <= int(c[7])):
#                     return True
#         return False

#     def notTime(time):
#         for t in time:
#             t1 = t[4].split('-')
#             s1 = int(t1[0].strip())
#             e1 = int(t1[1].strip())
#             start1 = datetime.time(int(s1/100),s1%100,0,0)
#             end1 = datetime.time(int(e1/100),e1%100,0,0)
#             start2 = datetime.time(int(inputNotBefore/100),inputNotBefore%100,0,0)
#             end2 = datetime.time(int(inputNotAfter/100),inputNotAfter%100,0,0)
#             if(start1 < start2 or end1 < start2 or start1 > end2 or end1 > end2):
#                 return True
#         return False

#     def notDay(day):
#         if(inputNotDays != ""):
#             days = inputNotDays.split(",")
#             for d in days:
#                 if(day == d):
#                     return True
#         return False

#     def notSection(c):
#         if(inputNotSections != ""):
#             notSections = inputNotSections.split(",")
#             for section in notSections:
#                 for c2 in courseData[c]:
#                     if(section in c2[2]):
#                         return True
#         return False

#     def notRoom(c):
#         if(inputNotRooms != ""):
#             notRooms = inputNotRooms.split(",")
#             for room in notRooms:
#                 for c2 in courseData[c]:
#                     if(room in c2[5]):
#                         return True
#         return False

#     def hasProf(c):
#         profs = inputProfs.split(",")
#         for prof in profs:
#             for c2 in courseData[c]:
#                 for d in c2:
#                     if(prof in d):
#                         return True
#         return False

#     def profExists(course):
#         if(inputProfs != ""):
#             profs = inputProfs.split(",")
#             print(profs)
#             for prof in profs:
#                 for profName in courseProfs:
#                     if(prof in profName):
#                         for c in courseNames[course]:
#                             for c2 in courseData[c]:
#                                 for d in c2:
#                                     if(prof in d):
#                                         return True
#         return False

#     def parseRow(rowData, count):
#         days = list(rowData[3])
#         for day in days:
#             if(not day in courseDays):
#                 courseDays[day] = []
#             if(not rowData[0] in courseDays[day]):
#                 courseDays[day].append(rowData[0])
#         course = rowData[1].strip()
#         if(not course in courseNames):
#             courseNames[course] = []
#         if(not rowData[0] in courseNames[course]):
#             courseNames[course].append(rowData[0])
#         if(not rowData[0] in courseData):
#             courseData[rowData[0]] = []
#         courseData[rowData[0]].append(rowData)
#         return count

#     def compareTimes(course1,course2):
#         for c1 in course1:
#             for c2 in course2:
#                 t1 = c1[4].split('-')
#                 t2 = c2[4].split('-')
#                 s1 = int(t1[0].strip())
#                 e1 = int(t1[1].strip())
#                 s2 = int(t2[0].strip())
#                 e2 = int(t2[1].strip())
#                 start1 = datetime.time(int(s1/100),s1%100,0,0)
#                 end1 = datetime.time(int(e1/100),e1%100,0,0)
#                 start2 = datetime.time(int(s2/100),s2%100,0,0)
#                 end2 = datetime.time(int(e2/100),e2%100,0,0)
#                 if(start1 >= start2 and start1 <= end2):
#                     if(end1 >= start2 and end1 <= end2):
#                         return True
#         return False

#     inputCourses = inputCourses.split(",")
#     for course in inputCourses:
#         course = course.strip()
#         courses.append(course)

#     if(len(courses) > 0):
#         count = 0
#         for course in courses:
#             URL = "http://enroll.dlsu.edu.ph/dlsu/view_actual_count"
#             PARAMS = {'p_course_code':course}
#             print("Retrieving data for "+course+"...")
            
#             try:
#                 r = requests.post(url = URL, params = PARAMS)
#             except:
#                 return "Error encountered. Try again."

#             if(r.status_code == 200):
#                 parsed = BeautifulSoup(r.text, "html5lib").center
#                 rows = parsed.find_all("tr")
#                 for row in rows[1:]:
#                     rowData = row.get_text().strip().split("\n")
#                     if(len(rowData) == 1):
#                         prof = rowData[0].strip()
#                         for c in courseData[prevCourse[0]]:
#                             if(not prof in c):
#                                 c.append(prof)
#                         if(not prof in courseProfs):
#                             courseProfs[prof] = []
#                         if(not prevCourse[0] in courseProfs[prof]):
#                             courseProfs[prof].append(prevCourse[0])
#                     elif(len(rowData) == 3):
#                         newRowData = []
#                         for l in prevCourse:
#                             newRowData.append(l)
#                         newRowData[3] = rowData[0]
#                         newRowData[4] = rowData[1]
#                         newRowData[5] = rowData[2]
#                         count = parseRow(newRowData, count)
#                     elif(len(rowData) == 8):
#                         count = parseRow(rowData, count)
#                         prevCourse = rowData
#             else:
#                 print("Server unavailable.")
#                 break

#         # for c in courseData:
#         #     print(courseData[c])
#         # print(courseProfs)
#         # print(courseNames)
#         # print(courseDays)
#         print("Parsing data...")

#         for course in courseNames:
#             courseList = []
#             notCourseList = []
#             if(profExists(course)):
#                 for c in courseNames[course]:
#                     if(hasProf(c) and not notSection(c) and not notRoom(c)):
#                         courseList.append(Bool(c))
#                     else:
#                         notCourseList.append(Bool(c))
#             else:
#                 for c in courseNames[course]:
#                     if(not notSection(c) and not notRoom(c)):
#                         courseList.append(Bool(c))
#                     else:
#                         notCourseList.append(Bool(c))
#             z3.add_soft(Or(tuple(courseList)),1)
#             for c in notCourseList:
#                 z3.add(Not(Bool(str(c))))
#             for c in courseList:
#                 if(isFull(courseData[str(c)])):
#                     z3.add(Not(Bool(str(c))))
#                 else:
#                     otherCourseList = []
#                     for c2 in courseList:
#                         if(str(c) != str(c2)):
#                             otherCourseList.append(Not(Bool(str(c2))))
#                     z3.add(Implies(Bool(str(c)),And(tuple(otherCourseList))))

#         for day in courseDays:
#             if(notDay(day)):
#                 for c in courseDays[day]:
#                     z3.add(Not(Bool(c)))
#             else:
#                 for c in courseDays[day]:
#                     if(notTime(courseData[c])):
#                         z3.add(Not(Bool(c)))
#                     else:
#                         for c2 in courseDays[day]:
#                             if(c != c2):
#                                 if(compareTimes(courseData[c],courseData[c2])):
#                                     # if(not str(0-idMapping[c])+' '+str(0-idMapping[c2])+' 0\n' in dimacs):
#                                     z3.add(Or(Not(Bool(c)), Not(Bool(c2))))
        
#         z3 = filters(z3)

#         print(z3)
#         print("Calculating schedules...")

#         schedules = ""
#         preSolver = str(z3)
#         count = 0
#         while(str(z3.check()) == "sat" and count < num):
#             print()
#             courseList = []
#             for c in z3.model():
#                 if(is_true(z3.model()[c])):
#                     print(courseData[str(c)][0])
#                     schedules += str(courseData[str(c)][0])+"<br>"
#                     courseList.append(Not(Bool(str(c))))
#             schedules += "<br>"
#             print(courseList)
#             z3.add(Or(tuple(courseList)))
#             print()
#             # print(z3)
#             print(z3.check())
#             count += 1
#         schedules += "<br><br>Z3 Solver:<br>"
#         schedules += preSolver
#         print(z3)
        
#         print(count-1,"schedules found.")
#         print(num)

#         return schedules

#     else:
#         print("Nothing found.")