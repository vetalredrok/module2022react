import React from 'react';
import {Box} from "@mui/material";


import logo from '../../assets/linkedin.svg';
import logoInst from '../../assets/instagram.svg';
import logoGit from '../../assets/github.svg';
import logoMeta from '../../assets/facebook.svg';

const Footer = () => {
    return (
        <Box sx={{bgcolor: 'common.black', border: '1px solid violet',  display: 'flex', alignItems: 'center', marginTop: '20px', gap:'20px', borderRadius: '5px', paddingLeft: '150px', paddingTop: '5px'}}>
            <a target="_blank" href='https://www.linkedin.com/in/vitalii-turkevych-989762246'>
                <img src={logo} alt='Linkedin' style={{height: '40px', width: '40px'}}/>
            </a>
            <a target='_blank' href='https://www.instagram.com/dust.lens'>
                <img src={logoInst} alt='Instagram' style={{height: '40px', width: '40px'}}/>
            </a>
            <a target='_blank' href='https://github.com/vetalredrok/module2022react'>
                <img src={logoGit} alt='GitHub' style={{height: '40px', width: '45px'}}/>
            </a>
            <a target='_blank' href='https://www.facebook.com/profile.php?id=100012735552848'>
                <img src={logoMeta} alt='Instagram' style={{height: '40px', width: '40px'}}/>
            </a>
        </Box>
    );
};

export {Footer};