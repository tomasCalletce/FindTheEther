import React from "react";


import './infoTile.css'

export default class InfoTile extends React.Component {


    render(){

        return(
            <div className="boxContainer">
                <h1 className="boxtitle">{this.props.text.title}</h1>
                <p>{this.props.text.description}</p>
            </div>
        )
    }
}