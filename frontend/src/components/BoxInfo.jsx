import React, {Component} from 'react';
import '../css/BoxInfo.css';

class BoxInfo extends Component {
    constructor(props){
        super();
    }
    state = {  
        boxType: 'preferences',
        matchedPrefs: ['> Earliest Start Time: 9:15 AM', '> earliest End Time: 2:15 PM', '> Break Preferences: 15 minutes'],
        umatchedPrefs: ['> Professor Bob Uy not included'],
        courseConflicts: ['> HUMALIT conflicts with with ClassB2', '> KASPIL conflicts with with ClassC3']
    }

    checkType(){
        if(this.state.boxType === 'preferences'){
            this.renderPrefInfo(this.state.matchedPrefs);
            this.renderPrefInfo(this.state.unmatchedPrefs);
        }else if(this.state.boxType === 'course conflicts'){
            //this.renderConflictInfo(this.state.courseConflicts);
        }
    }

    renderPrefInfo(matchedArray){
        return matchedArray.map((pref)=>{
            return(
            <p>{pref}</p>
            )
        });
    }
    render() { 
        
        return ( 
            <div className="boxinfoContainer" >
                {/* {this.checkType}
                {()=>this.renderPrefInfo(this.state.matchedPrefs)} */}
                <div className='prefContainer'>
                    <p>Matched Preferences</p>
                    {this.state.matchedPrefs.map((pref)=>(<p>{pref}</p>))}
                    <p> </p>
                    <p>Unmatched Preferences</p>
                    {this.state.matchedPrefs.map((pref)=>(<p>{pref}</p>))}
                </div>
                <div className='conflictContainer'>
                    {this.state.courseConflicts.map((conflict)=>(<p>{conflict}</p>))}

                </div>
                
            </div>
         );
    }
}
 
export default BoxInfo;