import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserInfo, editUserInfo } from '../../services/userService';
import ModalUser from './ModalUser';
import { reject } from 'lodash';
import { emitter } from '../../utils/emitter';
import ModelEdit from './ModelEdit';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEdit: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUsersInfo();
    }
    getAllUsersInfo = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersInfo();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (e) {
            console.log(e);
        }
    }
    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        })
    }
    handleDeleteUser = async (user) => {
        console.log('click delete', user)
        try {
            let res = await deleteUserInfo(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersInfo();
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEdit: true,
            userEdit: user
        })
        try {

        } catch (e) {
            console.log(e);
        }
    }
    updateUser = async (user) => {
        try {
            let res = await editUserInfo(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEdit: false
                })
                await this.getAllUsersInfo()
            } else {
                alert(res.errCode)
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleClose={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEdit && <ModelEdit
                    isOpen={this.state.isOpenModalEdit}
                    toggleClose={this.toggleModalEdit}
                    currentUser={this.state.userEdit}
                    updateUser={this.updateUser}
                ></ModelEdit>}

                <div className='title text-center'> Manage User </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}><i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id='customers'>
                        <tbody>
                            <tr >
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone number</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-edit'></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
