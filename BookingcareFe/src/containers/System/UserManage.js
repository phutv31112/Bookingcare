import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, updateUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEdit: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }
    getAllUsers = async () => {
        let response = await getAllUsers("all");
        this.setState({
            arrUser: response.users
        })
    }
    handleModalUser = () => {
        this.setState({
            isOpenModalUser: true,
            disable: true
        })
    }
    handleToggleModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    handleToggleModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalUser: false,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteUser = async (id) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                await this.getAllUsers()
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    editUser = (user) => {
        try {
            this.setState({
                isOpenModalEdit: true,
                userEdit: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    handelEditUser = async (user) => {
        try {
            let res = await updateUserService(user);
            if (res && res.errCode === 0) {
                await this.getAllUsers()
                this.setState({
                    isOpenModalEdit: false
                })
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    renderUserList = () => {
        return this.state.arrUser.map((item, index) => {
            return <tr key={index}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                    <button onClick={() => { this.editUser(item) }} className='btn_edit btn-edit-update'><i className="fa fa-edit"></i></button>
                    <button onClick={() => { this.handleDeleteUser(item.id) }} className='btn_edit btn-edit-delete'><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        })
    }


    render() {
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    handleToggleModal={this.handleToggleModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEdit &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEdit}
                        handleToggleModal={this.handleToggleModalEdit}
                        currentUser={this.state.userEdit}
                        handelEditUser={this.handelEditUser}
                    />
                }
                <div className='title tex-center'>Manage Users</div>
                <div className='mt-3 mx-2 text-right'>
                    <button onClick={() => { this.handleModalUser() }} className='btn btn-primary px-3'>+ Add new user</button>
                </div>


                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {this.renderUserList()}

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
