import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditer from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageExpert.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt();

class ManageExpert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listExp: []
        }
    }
    componentDidMount() {
        this.props.fetchAllExpert();
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allExperts !== this.props.allExperts) {
            let dataSelect = this.dataSelected(this.props.allExperts)
            this.setState({
                listExp: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.dataSelected(this.props.allExperts)
            this.setState({
                listExp: dataSelect
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveCtmd = () => {
        console.log(this.state)
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        return (
            <div className='manage-expert-container'>
                <div className='manage-expert-title'>
                    Tạo thông tin chuyên gia
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chuyên gia</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listExp}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                            Hello world, chazo
                        </textarea>
                    </div>
                </div>
                <div className='manage-expert-editor'>
                    <MdEditer style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button onClick={() => this.handleSaveCtmd()}
                    className='save-content-expert'>
                    Save information
                </button>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allExperts: state.admin.allExperts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllExpert: () => dispatch(actions.fetchAllExpert())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageExpert);
