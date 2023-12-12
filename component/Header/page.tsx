import React from 'react';
import styles from 'page.module.css';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header>
            <h1 className='styles..customHeading'>{title}</h1>
        </header>
    );
};

export default Header;
