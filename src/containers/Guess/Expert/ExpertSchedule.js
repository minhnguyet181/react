import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getinfoExpert } from '../../../services/userService';
import './ExpertSchedule.scss'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import localization from 'moment/loacle/vi';
import { getScheduleExpert } from '../../../services/userService';
class ExpertSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: []
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
                obj.label = moment (new Date ()).add(i, 'days').format('dddd - DD/MM');
            }  else {
                obj.label = moment(new Date ()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            obj.value = moment (new Date ()).add(i, 'days').startOf('day').valueOf();
        }
        this.setState({
            allDays:allDays,
        })
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
        }
     }
    render() {
     let {allDays} = this.state;
        return (
            <>
            <HomeHeader
                isShowBanner = {false}
            />
            <div className="expert-detail-container">
                <div className="intro-expert">
                    <div className="content-left" >
                        <ExpertSchedule expertId={detailExp && detailExp.id ? detailExp.id :-1}   />
                    </div>
                       <div className="content-right">
                        <div className='up'>
                        {language === LANGUAGES.VI? nameVi : nameEn}
                        </div>
                           <div className='down'>
                                {  detailExp && detailExp.Markdown && detailExp.Markdown.description &&
                                  <span> {detailExp.Markdown.description} </span>}
                           </div>
                       </div>
                </div>
                   <div className='schedule-expert'>
                   <div className="content-left" >
                        <ExpertSchedule expertId={detailExp && detailExp.id ? detailExp.id :-1}   />
                    </div>
                    <div className='content-right'>

                    </div>
                   </div>
                   <div className='detail-info-expert'>
                   {  detailExp && detailExp.Markdown && detailExp.Markdown.contentHTML &&
                       <div dangerouslySetInnerHTML ={{ __html: detailExp.Markdown.contentHTML}}>  </div>        }
                   </div>
                   <div className='comment-expert'>

                   </div>
            </div>
            </>
            

        );
    }

}
const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
  

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpertSchedule);
