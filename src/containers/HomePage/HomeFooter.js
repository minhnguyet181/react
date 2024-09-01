import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>

                <div className="box">
                    <h3>Explore Us</h3>
                    <a href="about.html">About Us</a>
                    <a href="services.html">Our Sevices</a>
                    <a href="awards.html">Awards and Certificates</a>
                </div>

                <div className="box">
                    <h3>Legislation</h3>
                    <a href="legal.html">Legal Statement</a>
                    <a href="privacy.html">Privacy Policy</a>
                </div>

                <div className="box">
                    <h3>Branches</h3>
                    <a href="officer.html">Officer Location</a>
                </div>

                <div className="box">
                    <h3>follow us</h3>
                    <div className="icon">
                        <a href=""><i className="fab fa-facebook"></i></a>
                        <a href=""><i className="fab fa-instagram"></i></a>
                        <a href=""><i className="fab fa-twitter"></i></a>
                    </div>
                    <a className='footer' href="https://chat.zalo.me/"><i className="far fa-address-card"></i>0343651621</a>
                    <a className='footer' href="https://mail.google.com/mail/u/0/#inbox"><i className="far fa-envelope"></i>moonlightspa@gmail.com</a>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
