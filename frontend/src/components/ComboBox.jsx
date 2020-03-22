import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ComboBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            programList: []
        }
    }

    changeProgramList(college) {

        var updatedProgramList = [];
        
        if(college == "BAGCED"){
            return updatedProgramList = [
                'Bachelor of Elementary Education, Major in Early Childhood Education',
                'Bachelor of Secondary Education, Major in English',
                'Bachelor of Secondary Education, Major in Biology',
                'Bachelor of Secondary Education, Major in Chemistry',
                'Bachelor of Secondary Education, Major in Mathematics',
                'Bachelor of Secondary Education, Major in Mathematics with specialization in Computer Applications',
                'Bachelor of Secondary Education, Major in Physics',
                'Bachelor of Secondary Education, Major in Physical Sciences'
            ];
        }
        else if(college == "RVRCOB"){
            return updatedProgramList = [
                'Bachelor of Science in Accountancy',
                'Bachelor of Science in Advertising Management',
                'Bachelor of Science in Applied Corporate Management',
                'Bachelor of Science in Business Management',
                'Bachelor of Science in Entrepreneurship',
                'Bachelor of Science in Interdisciplinary Business Studies',
                'Bachelor of Science in Legal Management',
                'Bachelor of Science in Management of Financial Institutions',
                'Bachelor of Science in Marketing Management'
            ];
        }
        else if(college == "CCS"){
            return updatedProgramList = [
                'Bachelor of Science in Computer Science',
                'Bachelor of Science in Computer Science, Major in Software Technology',
                'Bachelor of Science in Computer Science, Major in Network and Information Security',
                'Bachelor of Science in Computer Science, Major in Computer Systems Engineering',
                'Bachelor of Science in Information Systems',
                'Bachelor of Science in Information Technology',
                'Bachelor of Science in Interactive Entertainment, Major in Game Art and Design',
                'Bachelor of Science in Interactive Entertainment, Major in Game Development',
                'Bachelor of Science (Honors) in Computer Science and Master of Science in Computer Science'
            ];
        }
        else if(college == "CLA"){
            return updatedProgramList = [
                'WAIT LANG ANG DAMI EH HAHAHA'
            ];
        }
        else if(college == "COS"){
            return updatedProgramList = [
                'Bachelor of Science in Biochemistry',
                'Bachelor of Science in Biology, Major in Medical Biology',
                'Bachelor of Science in Biology, Major in Molecular Biology and Biotechnology',
                'Bachelor of Science in Biology, Major in Systematics and Ecology',
                'Bachelor of Science in Chemistry',
                'Bachelor of Science in Chemistry, Major in Food Science',
                'Bachelor of Science in Chemistry, Minor in Business Studies',
                'Bachelor of Science in Human Biology',
                'Bachelor of Science in Mathematics with specialization in Business Applications',
                'Bachelor of Science in Mathematics with specialization in Computer Applications',
                'Bachelor of Science in Statistics, Major in Actuarial Science',
                'Bachelor of Science in Physics, Minor in Economics',
                'Bachelor of Science in Physics, Minor in Finance',
                'Bachelor of Science in Physics with specialization in Materials Science',
                'Bachelor of Science in Physics with specialization in Medical Instrumentation',
                'Bachelor of Science in Premed Physics'
            ];
        }
        else if(college == "GCOE"){
            return updatedProgramList = [
                'Bachelor of Science in Chemical Engineering',
                'Bachelor of Science in Civil Engineering with specialization in Structural Engineering',
                'Bachelor of Science in Civil Engineering with specialization in Construction Technology and Management',
                'Bachelor of Science in Civil Engineering with specialization in Hydraulics and Water Resources Engineering',
                'Bachelor of Science in Civil Engineering with specialization in in Transportation Engineering',
                'Bachelor of Science in Computer Engineering',
                'Bachelor of Science in Electronics Engineering',
                'Bachelor of Science in Industrial Engineering',
                'Bachelor of Science in Industrial Management Engineering, Minor in Information Tehcnology',
                'Bachelor of Science in Industrial Management Engineering, Minor in Service Management',
                'Bachelor of Science (Honors) and Masters of Science in Industrial Engineering',
                'Bachelor of Science (Honors) and Masters of Science in  Industrial Management Engineering minor in Information Technology',
                'Bachelor of Science in Manufacturing Engineering and Management with specialization in Mechatronics and Robotics Engineering',
                'Bachelor of Science in Manufacturing Engineering and Management with specialization in Biomedical Engineering',
                'Bachelor of Science in Mechanical Engineering with specialization in Mechatronics Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Mechanical Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Chemical Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Civil Engineering with specialization in Structural Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Civil Engineering with specialization in Construction Technology and Management',
                'Bachelor of Science (Honors) and Masters of Science in Civil Engineering with specialization in Hydraulics and Water Resources Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Civil Engineering with specialization in Transportation Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Computer Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Electronics Engineering',
                'Bachelor of Science (Honors) and Masters of Science in Manufacturing Engineering and Management'
            ];
        }
        else if(college == "SOE"){ // CHANGE TO SOMETHING LIKE WHAT YOU DID IN CLA FOR LIA-COM
            return updatedProgramList = [
                'Bachelor of Science in Applied Economics (Honors) and Master of Science in Economics',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Accountancy',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Advertising Management',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Applied Corporate Management',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Business Management',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Legal Management',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Management of Financial Institutions',
                'Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Marketing Management',
                'Bachelor of Science in Applied Economics, Major in Financial Economics',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Accountancy',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Advertising Management',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Applied Corporate Management',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Business Management',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Legal Management',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Management of Financial Institutions',
                'Bachelor of Science in Applied Economics, Major in Financial Economics and Bachelor of Science in Marketing Management',
                'Bachelor of Arts in Economics',
                'Bachelor of Arts in Economics and Bachelor of Science in Accountancy',
                'Bachelor of Arts in Economics and Bachelor of Science in Advertising Management',
                'Bachelor of Arts in Economics and Bachelor of Science in Applied Corporate Management',
                'Bachelor of Arts in Economics and Bachelor of Science in Business Management',
                'Bachelor of Arts in Economics and Bachelor of Science in Legal Management',
                'Bachelor of Arts in Economics and Bachelor of Science in Management of Financial Institutions',
                'Bachelor of Arts in Economics and Bachelor of Science in Marketing Management'
            ];
        }
    }

    render (){
        
        this.state.programList = this.changeProgramList(this.props.college);

        return (
            <Autocomplete
              id="combo-box-demo"
              options={this.state.programList}
              style={{ width: 500 }}
              renderInput={params => <TextField {...params} label="Degree Program" variant="outlined" />}
            />
        );
    }
}

export default ComboBox;