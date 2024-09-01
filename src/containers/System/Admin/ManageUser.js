import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageUser.scss'
import MarkdownIt from 'markdown-it';
import MdEditer from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();
function handleEditChange({ html, text }) { };
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                usersRedux: this.props.listUser
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser = (user) => {
        console.log('uesrs', user)
        this.props.handleEditUser(user);
    }
    render() {
        let arrUser = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id='ManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'>   <i className='fas fa-edit'> </i></button>
                                            <button onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete' >  <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <MdEditer style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditChange} />
            </React.Fragment>


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
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
        editUser: (user) => dispatch(actions.editUser(user)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
