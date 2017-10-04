import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDefaultDealTerm,setDefaultDealTermRate, setDefaultDealApr, selectedPackageProduct, setInviewPayment, setDealerProducts, setDealFinance, setCustomerDetails, setVehicleData, setDealTradeInPayoff, showElectronicMenu}  from '../../actions/index';
import PackageDetails from '../presentation/packageDetails';

class CarDetail extends React.Component{
  constructor(props){
      super(props)
  }
  render(){
    let curentState = this.props;
    let carDetailObj = this;
    //console.log('dealFinance', this.props.dealFinance);
    //console.log('dealTradeInPayoff', this.props.dealTradeInPayoff);
    if(curentState.defaultPackage)
    return(
      <div className="col-lg-2 col-md-12 e-border-right">
      {(curentState.customerDetails && curentState.vehicleData && curentState.dealFinance)  &&
        <div className="e-headerSec">
        <span className="e-tx--gray e-tx--title"><p>{curentState.customerDetails.first_name+' '+ curentState.customerDetails.last_name} &nbsp; &nbsp; </p></span>
        <span className="e-carDetails e-tx--desc">{curentState.vehicleData.year},<span> {curentState.vehicleData.make}</span> {curentState.vehicleData.model}, {curentState.vehicleData.trim} | {curentState.dealFinance.finance_method}</span>
        </div>
      }
        <div className="e-dtlSec e-border-bottom">
          <div>
           <div className="form-group">
           { curentState.dealFinance &&
              <div className="e-dtlSec e-ddls e-smlFont e-lineEx">
                <p className="e-mbtm-zero e-dd-sum">Deal Details</p>
                <div className="e-tx--lightgray e-tx--normal">Selling Price: <span className="e-tx--amt">$ {curentState.dealFinance.selling_price ? curentState.dealFinance.selling_price.toFixed(2) : '0.00'}</span></div>
                { curentState.dealTradeInPayoff &&
                <div>
                  <div className="e-tx--lightgray e-tx--normal">Trade In: <span className="e-tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance.toFixed(2) : '0.00'}</span></div>
                  <div className="e-tx--lightgray e-tx--normal">Payoff: <span className="e-tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff.toFixed(2) : '0.00'}</span></div>
                </div>
               }
                <div className="e-tx--lightgray e-tx--normal">Cash Down: <span className="e-tx--amt"> $ {curentState.dealFinance.cash_down_amount ? curentState.dealFinance.cash_down_amount.toFixed(2) : '0.00'}</span></div>
                <div className="e-tx--lightgray e-tx--normal">Rebate: <span className="e-tx--amt"> $ {curentState.dealFinance.rebate_amount ? curentState.dealFinance.rebate_amount.toFixed(2) : '0.00'}</span></div>
                <div className="e-tx--lightgray e-tx--normal">Amount Financed: <span className="e-tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></div>
                <div className="e-tx--lightgray e-tx--normal">Term: <span className="e-tx--amt"> {curentState.defaultDealTerm} months</span></div>
                <div className="e-tx--lightgray e-tx--normal">Rate: <span className="e-tx--amt">{curentState.dealFinance.apr ? curentState.dealFinance.apr : '0.00'}%</span></div>
                <div className="e-tx--lightgray e-tx--normal">Base Payment: <span className="e-tx--amt">${curentState.dealFinance.monthly_payment ? parseFloat(curentState.dealFinance.monthly_payment).toFixed(2) : '0.00'}</span></div>
              </div>
            }
              <div className="e-menuBtn">
                <span><button type="button" className="btn btn-default e-pkgBtn"> Back </button></span> &nbsp;
                <button type="button" className="btn btn-primary e-pkgBtn1"> Sign </button>
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

export default connect(mapStateToProps, {})(CarDetail);
