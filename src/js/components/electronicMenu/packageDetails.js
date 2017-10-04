import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDefaultDealTerm,setDefaultDealTermRate, setDefaultDealApr, selectedPackageProduct, setInviewPayment, setDealerProducts, setDealFinance, setCustomerDetails, setVehicleData, setDealTradeInPayoff, showElectronicMenu}  from '../../actions/index';
import PackageDetails from '../presentation/packageDetails';
import { Draggable, Droppable } from 'react-drag-and-drop';


class ElePackageDetails  extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let curentState = this.props;

    let selectedDealerPackageArr = curentState.products.filter(d => d.is_package_selected);
    let selectedProducts = [];
    let declinedProducts = [];
    let packagePrice = 0;
    let selectedDealerPackage;
    let selectedpackageOption;

    return(
      <div className="col-lg-10 col-sm-8">
         <div className="e-actionCenter">
          <div className="e-actionBody">
           <div className="row">
             <div className="col-md-5">
              <div className="e-pkgSec e-mg--toppk">
                <span className="e-prod-details-pkg"><h4 className="e-decProd">Declined Products</h4></span>
                {curentState.customerDetails &&
                <p className="e-smlFont-prod-dec">{curentState.customerDetails.first_name+' '+ curentState.customerDetails.last_name} confirms that the following products were presented as below and declined. These products are offered as a part of
                vehicle sales transactions and may not be available after the fact, in retrospect, or as stand-alone products.</p>
                }
                <div className="e-pkg-dec">

                </div>

              </div>
             </div>
             <div className="col-md-5">
              <div className="e-pkgSec">
                <span className="e-prod-details-pkg"><h4 className="e-selProd">Selected Products</h4></span>
                {curentState.customerDetails &&
                <p className="e-smlFont-prod-sel">{curentState.customerDetails.first_name+' '+ curentState.customerDetails.last_name} confirms that the following products were presented as below and declined. These products are offered as a part of
                vehicle sales transactions and may not be available after the fact, in retrospect, or as stand-alone products.</p>
                }
                <div className="e-pkg-sel">

                </div>

              </div>
             </div>
           </div>
          </div>
         </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        productList: state.productList,
        dealTerms: state.dealTerms,
        defaultDealTerm: state.defaultDealTerm,
        defaultDealTermRate: state.defaultDealTermRate,
        defaultDealApr: state.defaultDealApr,
        defaultPackage: state.defaultPackage,
        selectedPackageProduct: state.selectedPackageProduct,
        inviewPayment: state.inviewPayment,
        dealFinance:state.dealFinance,
        dealerProducts: state.dealerProducts,
        initialRequestParams: state.initialRequestParams,
        vehicleData: state.vehicleData,
        customerDetails: state.customerDetails,
        dealTradeInPayoff: state.dealTradeInPayoff,
        tradeinData: state.tradeinData
    };
  }

  function matchDispatchToProps(dispatch){
    return {
     actions: {
       setDefaultDealTerm: bindActionCreators(setDefaultDealTerm, dispatch),
       setDefaultDealTermRate: bindActionCreators(setDefaultDealTermRate, dispatch),
       setDefaultDealApr: bindActionCreators(setDefaultDealApr, dispatch),
       selectedPackageProductAction: bindActionCreators(selectedPackageProduct, dispatch),
       setInviewPayment: bindActionCreators(setInviewPayment, dispatch),
       setDealFinance: bindActionCreators(setDealFinance, dispatch),
       setVehicleData: bindActionCreators(setVehicleData, dispatch),
       setDealTradeInPayoff: bindActionCreators(setDealTradeInPayoff, dispatch),
       setCustomerDetails: bindActionCreators(setCustomerDetails, dispatch),
       showElectronicMenu: bindActionCreators(showElectronicMenu, dispatch)


     }
   };
}

export default connect(mapStateToProps, {})(ElePackageDetails);
