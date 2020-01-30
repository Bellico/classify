import React from 'react';
import { HeaderWorking } from './header-working';
import { PrimaryActions } from './primary-actions';
import { CardRule } from '../components/card-rule';


export const WorkingPage = () => {
    return (
        <section className="working">
            <div className="container">
                <PrimaryActions />
                <HeaderWorking />
                <CardRule />
                <CardRule />
                <CardRule />
            </div>
        </section >
    )
};

