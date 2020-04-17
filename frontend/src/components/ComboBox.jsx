import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'underscore';
import axios from 'axios'

class ComboBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            college: '',
            programList: [],
            degrees: [],
            courseList: [],
            value: this.props.value,
            loading: false
        }
        this.handleSearchInputThrottled = _.debounce(this.handleSearchInput, 500)

    }

    componentWillReceiveProps(props){
        this.setState({
            value: props.value,
        });
        this.changeProgramList(props);
    }

    changeProgramList(props) {

        var updatedProgramList = [];
        
        if(props.degrees != undefined){
            props.degrees.map(degree => {
                if(String(props.college) == String(degree.college)){
                    const program = {'id':degree.id, 'name':degree.degree_name};
                    updatedProgramList = updatedProgramList.concat(program);
                }
            })
        }

        this.state.programList = updatedProgramList;

    }

    handleSearchInput = (e, val) =>{
      if(val.trim() != ''){
        this.setState({loading: true, courseList: []}, () => {
          axios.get('https://archerone-backend.herokuapp.com/api/searchcourse/'+val+'/')
          .then(res => {
            res.data.map(course => {
                var courses = this.state.courseList;
                courses.push({'id':course.id, 'course_code':course.course_code})
                this.setState({courseList: courses})
            })
            this.setState({loading: false})
          })
        })
      }else{
        this.setState({courseList: []})
      }
    }

    render (){
   
        if(this.props.page == "register"){
            return (
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.programList}
                  getOptionLabel={option => option.name}
                  style={{ width: 500 }}
                  renderInput={params => <TextField {...params} label="Degree Program" variant="outlined" />}
                  value={this.state.value}
                  inputValue={this.state.value}
                  searchText={this.state.value}
                  onChange={this.props.onChange}
                />
            );
        } else if(this.props.page == "search"){
            return (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={this.state.courseList}
                  getOptionLabel={option => option.course_code}
                //   style={{ width: 500 }}
                  filterSelectedOptions
                  loading={this.state.loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Course"
                        variant="outlined"
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                            {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                        }}
                    />
                )}
                //   renderInput={params => <TextField {...params} label="Search Courses" variant="outlined" />}
                  onChange={this.props.onChange}
                  onInputChange={this.handleSearchInputThrottled}
                />
            );
        } else if(this.props.page == "add"){
            return(
            <Autocomplete
            multiple
            options={this.state.courseList}
            getOptionLabel={option => option.course_code}
            filterSelectedOptions
            style={{ width: 500 }}
            loading={this.state.loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Course"
                    variant="outlined"
                    InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                        {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                    }}
                />
            )}
            onChange={this.props.onChange}
            onKeyPress={this.props.onKeyPress}
            onInputChange={this.handleSearchInputThrottled}
            value={this.props.value}
            />
            )
        }
    }
}

export default ComboBox;