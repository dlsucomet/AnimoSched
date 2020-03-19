import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import '../css/SearchCourses.css';

class SearchCourses extends Component {
    constructor(props){
      super(props);
    }
    render() {
      return (
          <div>
            {this.props.menu()}

            Hello!
        </div>        
      );
    }
  }
  export default SearchCourses;