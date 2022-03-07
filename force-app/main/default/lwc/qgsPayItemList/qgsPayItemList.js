import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// importing Apex Class
import { refreshApex } from '@salesforce/apex';
import getPayItems from '@salesforce/apex/LWCqgsPayItemController.retrievePayItems';

export default class QgsPayItemList extends LightningElement {
    @api quoteId;
    @api qlgId;
    @api pufValues;
    @track pufValue;
    @track payItems;
    @track error;
    provisionedPayItems;

    @wire(getPayItems, { qlgId: '$qlgId'})
    wiredPayItems(provisionedPayItems) {
        this.provisionedPayItems = provisionedPayItems; // track the provisioned value
        const { data, error } = provisionedPayItems; // destructure it for convenience
        if (data) {
            console.log('PayItems:::::::');
            console.dir(data);
            this.payItems = data;
            this.error = undefined;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.payItems = undefined;
        }
    }

    /* combo box PUF change trigger */
    handlePUFChange(event) {
        this.pufValue = event.detail.value;
        console.log(this.pufValue);

        const newPayItemPopup = this.template.querySelector("c-qgs-new-pay-item-popup");
        newPayItemPopup.pufValue = this.pufValue;
        newPayItemPopup.quoteId = this.quoteId;
        newPayItemPopup.qlgId = this.qlgId;
        newPayItemPopup.show();
    }

    /* Refresh */
    refreshPayItemList() {
        this.savePayItemstoQLG();
        return refreshApex(this.provisionedPayItems); 
    }


    /* Save Pay Items to Quote Line Group */
    @track salesDirection;
    savePayItemstoQLG(){
        console.log('qlgInfo;');
        let qlgInfo = "<ul>";
        var tempInfo;
        var tempProductName;
        this.payItems.forEach(function(payItem){
            if(payItem.Instructions_Info__c){
                tempInfo = payItem.Instructions_Info__c //.replace(/"/g, '\\"');
                tempProductName = payItem.Product__r.Name //.replace(/"/g, '\\"');
            }else{
                tempInfo = '';
                tempProductName = payItem.Product__r.Name //.replace(/"/g, '\\"');
            }
            qlgInfo = qlgInfo  + "<li><strong>" + tempProductName + "</strong> : " + tempInfo + "</li>";
        });
        qlgInfo = qlgInfo  +"</ul>";
        console.log(qlgInfo);
        this.salesDirection = qlgInfo;
        //this.template.querySelector('lightning-record-edit-form').submit();
    }
    handleSuccess(event){
        const message = `Pay Items and Instructions/Info saved to Quote Line Group.`
        const evtToast = new ShowToastEvent({
            title: message,
            variant: "success"
        });
        this.dispatchEvent(evtToast);

        const payload = event.detail;
        console.log(JSON.stringify(payload));
    }
    handleError(evt){
        console.log('Error saving to QLG');
        console.dir(evt.detail.detail);
    }

    handleSave(){
        this.pufValue = null;
        this.template.querySelector('lightning-record-edit-form').submit();
    }
}