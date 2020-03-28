from django.apps import AppConfig

def startup():
    print("Hello world!")
    from .models import College, Degree, Course
    try:
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
        Degree(degree_code='BS CS', degree_name='Bachelor of Science in Computer Science', college=ccs).save()
        Degree(degree_code='BS IT', degree_name='Bachelor of Science in Information Technology', college=ccs).save()
        Degree(degree_code='BS-PSY', degree_name='Bachelor of Science in Psychology', college=cla).save()
        Degree(degree_code='AB-SOC', degree_name='Bachelor of Arts in Sociology', college=cla).save()
        Degree(degree_code='AEI-BSA', degree_name='Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Accountancy', college=soe).save()
        Degree(degree_code='AEI-ADV', degree_name='Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Advertising Management', college=soe).save()
    except Exception as e:
        pass
    try:
        Course(course_code='CCPROG1', course_name='', course_desc='', college=ccs, units=3).save()
        Course(course_code='CCPROG2', course_name='', course_desc='', college=ccs, units=3).save()
        Course(course_code='HUMAART', course_name='', course_desc='', college=ccs, units=3).save()
        Course(course_code='GREATWK', course_name='', course_desc='', college=ccs, units=3).save()
        Course(course_code='SCIMATP', course_name='', course_desc='', college=ccs, units=3).save()
        Course(course_code='SCIMATC', course_name='', course_desc='', college=ccs, units=3).save()
    except Exception as e:
        pass
        
class ApiConfig(AppConfig):
    name = 'api'
    verbose_name = 'api'
    def ready(self):
        import os
        if os.environ.get('RUN_MAIN'):
            startup()
