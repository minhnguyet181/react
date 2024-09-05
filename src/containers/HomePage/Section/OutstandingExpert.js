import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import {withRouter} from 'react-router';
class OustandingExpert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrExperts: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topExpertsRedux !== this.props.topExpertsRedux) {
            this.setState({
                arrExperts: this.props.topExpertsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopExperts();
    }
    handleviewDetailExp = (expert) =>{
        if(this.props.history) {
            this.props.history.push(`/detail-expert/${expert.id}`)

        }
    }
    render() {
        let arrExperts = this.state.arrExperts;
        let { language } = this.props;
     
        console.log(arrExperts);
        return (
            <div className='section-share section-outstanding-expert'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.outstanding-expert" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-in4" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrExperts && arrExperts.length > 0 && arrExperts.map((item, index) => {
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='section-customize' key={index} onClick={() => this.handleviewDetailExp(item)} >
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-expert' />
                                            </div>
                                        </div>
                                        <div className='position text-center' >
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div>Chuyen da lieu</div>
                                        </div>
                                    </div>
                                )
                            })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topExpertsRedux: state.admin.topExperts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopExperts: () => dispatch(actions.fetchTopExpert())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OustandingExpert)) ;
