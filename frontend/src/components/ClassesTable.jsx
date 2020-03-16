import React, {Component} from 'react';
import { Table } from 'reactstrap';

class ClassesTable extends Component {
    state = {  
        tableContent: [
            {id: 1, 
                course: "LASARE2", 
                section:"S17", 
                faculty: "DELA CRUZ, JUAN", 
                day:"MAR 30", 
                time:"08:00AM-5:00PM",
                room: "G310"
            }

        ]
    }

    renderTableData(){
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
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.tableContent[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
    render() { 
        return (  
            <div>
                
            </div>
            // <Table>
            //     <thead>
            //         <tr>
            //         <th>Course</th>
            //         <th>Section</th>
            //         <th>Faculty</th>
            //         <th>Day</th>
            //         <th>Time</th>
            //         <th>Room</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         <tr>
            //         <th scope="row">LASARE1</th>
            //         <td>S17</td>
            //         <td>DELA CRUZ, JUAN</td>
            //         <td>MAR 04</td>
            //         <td>08:00AM-05:00PM</td>
            //         <td>G302</td>
            //         </tr>
            //         <tr>
            //         <th scope="row">IPERSEF</th>
            //         <td>S18</td>
            //         <td>DELA TORRE, MARIA</td>
            //         <td>FEB 15</td>
            //         <td>09:00AM-03:00PM</td>
            //         <td>G305</td>
            //         </tr>
            //     </tbody>
            // </Table>
        );
    }
}
 
export default ClassesTable;