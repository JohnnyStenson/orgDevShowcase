import { LightningElement, wire, api, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import PRODUCT_USED_FOR from '@salesforce/schema/Product2.Product_Used_For__c';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
// importing Apex Class
import getQLGs from '@salesforce/apex/LWCqgsQuoteGroupController.retrieveQLGs';
import { refreshApex } from '@salesforce/apex';

export default class QgsMain extends LightningElement {
    @api recordId;
 
    /* Query Existing Quote Line Groups for Quote Group List */
    @track qlgs;
    @track qlgsError;
    provisionedQLGs;

    @wire(getQLGs, { quoteId: '$recordId'})
    wiredQLGs(provisionedQLGs) {
        this.provisionedQLGs = provisionedQLGs; // track the provisioned value
        const { data, error } = provisionedQLGs; // destructure it for convenience
        if (data) {
            console.log('JJS:::::::');
            console.dir(data);
            this.qlgs = data;
            this.qlgsError = undefined;
        } else if (error) {
            console.log(error);
            this.qlgsError = error;
            this.qlgs = undefined;
        }
    }

    /* Product Used For list to Add New Pay Item used in combobox in QLG */
    @track pufValues; 
    @wire(getObjectInfo, { objectApiName: PRODUCT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName : PRODUCT_USED_FOR
    })wiredPickListValue({ data, error }){
        if(data){
            console.log(` Picklist values are `, data.values);
            this.pufValues = data.values;
            this.error = undefined;
        }
        if(error){
            console.log(` Error while fetching Picklist values  ${error}`);
            this.error = error;
            this.pufValues = undefined;
        }
    }

    /* New Quote Line Group Button */
    handleCreateQLG() {
        const newQLGPopup = this.template.querySelector("c-qgs-new-q-l-g-popup ");
        newQLGPopup.quoteId = this.recordId;
        newQLGPopup.qlgId = null;
        newQLGPopup.recordId = null;
        newQLGPopup.recordName = null;      
        newQLGPopup.sobjectApiName = 'SBQQ__LineItemGroups__r';
        newQLGPopup.sobjectLabel = 'Quote Line Group';
        newQLGPopup.show();
    }

    /* Refresh */
    refreshQLGList() {
        return refreshApex(this.provisionedQLGs); 
    }

    handleRefreshQLGs(){
        return refreshApex(this.provisionedQLGs); 
    }
    

    
}