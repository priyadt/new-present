import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDefaultDealTerm,setDefaultDealTermRate, setDefaultDealApr, selectedPackageProduct, setInviewPayment, setDealerProducts, setDealFinance, setCustomerDetails, setVehicleData, setDealTradeInPayoff, showElectronicMenu}  from '../../actions/index';
import PackageInview from './packageInview.js';
import RateSpans from './RateSpans.js';
import axios from 'axios';
import config from '../../config.js';
import { dealerData } from '../../helper/index.js';
import HttpHelper from '../../Util/httpHelper.js';
import PackageDetailsPopUp from './packageDetailsPopup';
import _ from 'lodash';
// import { BrowserRouter as Router, Link } from 'react-router-dom'
// import { createBrowserHistory } from 'history';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()




class PackageDetails  extends React.Component {
  constructor(props, history){
    super(props);
    this.state={
      data:{},
      // dealer_code: window.dealer_code,
      popupFlag: false,
      popupData: {},
      history
    }
  }
  clickDiv(el) {
    var ele = document.getElementById('PLATINUM-productList-0');
    if(document.body.contains(ele))
     ele.click()
   }

  setInviewPayment(item, v, from){
    if(this.props.products){
      let selPkg;
      if(from === 'init')  selPkg = item;
      else selPkg = this.props.selectedPackageProduct;

      selPkg.payment_options.map((prod, i)=>{
          if(prod.termrateoptions.term == v){
            this.props.actions.setInviewPayment(prod)
          }
      })


      setTimeout(function(){
        let rateEle = document.getElementsByClassName('prodSpans');
      for(let i = 0; i<rateEle.length ; i++){
        let children = rateEle[i].childNodes;
        let childrenArray = [ ...children ]; //Adding all childern(43) in to an array ES6 way

        for(let k = 0; k< childrenArray.length ; k++){
        childrenArray[k].style.display = 'none'
        }

        let isPrinted = false;
        for(let k = 0; k< childrenArray.length ; k++){
          if(!isPrinted && childrenArray[k].innerHTML !='' ){
            childrenArray[k].style.display = 'block';
            isPrinted = true;
          }else {
             childrenArray[k].style.display = 'none'
          }
        }
      }
    }, 100)

    }
  }
  updateDefaulDealTerm(item,eve ){
      let termRate = eve.target.value.split('-');
      this.props.actions.setDefaultDealTerm(termRate[0]);
      this.props.actions.setDefaultDealTermRate(termRate[1]);

      // let data = {
      //   "deal_id": this.props.dealTerms.deal_id,
      //   "deal_jacket_id": this.props.dealTerms.deal_jacket_id,
      //   "dlr_cd": this.props.dealTerms.dlr_cd,
      //   "packages": this.props.products
      // }
      //
      // console.log('data',data);
      //
      // HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/package-products/`, 'post',data).then( function(data) {
      //
      // }.bind(this));
      //
      // HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-finance-summary/`, 'get','').then( function(data) {
      //
      //   console.log('Call response data', data);
      //   this.props.actions.setDealFinance(data);
      // }.bind(this));
      // console.log('Update DEfau', this.props.dealFinance);

      this.setInviewPayment(item, termRate[0], 'update');

  }
  updateSelectedPackage(prod){
      this.props.actions.selectedPackageProductAction(prod);
      let initTerm = this.props.defaultDealTerm;
      this.setInviewPayment(prod, initTerm, 'init');
  }
  popupSetting(prod){
    document.getElementsByClassName("tx--pkghead").length==4 ?
    this.setState({
      popupData:prod,
      popupFlag: true
    }) : null
  }
  closePopup(){
    this.setState({
      popupFlag: false,
    });
  }

  componentDidMount(){
    if(this.props.products){
      let defaultClickOn = this.props.products[0].products[0];
      this.updateSelectedPackage(defaultClickOn)
     }
  }


  UpdateDealFinance(){
  this.setState({
    data:prod
  });
  this.props.actions.dealFinance(prod);
}

setselectedPackageProduct(eve){
  //console.log('POst info', this.props.dealFinance);
  let selectedNode = eve.target.parentElement.parentElement.children[0].getElementsByClassName("tx--pkghead")[0].innerText.split(" ")[0];
  let data = {
    "deal_id": this.props.dealTerms.deal_id,
    "deal_jacket_id": this.props.dealTerms.deal_jacket_id,
    "dlr_cd": this.props.dealTerms.dlr_cd,
    "packages": this.props.products
  }
  let newData = data["packages"].map((obj)=>{
    if(obj["package_name"].toUpperCase()===selectedNode) obj["is_package_selected"]=true;
    else obj["is_package_selected"]=false;

   })


  let dealid = this.props.dealTerms.deal_id;
  let dealjacketid = this.props.dealTerms.deal_jacket_id;
  let firstname = dealerData.user_first;
  let lastname = dealerData.user_last;
  let dealer_code = dealerData.dealer_code;

  HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/package-products/`, 'post',data).then( function(data) {

  }.bind(this));
  let apr= _.filter(this.props.dealTerms.termrateoptions,['term',parseInt(this.props.defaultDealTerm)]);
  let dealFinance = this.props.dealFinance;
  dealFinance['term']=this.props.defaultDealTerm;
  dealFinance['apr']=apr[0].apr;
  dealFinance['monthly_payment']=apr[0].payment;


  let htmltopdf = {
    "deal_id": this.props.dealTerms.deal_id,
    "deal_jacket_id": this.props.dealTerms.deal_jacket_id,
    "dlr_cd": this.props.dealTerms.dlr_cd,
    "is_final_menu":true,
    "user_firstname":dealerData.user_first,
    "user_lastname":dealerData.user_last,
    "Customer_information": this.props.customerDetails,
    "Vehicle_information": this.props.vehicleData,
    "Deal_finance_summary": this.props.dealFinance,
    "packages": this.props.products
  }
  let dealFinanceData = this.props.dealFinance;
  console.log('dealFinanceData...',dealFinanceData);


  HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-finance-summary/`, 'post',dealFinanceData).then( function(data) {
  }.bind(this));

  let genericCalcURL = `${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/generic-payment/`
  let request="";
  HttpHelper(genericCalcURL,'post',request).then(function(response) {
  }.bind(this));

  HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-finance-summary/`, 'get','').then( function(data) {
    this.props.actions.setDealFinance(data);
  }.bind(this));

   this.showElectronicMenu(eve);
  //eve.preventDefault();
  //this.context.router.transitionTo('/emenu',{});
//   history.push('/emenu',{});
  // this.context.router.push('/emenu');
  // this.router.history.push('/')
//this.state.history.push('/emenu')

  }

  showElectronicMenu(eve){
    this.props.actions.showElectronicMenu();
  }


  render(){
    let curentState = this.props;
    console.log('this.props.dealFinance', this.props.dealFinance);
    return (
      <div>
      <div>
      { (curentState.products && curentState.defaultPackage) &&
      <div>
      {curentState.products.map((item, index)=>
        <div key={index}>
       {curentState.defaultPackage[Object.keys(curentState.defaultPackage)[index]] &&
        <div className="col-lg-2 col-sm-4 border-right prod-list pkg-width">
        <div className="border-bottom pkgSec"><p className="tx--pkghead">{item.package_name} PACKAGE</p></div>
        <div className="prod-items">
        {item.products.map((prod, i) =>
          <div key={i} ref = {this.clickDiv} id={item.package_name+"-productList-"+i } onClick={(eve)=> this.updateSelectedPackage(prod)}>
            <div className="row package border-bottom pkgSec" key={prod.deal_prod_id} onClick={this.popupSetting.bind(this,prod)}>
            <img src={prod.image_url ? prod.image_url: "http://10.117.0.61:6357/images/roadahead.png"} className="pull-left"/>
              <span className="tx--font11"><span className="pkg-weight">{prod.name}</span><br/>
                <div className="prodSpans" key={i}>
              {prod.payment_options.map((payOption, i)=>
                  (payOption.termrateoptions.term == curentState.defaultDealTerm) &&
              <span key={i} className="pm--spacing payRateCls">
                 {

                  '$' + (payOption.payment_monthly ? parseFloat(payOption.payment_monthly).toFixed(2) : '0.00') + '/mo'
                  }
              </span>

            )}
            </div>
              </span>
            </div>
            </div>
          )
        }
        </div>
        <div className="pkgSec tpkg">
          <div className="form-group">
              <label className="t-lbl" htmlFor="price">Price</label>
              <div className="input-group">
                <span className="input-group-addon inp-grp-addon">$</span>
                <input type="text" className="form-control" id="cash" defaultValue={item.price ? parseFloat(item.price).toFixed(2) : '0.00'} disabled/>
              </div>
          </div>
          <div>
          <form className="hide--dis tr--btn">
          <div>
              {item && item.package_options.map((op,i) =>
                  <span className="col-xs-6" style={{padding: '5px'}} key={i}>
                  <input type="radio" value={op.termrateoptions.term+'-'+op.payment}
                    checked={(op.termrateoptions.term == curentState.defaultDealTerm && op.payment == curentState.defaultDealTermRate)}
                    onChange={(eve)=> this.updateDefaulDealTerm(item,eve)} /> {op.termrateoptions.term} mos @ ${op.payment ? parseFloat(op.payment).toFixed(2) : '0.00'} </span>
              )}
          </div>
        </form>
        <form className="hide-out">
          <div>
              {item &&
               <select
               className="t-inp form-control" id="term"
               onChange={(eve)=> this.updateDefaulDealTerm(item, eve)  } value={curentState.defaultDealTerm+'-'+curentState.defaultDealTermRate}>
                  {item.package_options.map((op,i) =>
                      <option key={i}
                        value={op.termrateoptions.term+'-'+op.payment}>{op.termrateoptions.term} mos @ ${op.payment ? parseFloat(op.payment).toFixed(2) : '0.00'} </option>
                  )}
                </select>
              }
          </div>
        </form>
          </div>

        </div>
        <div className="pkgSec text-center pksa"> <button type="button" className="btn btn-default pkgBtn" onClick={(eve)=>this.setselectedPackageProduct(eve)}>Select Package</button></div>
       </div>

     }
       </div>
     ) }

    </div>
    }
    </div>
    {
      this.state.popupFlag ? <PackageDetailsPopUp
                                  popupData={this.state.popupData}
                                  inviewPayment = {this.props.inviewPayment}
                                  closePopup={this.closePopup.bind(this)}/> : null
    }
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
        dealFinance: state.dealFinance,
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


export default connect(mapStateToProps, matchDispatchToProps)(PackageDetails);
