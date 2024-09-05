import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getinfoExpert } from '../../../services/userService';
import './DetailExpert.scss'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import ExpertSchedule from './ExpertSchedule.js';
class DetailExpert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailExp: []
        }
    }
  async  componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getinfoExpert(id);
            if(res && res.errCode === 0 ) {
                this.setState({
                    detailExp:res.data
                })
            }
            
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
   
    }

    render() {
        let {language} = this.props;
        let{detailExp} = this.state;
        let nameVi='' , nameEn ='';
        if(detailExp && detailExp.positionData){
            nameVi = `${detailExp.positionData.valueVi}, ${detailExp.lastName} ${detailExp.firstName} `;
             nameEn = `${detailExp.positionData.valueEn}, ${detailExp.firstName} ${detailExp.lastName} `;
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailExpert);
