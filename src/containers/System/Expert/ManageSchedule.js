import React,{Component} from "react";
import { connect } from "react-redux";
import { dispatch } from "../../../redux";
import './ManageSchedule.scss';
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import DatePicker from "react-flatpickr";
import moment from "moment";
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state ={
            listExp : [],
            selectedExp:{},
            currentDate:'',
            rangeTime:[]
        }
    }
    componentDidMount () {
        this.props.fetchAllExpert();
        this.props.fetchAllSchedule();
    }
    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.allExp !== this.props.allExp) {
            let dataSl = this.dataSelected(this.props.allExp)
            this.setState({
                listExp:dataSl
            })
        }
        if(prevProps.allSchedule !== this.props.allSchedule) {
            this.setState({
                rangeTime:this.props.allSchedule
            })
        }
    }
    dataSelected = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj)
            })
        }
        return result;
    }
    handleChangeSelect =async(selectedOption) =>{
        this.setState({selectedOption:selectedOption});
    }
    handleOnChangeDatePicker = (date) =>{
        this.setState({
            currentDate:date[0]
        })
    }
    render() {
        let {rangeTime} =this.state;
        let {language} = this.props;
        return (
            <div className="manage-schedule-container">

                     <div className="m-s-title">
            
            <FormattedMessage id="manage-schedule.title" />
            
                          </div>
            
                      <div className="container">
            
                            <div className="row">
            
                                   <div className="col-6 form-group">
            
                                          <label> <FormattedMessage id="manage-schedule.choose-expert " /> </label>
            
                                  <Select
            
            value={this.state.selectedExp}
            
            onchange={this.handleChangeSelect}
            
            options={this.state.listExp}   />
            </div>
            
                          <div className="col-6 form-group" />
            
                                 <label> <FormattedMessage id="manage-schedule.choose-date" /> </label>
                                 <DatePicker onChange={this.handleOnChangeDatePicker} className="form-control"
                                 value={this.state.currentDate} minDate={new Date()} >

                                 </DatePicker>
                                  </div>
                                  <div className="col-12 pick-hour-container">
                                    {rangeTime && rangeTime.length >0 && rangeTime.map((item,index) =>{
                                        return(
                                            <button className="btn btn-schedule" key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                                        )
                                    })} 

                                  </div>
                                  <div className="col-12">
                                    <button className=" btn btn-primary btn-save-schedules">
                                        <FormattedMessage id="manage-schedule.save" />

                                    </button>
                                     </div>
            </div>
  </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allExp:state.admin.allExp,
        allSchedule:state.admin.allSchedule
    };
}
const mapDispatchToProps = dispatch =>{
    return{
        fetchAllExpert:() => dispatch(actions.fetchAllExpert()),
        fetchAllSchedule:() => dispatch(actions.fetchAllSchedule())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ManageSchedule);