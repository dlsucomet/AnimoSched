from django.apps import AppConfig
# import requests
# import html5lib
# from bs4 import BeautifulSoup

def startup():
    print("Hello world!")

    from .models import Timeslot, Room, College, Degree, Course, Faculty, CourseOffering, Section, Day, Building
    try:
        # Colleges
        ccs = College(college_code='CCS', college_name='College of Computer Studies')
        cla = College(college_code='CLA', college_name='College of Liberal Arts')
        cos = College(college_code='COS', college_name='College of Science')
        gcoe = College(college_code='GCOE', college_name='Gokongwei College of Engineering')
        soe = College(college_code='SOE', college_name='School of Economics')
        bagced = College(college_code='BAGCED', college_name='Br. Andrew Gonzalez College of Education')
        rvrcob = College(college_code='RVRCOB', college_name='Ramon V. Del Rosario College of Business')
        ccs.save()
        cla.save()
        cos.save()
        gcoe.save()
        soe.save()
        bagced.save()
        rvrcob.save()
        # Degrees
        Degree(degree_code='BS CS', degree_name='Bachelor of Science in Computer Science', college=ccs).save()
        Degree(degree_code='BS IT', degree_name='Bachelor of Science in Information Technology', college=ccs).save()
        Degree(degree_code='BS-PSY', degree_name='Bachelor of Science in Psychology', college=cla).save()
        Degree(degree_code='AB-SOC', degree_name='Bachelor of Arts in Sociology', college=cla).save()
        Degree(degree_code='AEI-BSA', degree_name='Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Accountancy', college=soe).save()
        Degree(degree_code='AEI-ADV', degree_name='Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Advertising Management', college=soe).save()
        # Buildings
        goks = Building(bldg_code='GK',bldg_name='Gokongwei Hall')
        lasalle = Building(bldg_code='LS',bldg_name='St. La Salle Hall')
        yuch = Building(bldg_code='Y',bldg_name='Enrique Yuchengco Hall')
        joseph = Building(bldg_code='J',bldg_name='St. Joseph Hall')
        velasco = Building(bldg_code='V',bldg_name='Velasco Hall')
        miguel = Building(bldg_code='M',bldg_name='St. Miguel Hall')
        mutien = Building(bldg_code='MU',bldg_name='St. Mutien Marie Hall')
        andrew = Building(bldg_code='A',bldg_name='Br. Andrew Gonzales Hall')
        goks.save()
        lasalle.save()
        yuch.save()
        joseph.save()
        velasco.save()
        miguel.save()
        mutien.save()
        andrew.save()
        # Days
        monday = Day(day_code='M', day_name='Monday')
        tuesday = Day(day_code='T', day_name='Tuesday')
        wednesday = Day(day_code='W', day_name='Wednesday')
        thursday = Day(day_code='H', day_name='Thursday')
        friday = Day(day_code='F', day_name='Friday')
        saturday = Day(day_code='S', day_name='Saturday')
        monday.save()
        tuesday.save()
        wednesday.save()
        thursday.save()
        friday.save()
        saturday.save()

    except Exception as e:
        print(e)

    def addCourseOffering(course):
        URL = "http://enroll.dlsu.edu.ph/dlsu/view_actual_count"
        PARAMS = {'p_course_code':course}
        
        try:
            r = requests.post(url = URL, params = PARAMS)
        except Exception as e:
            print(e)

        if(r.status_code == 200):
            parsed = BeautifulSoup(r.text, "html5lib").center
            rows = parsed.find_all("tr")
            for row in rows[1:]:
                rowData = row.get_text().strip().split("\n")
                if(len(rowData) == 1):
                    prof = rowData[0].strip()
                    Faculty(full_name=prof).save()
                    # for c in courseData[prevCourse[0]]:
                    #     if(not prof in c):
                    #         c.append(prof)
                    # if(not prof in courseProfs):
                    #     courseProfs[prof] = []
                    # if(not prevCourse[0] in courseProfs[prof]):
                    #     courseProfs[prof].append(prevCourse[0])
                elif(len(rowData) == 3):
                    print(rowData)
                    # newRowData = []
                    # for l in prevCourse:
                    #     newRowData.append(l)
                    # newRowData[3] = rowData[0]
                    # newRowData[4] = rowData[1]
                    # newRowData[5] = rowData[2]
                    # count = parseRow(newRowData, count)
                # elif(len(rowData) == 8):
                    # classnumber = rowData[0]
                    # course_code = rowData[1]
                    # section_code = rowData[2]
                    # days = rowData[3]
                    # timeslot = rowData[4]
                    # room = rowData[5]
                    # if(days.strip() != '' and timeslot.strip() != ''):
                    #     course = Course.objects.get(course_code=course_code)
                    #     section = Section.objects.get_or_create(section_code=section_code)
                    #     day1 = Day.objects.get(days.strip()[0])
                    #     day2 = Day.objects.get(days.strip()[1])

                    # count = parseRow(rowData, count)
                    # prevCourse = rowData
    # try:
    #     with open('course_codes.csv', 'r') as course_codes:
    #         for c in course_codes:
    #             Course(college=ccs, course_code=c.strip(), course_name='', course_desc='', units=3).save()
                # addCourseOffering(c.strip())
    
    # except Exception as e:
    #     print(e)

    try:
        with open('ccs_details.csv','r') as ccs_details:
            for l in ccs_details:
                details = l.split(',')
                print(details)
                if(details[0].strip() != ''):
                    Course(college=ccs, course_code=details[0].strip(), course_name='', course_desc='', units=3).save()
                if(details[1].strip() != ''):
                    Section(section_code='S'+details[1].strip()).save()
                if(details[2].strip() != ''):
                    Room(building=goks, room_name=details[2].strip(), room_type='Lecture', room_capacity=40).save()
        with open('ccs_faculty.csv','r') as ccs_faculty:
            for l in ccs_faculty:
                details = l.split('-')
                faculty = details[0].replace('\"','').strip()
                if(faculty != ''):
                    print(faculty)
                    Faculty(full_name=faculty).save()
        with open('ccs_timeslots.csv','r') as ccs_timeslots:
            for l in ccs_timeslots:
                details = l.split(',') 
                time_begin = ''
                time_end = ''
                if(len(details[0].strip()) == 3):
                    time_begin = '0'+details[0][0]+':'+details[0][1]+details[0][2] 
                elif(len(details[0].strip()) == 4):
                    time_begin = details[0][0]+details[0][1]+':'+details[0][2]+details[0][3] 
                if(len(details[1].strip()) == 3):
                    time_end = '0'+details[1][0]+':'+details[1][1]+details[1][2] 
                elif(len(details[1].strip()) == 4):
                    time_end = details[1][0]+details[1][1]+':'+details[1][2]+details[1][3] 
                print(time_begin, time_end)
                Timeslot.objects.get_or_create(begin_time=time_begin, end_time=time_end)
    except Exception as e:
        print(e)
        


class ApiConfig(AppConfig):
    name = 'api'
    verbose_name = 'api'
    def ready(self):
        import os
        if os.environ.get('RUN_MAIN'):
            startup()
