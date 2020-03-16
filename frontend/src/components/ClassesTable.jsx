import React, {Component} from 'react';
import { Table } from 'reactstrap';


class ClassesTable extends Component {
    state = {  
        tableContent: [
            {
                id: 1, 
                course: "LASARE2", 
                section:"S17", 
                faculty: "DELA CRUZ, JUAN", 
                day:"MAR 30", 
                time:"08:00AM-5:00PM",
                room: "G310"
            },
            {
                id: 2, 
                course: "IPERSEF", 
                section:"S15", 
                faculty: "DEL TORRE, MARIA", 
                day:"APR 05", 
                time:"08:00AM-5:00PM",
                room: "G304"
            }

        ]
    }

    dummyData = [
        {
            id: 3, 
            course: "DUMMY1", 
            section:"S17", 
            faculty: "DELA CRUZ, JUAN", 
            day:"MAR 30", 
            time:"08:00AM-5:00PM",
            room: "G310"
        },
        {
            id: 4, 
            course: "DUMMY2", 
            section:"S15", 
            faculty: "DEL TORRE, MARIA", 
            day:"APR 05", 
            time:"08:00AM-5:00PM",
            room: "G304"
        }
    ];
    renderTableData(){
        if(this.state.tableContent != null){
            return this.state.tableContent.map((data, index)=>{
                const {id, course, section, faculty, day, time, room} = data
                return(
                    <tr key={id}>
                        <td>{course}</td>
                        <td>{section}</td>
                        <td>{faculty}</td>
                        <td>{day}</td>
                        <td>{time}</td>
                        <td>{room}</td>
                    </tr>
                )
            });
        }
        
    }


     createTable = (tableArray) =>{        
        this.setState(
            {tableContent: tableArray}
        );
    }

    render() { 
        
        return (  
            <div>
               <h3 id="title">Non-Credit Courses</h3>
               <Table id = "classes">
                    <thead>
                        <tr>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Faculty</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}

                    </tbody>
                </Table> 
                {/* <button onClick={() => this.createTable(this.dummyData)}>Add table</button> */}
            </div>

        );
    }
}
 
export default ClassesTable;