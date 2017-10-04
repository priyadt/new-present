import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarDetail from './carDetail';
import ElePackageDetails from './packageDetails';


class ElectonicMenu  extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    // console.log('this.props.electronicMenu', this.props.electronicMenu);
    return(
      <div>
        <CarDetail />
        <ElePackageDetails />
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        //electronicMenu: state.electronicMenu
    };
}

export default connect(mapStateToProps, {})(ElectonicMenu);
