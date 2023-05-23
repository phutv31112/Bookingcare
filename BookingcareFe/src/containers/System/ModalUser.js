import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    handleCreateUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewUser(this.state);
        }
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.handleToggleModal()
    }
    render() {
        return (
            <Modal size='lg' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={"modal-create-user"}>
                <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <form onChange={this.handleChange} className="row g-3" action="/post-crud" method="POST">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" />
                                </div>

                            </form>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="success" onClick={() => { this.handleCreateUser() }}>Create</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
