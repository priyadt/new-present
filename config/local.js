//var pjson = require('../package.json');
// console.log(pjson.version)
const localConfig = {
  emenuMobileGatewayAPI: 'http://10.117.0.61:6333/api/mobile/v1/emenu',
  dealMobileGatewayAPI: 'http://10.117.0.61:6333/api/mobile/v1/deal',
  baseUrlPath: 'http://localhost',
  printPortAPI: ':6357',
  fniMenuDealerApp: '',
  version:" ",
  fniMenuCustApp: '',
  //version: pjson.version,
  credentialsFlag: false
}

module.exports = localConfig;
