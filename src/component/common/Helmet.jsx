import React, { Component } from "react";
import {Helmet} from 'react-helmet'

class PageHelmet extends Component{
    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>Christos Costamis-Agiomavritis </title>
                    <meta name="description" content="My Portfolio Website." />
                </Helmet>
            </React.Fragment>
        )
    }
}


export default PageHelmet;
