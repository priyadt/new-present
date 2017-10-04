import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HttpHelper from '../../Util/httpHelper.js';
import config from '../../config.js';
import {getVehicleData, setVehicleData , setCustomerDetails, setDealFinance, setDealTerms, setDefaultDealTerm,setDefaultDealTermRate, setDefaultDealApr, setDefaultPackage, setProducts, setDefaultShowDealItems, setDealTradeInPayoff, setDealerProducts, setInviewPayment }  from '../../actions/index';
import {dealerData,populateDealerData} from '../../helper/index.js';

class CarDetail extends React.Component {
 constructor(props){
   super(props);
   populateDealerData();
  //  this.state = {
  //    deal_type: dealerData.deal_type,
  //    dealer_code: dealerData.dealer_code
  //  };
   this.updateDefaultPkg = this.updateDefaultPkg.bind(this);
 }
 componentDidMount(){
   this.getVehicleData();
   this.getCustomerDetails();
   this.getDealFinance();
   this.getDealTerms();
   this.getDealTradeInPayoff();
   this.getDealerProducts();
   this.props.actions.setDefaultShowDealItems({showDealTrades: false})

 }

 getVehicleData(){
     HttpHelper(`${config.dealMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/vehicle/`, 'get','').then( function(data) {
           this.props.actions.setVehicleData(data.results[0])
     }.bind(this));

 }

 getCustomerDetails(){

   HttpHelper(`${config.dealMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/simple-customer/`, 'get','').then( function(data) {
           this.props.actions.setCustomerDetails(data.results[0])
   }.bind(this));

 }

 getDealFinance(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-finance-summary/`, 'get','').then( function(data) {
      console.log('getDealFInance -> 47', data);
           this.props.actions.setDealFinance(data)
   }.bind(this));

 }

 getDealTerms(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/deal-term-rate-options/`, 'get','').then( function(data) {
           if(data.termrateoptions){
             this.props.actions.setDefaultDealTerm(data.termrateoptions[0].term);
             this.props.actions.setDefaultDealTermRate(data.termrateoptions[0].payment);
           }
           this.props.actions.setDealTerms(data);
   }.bind(this));

 }
 getDealTradeInPayoff(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/deal-jackets/${this.props.initialRequestParams.dealjacketid}/deals/${this.props.initialRequestParams.dealid}/tradein-vehicles/`, 'get','').then( function(data) {
     this.props.actions.setDealTradeInPayoff(data)
   }.bind(this));

 }
 getDealerProducts(){
   HttpHelper(`${config.emenuMobileGatewayAPI}/dealer-products/  `, 'get','').then( function(data) {
     this.props.actions.setDealerProducts(data.results)
   }.bind(this));

 }


 updateDefaulDealTerm(eve){

   let termRate = eve.target.value.split('-');
   this.props.actions.setDefaultDealTerm(termRate[0]);
   this.props.actions.setDefaultDealTermRate(termRate[1]);

     let selPkg = this.props.selectedPackageProduct;
	     selPkg.payment_options.map((prod, i)=>{
	         if(prod.termrateoptions.term == termRate[0]){
	           this.props.actions.setInviewPayment(prod)
	         }
     })
 }
 updateDefaulDealApr(eve){
     this.props.actions.setDefaultDealApr(eve.target.value);
     let selPkg = this.props.selectedPackageProduct;
	     selPkg.payment_options.map((prod, i)=>{
	         if(prod.termrateoptions.apr == eve.target.value){
	           this.props.actions.setInviewPayment(prod)
	         }
         })
 }
 updateDefaultPkg(name,eve){
   let pkgs = {};
   for (var property in this.props.defaultPackage ) {
     if (this.props.defaultPackage.hasOwnProperty(property))
        pkgs[property] =  this.props.defaultPackage[property];
   }
   pkgs[name] = eve.target.checked;
   this.props.actions.setDefaultPackage(pkgs);
 }
 showDealTradesSection(){
   this.props.actions.setDefaultShowDealItems({showDealTrades: true})
 }

render(){
 let curentState = this.props;
 let carDetailObj = this;
 let slectedRates;
 if(curentState.dealTerms)
 curentState.dealTerms.termrateoptions.map((op)=>{
   if(curentState.defaultDealTerm == op.term)
      slectedRates = op
 })
console.log('slectedRates --->', slectedRates, curentState);
 if(curentState.defaultPackage)
 var PackageOptions = Object.keys(curentState.defaultPackage).map(function(key,i) {

   return (
       <div key={i} className={"form-" + i + "-opts tx--lightgray tx--normal"}>
         <span className="chk">
         <input type="checkbox" className="chk-box"
             defaultChecked={curentState.defaultPackage && curentState.defaultPackage[key]}
             onChange={(eve)=>carDetailObj.updateDefaultPkg(key,eve)} />
         </span>
         {key}</div>
  )
});
 return(
   <div className="col-lg-2 col-md-12 col-smd border-right">
     {(curentState.customerDetails && curentState.vehicleData && curentState.dealFinance)  &&
     <div className="headerSec">
     <span className="tx--gray tx--title"><p>{curentState.customerDetails.first_name+' '+ curentState.customerDetails.last_name} &nbsp; &nbsp; </p></span>
     <span className="carDetails tx--desc">{curentState.vehicleData.year},<span> {curentState.vehicleData.make}</span> {curentState.vehicleData.model}, {curentState.vehicleData.trim} | {curentState.dealFinance.finance_method}</span>
     </div>
     }
     <div className="dtlSec border-bottom">
       <div className="hide--dis">
        <div className="form-group">
         { curentState.dealFinance &&
           <div className="dtlSec ddls smlFont lineEx">
             <p className="hide--me mbtm-zero dd-sum">Deal Details</p>
             {curentState.dealTradeInPayoff &&
             <div>
               <div className="abs-pos tx--lightgray tx--normal">Trade In: <span className="tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance : '0.00'}</span></div>
               <div className="abs-pos tx--lightgray tx--normal">Payoff: <span className="tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff : '0.00'}</span></div>
             </div>
             }
             <div className="abs-pos tx--lightgray tx--normal">Rate: <span className="tx--amt">{curentState.dealFinance.apr}%</span></div>

             <div className="abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed : '0.00'}</span></div>
             <div className="abs-pos tx--lightgray tx--normal">Base Payment: <span className="tx--amt">$ {curentState.dealFinance.monthly_payment ? curentState.dealFinance.monthly_payment : '0.00'}</span></div>
             <div className="abs-pos tx--lightgray tx--normal">Cash Down: <span className="tx--amt"> $ {curentState.dealFinance.cash_down_amount ? curentState.dealFinance.cash_down_amount : '0.00'}</span></div>
             <div className="abs-pos tx--lightgray tx--normal">Rebate: <span className="tx--amt"> $ {curentState.dealFinance.rebate_amount ? curentState.dealFinance.rebate_amount : '0.00'}</span></div>

           </div>
           }

           <div className="termInp">
             <label className="t-lbl" htmlFor="term">Term</label>
             {curentState.dealTerms &&
              <select className="t-inp form-control" id="term"
                onChange={(eve)=> this.updateDefaulDealTerm(eve)} value={curentState.defaultDealTerm + '-' +curentState.defaultDealTermRate}>
                 {curentState.dealTerms.termrateoptions.map((item,i) =>
                     <option key={i} value={item.term+'-'+item.payment}>{item.term} months </option>
                 )}
               </select>
             }
          </div>
         </div>

       </div>

       <form className="hide-out">
         <span className="tc--form form-group">
         { curentState.dealFinance &&
           <label className="tx--normal tx--lightgray" htmlFor="term">Term: <span className="tx--amt">{curentState.dealFinance.term} months</span></label>
         }
         </span>

         <span className="cd--form form-group">
           <label className="tx--normal tx--lightgray" htmlFor="cash">Cash Down:</label>
           {curentState.dealFinance &&
            <span className="tx--amt"> $ {curentState.dealFinance.cash_down_amount ? curentState.dealFinance.cash_down_amount.toFixed(2) : '0.00'}</span>
          }
         </span>

         <span className="rb--form form-group">
           <label className="tx--normal tx--lightgray" htmlFor="cash">Rebate:</label>
           {curentState.dealFinance &&
            <span className="tx--amt"> $ {curentState.dealFinance.rebate_amount ? curentState.dealFinance.rebate_amount.toFixed(2) : '0.00'}</span>
          }
         </span>

         {curentState.dealFinance &&
         <span className="">
           <span className="ra--form abs-pos tx--lightgray tx--normal">Rate: <span className="tx--amt">{curentState.dealFinance.apr}%</span></span>
           { curentState.dealTradeInPayoff &&
             <span>
               <span className="ti--form abs-pos tx--lightgray tx--normal">Trade In: <span className="tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance.toFixed(2) : '0.00'}</span></span>
               <span className="po--form abs-pos tx--lightgray tx--normal">Payoff: <span className="tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff.toFixed(2) : '0.00'}</span></span>
             </span>
           }
           <span className="bp--form abs-pos tx--lightgray tx--normal">Base Payment: <span className="tx--amt">$ {curentState.dealFinance.monthly_payment ? curentState.dealFinance.monthly_payment : '0.00'}</span></span>
           <span className="taf--form abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></span>
           { curentState.dealTradeInPayoff &&
           <span>
             <span className="p-ti--form abs-pos tx--lightgray tx--normal">Trade In: <span className="tx--amt">$ {curentState.dealTradeInPayoff.allowance ? curentState.dealTradeInPayoff.allowance.toFixed(2) : '0.00'}</span></span>
             <span className="p-po--form abs-pos tx--lightgray tx--normal">Payoff: <span className="tx--amt">$ {curentState.dealTradeInPayoff.payoff ? curentState.dealTradeInPayoff.payoff.toFixed(2) : '0.00'}</span></span>
           </span>
           }
           <span className="p-taf--form abs-pos tx--lightgray tx--normal">Amount Financed: <span className="tx--amt">$ {curentState.dealFinance.amount_financed ? curentState.dealFinance.amount_financed.toFixed(2) : '0.00'}</span></span>
             <div className="dp--form tx--lightgray tx--normal">Display Options:</div>
             {curentState.defaultPackage &&
               <div className="defPkg-sel">
               {PackageOptions}
               </div>
             }

         </span>
         }

       </form>
     </div>

     <div className="hide--dis">
       <div className="dtlSec border-bottom lineEx">

         <div className="hide--me mbtm"><span className="dd-sum">Display Options</span>
         { curentState.defaultPackage &&
           <div className="defPkg-sel">
           {PackageOptions}
           </div>
         }
         </div>
       </div>
     </div>

     <div className="hide-out">

     </div>
   </div>

 )
}
}

function mapStateToProps(state) {
   return {
         vehicleData: state.vehicleData,
         products: state.products,
         customerDetails: state.customerDetails,
         dealFinance: state.dealFinance,
         dealTerms: state.dealTerms,
         defaultDealTerm: state.defaultDealTerm,
         defaultDealTermRate: state.defaultDealTermRate,
         defaultDealApr: state.defaultDealApr,
         dealTradeInPayoff: state.dealTradeInPayoff,
         defaultPackage: state.defaultPackage,
         defaultShowDealItems: state.defaultShowDealItems,
         initialRequestParams: state.initialRequestParams,
         dealerProducts: state.dealerProducts,
         selectedPackageProduct: state.selectedPackageProduct

   };
}

function matchDispatchToProps(dispatch){
 return {
  actions: {

    setVehicleData: bindActionCreators(setVehicleData, dispatch),
    setCustomerDetails: bindActionCreators(setCustomerDetails, dispatch),
    setDealFinance: bindActionCreators(setDealFinance, dispatch),
    setDealTerms: bindActionCreators(setDealTerms, dispatch),
    setDefaultDealTerm: bindActionCreators(setDefaultDealTerm, dispatch),
    setDefaultDealTermRate: bindActionCreators(setDefaultDealTermRate, dispatch),
    setDefaultDealApr: bindActionCreators(setDefaultDealApr, dispatch),
    setDealTradeInPayoff: bindActionCreators(setDealTradeInPayoff, dispatch),
    setDefaultPackage: bindActionCreators(setDefaultPackage, dispatch),
    setDefaultShowDealItems: bindActionCreators(setDefaultShowDealItems, dispatch),
    setDealerProducts: bindActionCreators(setDealerProducts, dispatch),
    setInviewPayment: bindActionCreators(setInviewPayment, dispatch)

  }
};

}

export default connect(mapStateToProps, matchDispatchToProps)(CarDetail);
