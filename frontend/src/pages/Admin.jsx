import React, { Component } from "react";
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            rows: [],
            dataReceived: false
        }
    }

    createData(course, classnumber, idnum, enrolled, capacity) {
        return { course, classnumber, idnum, enrolled, capacity};
    }

    componentDidMount(){
        this.setState({dataReceived: false})
        const rows = []
        axios.get('https://archerone-backend.herokuapp.com/api/carts/').then(res => {
            res.data.map(cart => {
                axios.get('https://archerone-backend.herokuapp.com/api/getclass/'+cart.classnumber).then(res => {
                    var data = res.data[0]
                    rows.push(data.course, data.classnumber, cart.idnum, data.current_enrolled, data.max_enrolled)
                    // this.setState({rows, dataReceived: true})
                })
            })
            console.log(rows)
        })
    }

    render() {
      return (
        <div>
            {this.state.dataReceived ?
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell align="right">Classnumber</TableCell>
                    <TableCell align="right">ID Number</TableCell>
                    <TableCell align="right">Enrolled</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.rows.map((row) => (
                    <TableRow key={row.course}>
                    <TableCell component="th" scope="row">
                        {row.course}
                    </TableCell>
                    <TableCell align="right">{row.classnumber}</TableCell>
                    <TableCell align="right">{row.idnum}</TableCell>
                    <TableCell align="right">{row.enrolled}</TableCell>
                    <TableCell align="right">{row.capacity}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            :
            null}

        </div>        
      );
    }
  }

  Admin.propTypes={
    classes: PropTypes.object.isRequired,
  };
export default (Admin);