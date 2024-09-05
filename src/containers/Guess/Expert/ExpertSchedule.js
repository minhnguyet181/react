import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getinfoExpert } from '../../../services/userService';
import './ExpertSchedule.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import localization from 'moment/locale/vi';
import { getScheduleExpert } from '../../../services/userService';
class ExpertSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime:[]
        }
    }
  async  componentDidMount() {
       let {language} = this.props;
       this.setArrDays(language);

    }
    setArrDays =(language) =>{
        let allDays =[];
        for(let i=0;i<7;i++) {
            let obj ={};
            if(language === LANGUAGES.VI) {
                let labelVi = moment (new Date ()).add(i, 'days').format('dddd - DD/MM');
                obj.label = this.capitalizeFirstLetter(labelVi)
            }  else {
                obj.label = moment(new Date ()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            obj.value = moment (new Date ()).add(i, 'days').startOf('day').valueOf();
        }
        this.setState({
            allDays:allDays,
        })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }
     handleOnChangeSelect = async(event) =>{
        if(this.props.expertId && this.props.expertId !== -1) {
            let expertId = this.props.expertId;
            let date = event.target.value
            let res = await getScheduleExpert(expertId,date);
            if(res && res.errCode === 0) {
                this.setState({
                    availableTime:res.data ? res.data:[]
                })
            }
        }
     }
    render() {
     let {allDays,availableTime} = this.state;
     let{language} = this.props;
        return (
        <div className='expert-schedule-container'>
        <div className='all-schedule'>
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
               {allDays && allDays.length>0 && allDays.map((item,index) =>{
                return( 
                    <option value={item.value} key={index}>
                            {item.label}
                    </option>
                )
               } )}
            </select>
        </div>
        <div className='available-time'>
        <div className='text-calendar'>
                 <i className='fas fa-calender-alt'> <span>Lich kham</span></i>

        </div>
        <div className='time-content'>
          {availableTime && availableTime.length >0 ? 
          availableTime.map((item,index) =>{
            let timeDisplay =language === LANGUAGES.VI ? 
            item.timeTypeData.valueVi :  item.timeTypeData.valueEn;
            return(
                <button key={index} > {timeDisplay} </button>
            )
          })
        :  <div> Thoi gian khong phu hop  </div>
        }
        </div>
        </div>
        </div>            

        );
    }

}
const mapStateToProps = state => {
    return {
        language:state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
  

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpertSchedule);
