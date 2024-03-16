import React, { Component } from 'react';
import s from './Header.module.scss';
import Watch from '../Watch/Watch';
import { setLanguage } from '../../store/slices/main-slice';
import { connect } from 'react-redux';

interface Props {
    setLanguage: (reviews: 'ru' | 'en') => void;
}

class Header extends Component<Props> {
    
    state = {
        language: 'ru'
    };

    handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
          language: event.target.value
        });
        this.props.setLanguage(event.target.value as 'ru' | 'en')
      };


    render() {
        return (
            <header className={s.header}>
                <div className={s.header__left}><img src="https://i.pinimg.com/736x/2f/90/c1/2f90c1e9fc45169c0f2cc0dfe88e73a5.jpg" alt="" /></div>
                <div className={s.header__right}>
                    <select value={this.state.language} onChange={this.handleLanguageChange} id="">
                        <option value="ru">ru</option>
                        <option value="en">en</option>
                    </select>
                    <Watch />
                </div>
            </header>
        );
    }
}
const mapDispatchToProps = {setLanguage}

const ConnectedHeader = connect(null, mapDispatchToProps)(Header);
export default ConnectedHeader;