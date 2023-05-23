import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            password: "",
            address: '',
        }
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        }, () => {

        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSave = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.handelEditUser(this.state);
        }
    }
    componentDidMount() {
        console.log(this.props.currentUser)
        let { currentUser } = this.props;
        if (currentUser && !_.isEmpty(currentUser)) {
            this.setState({
                id: currentUser.id,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                password: "hashcode",
                address: currentUser.address,
            })
        }

    }

    toggle = () => {
        this.props.handleToggleModal()
    }
    render() {
        return (
            <Modal size='lg' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={"modal-create-user"}>
                <ModalHeader toggle={() => { this.toggle() }}>EDit user</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <form className="row g-3" action="/post-crud" method="POST">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input onChange={this.handleChange} value={this.state.email} disabled type="email" className="form-control" id="email" name="email" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input onChange={this.handleChange} value={this.state.password} disabled type="password" className="form-control" id="password" name="password" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input onChange={this.handleChange} value={this.state.firstName} type="text" className="form-control" id="firstName" name="firstName" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input onChange={this.handleChange} value={this.state.lastName} type="text" className="form-control" id="lastName" name="lastName" />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input onChange={this.handleChange} value={this.state.address} type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" />
                                </div>

                            </form>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="success" onClick={() => { this.handleSave() }}>Save</Button>
                    <Button className='px-3' color="danger" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
