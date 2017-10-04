import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink , Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import ProductDetail from './presentation/productDetail';
import ElectonicMenu from './electronicMenu/electonicMenu';
import './presentation/styles/productStyles.css';
import './electronicMenu/styles/electronicmenuStyles.css';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();




class App  extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    console.log('this.props.electronicMenu', this.props.electronicMenu);
    var nextUrl  = 'dealjacketid=310200000000002215&dealid=310200000000002216&dealer_code=1111132&deploy_env=local'
    return(

        <div>
            {
              /*
              <BrowserRouter>
              <div>
                <NavLink className="item" activeClassName="active" exact to={'/'+nextUrl}>Home</NavLink>
                <NavLink className="item" activeClassName="active" exact to='/emenu'>emenu</NavLink>
              </div>

              <Route exact path='/emenu' component={ElectonicMenu} />
              <Route exact path={'/'+nextUrl} component={ProductDetail} />
              <Route path={'/'} component={ProductDetail} />
              </BrowserRouter>

              <Router history={ history }>

                <div>
                <Route path='/emenu' component={ElectonicMenu} />

                <Route path={'/index.html'} component={ProductDetail} />

                </div>
              </Router>
              */
            }





          {
             this.props.electronicMenu ? <ElectonicMenu />  : <ProductDetail />
          }


         </div>



    )
  }
}

function mapStateToProps(state) {
    return {
        electronicMenu: state.electronicMenu
    };
}

export default connect(mapStateToProps, {})(App);
