from django.apps import AppConfig

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
        # Courses
        ccprog1 = Course(course_code='CCPROG1', course_name='', course_desc='', college=ccs, units=3)
        ccprog2 = Course(course_code='CCPROG2', course_name='', course_desc='', college=ccs, units=3)
        humaart = Course(course_code='HUMAART', course_name='', course_desc='', college=ccs, units=3)
        greatwk = Course(course_code='GREATWK', course_name='', course_desc='', college=ccs, units=3)
        scimatp = Course(course_code='SCIMATP', course_name='', course_desc='', college=ccs, units=3)
        scimatc = Course(course_code='SCIMATC', course_name='', course_desc='', college=ccs, units=3)
        ccprog1.save()
        ccprog2.save()
        humaart.save()
        greatwk.save()
        scimatp.save()
        scimatc.save()
        # Faculty
        fritz = Faculty(first_name='Fritz', last_name='Flowers')
        bob = Faculty(first_name='Bob', last_name='Uy')
        fritz.save()
        bob.save()
        # Sections
        s15 = Section(section_code='S15')
        s16 = Section(section_code='S16')
        s15.save()
        s16.save()
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
        # Buildings
        lasalle = Building(bldg_code='LS',bldg_name='St. La Salle Hall')
        yuch = Building(bldg_code='Y',bldg_name='Enrique Yuchengco Hall')
        joseph = Building(bldg_code='J',bldg_name='St. Joseph Hall')
        velasco = Building(bldg_code='V',bldg_name='Velasco Hall')
        miguel = Building(bldg_code='M',bldg_name='St. Miguel Hall')
        mutien = Building(bldg_code='MU',bldg_name='St. Mutien Marie Hall')
        goks = Building(bldg_code='GK',bldg_name='Gokongwei Hall')
        andrew = Building(bldg_code='A',bldg_name='Br. Andrew Gonzales Hall')
        lasalle.save()
        yuch.save()
        joseph.save()
        velasco.save()
        miguel.save()
        mutien.save()
        goks.save()
        andrew.save()
        # Timeslot
        time915 = Timeslot(begin_time='09:15', end_time='10:45')
        time1100= Timeslot(begin_time='11:00', end_time='12:30')
        time915.save()
        time1100.save()
        # Rooms
        goks201 = Room(building=goks, room_type='Lecture', room_capacity=40)
        goks202 = Room(building=goks, room_type='Lecture', room_capacity=40)
        miguel301 = Room(building=miguel, room_type='Lecture', room_capacity=40)
        miguel302 = Room(building=miguel, room_type='Lecture', room_capacity=40)
        goks201.save()
        goks202.save()
        miguel301.save()
        miguel302.save()
        # Course Offerings
        ccprog1s15 = CourseOffering(faculty=fritz, course=ccprog1, section=s15, day=monday, timeslot=time915, room=goks201, term=2, start_AY=19, end_AY=20, current_enrolled=0, max_enrolled=40, status=True)
        ccprog1s16 = CourseOffering(faculty=bob, course=ccprog1, section=s16, day=monday, timeslot=time915, room=goks201, term=2, start_AY=19, end_AY=20, current_enrolled=0, max_enrolled=40, status=True)
        ccprog1s15.save()
        ccprog1s16.save()
    except Exception as e:
        pass
        
class ApiConfig(AppConfig):
    name = 'api'
    verbose_name = 'api'
    def ready(self):
        import os
        if os.environ.get('RUN_MAIN'):
            startup()
