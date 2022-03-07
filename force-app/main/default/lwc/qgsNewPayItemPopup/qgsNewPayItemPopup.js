import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// importing Apex Class
import getPUFs from '@salesforce/apex/LWCqgsProductUsedForController.retrieveProductsUsedFor';

export default class QgsNewPayItemPopup extends LightningElement {
    showModal = false;
    @api quoteId;
    @api qlgId;
    @api pufValue;
    @track pufs;
    @track productId;
    @track error;

    @track pufListClass = 'slds-show';
    @track productFieldClass = 'slds-hidden';

    @wire(getPUFs, { puf: '$pufValue'})
    wiredPUFs({ error, data }) {
        if (data) {
            console.log('PUFs:::::::');
            console.dir(data);
            this.pufs = data;
            this.error = undefined;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.pufs = undefined;
        }
    }

    @api show() {
        this.showModal = true;
    }

    @api hide() {
        this.showModal = false;
    }
    handleClose() {
        this.showModal = false;     
    }
    handleDialogClose(){
        this.handleClose()
    }
    handleChoosePayItem(evt){
        evt.preventDefault();
        this.productId = evt.target.getAttribute("data-id");
        this.pufListClass = 'slds-hide';
        this.productFieldClass = 'slds-visible';
        console.log(evt.target.getAttribute("data-id"));
        console.log(this.quoteId);
        console.log(this.qlgId);
        console.log(this.productId);
        console.log(evt.target.getAttribute("data-name"));
    }
    handleSave(){
        this.template.querySelector('lightning-record-edit-form').submit();
    }
    handleSubmit(){
        console.log('Submitted');
    }  
    handleSuccess(event){
        this.hide();
        const evt = new ShowToastEvent({
            title: "New Pay Item Saved to Group",
            variant: "success"
        });
        this.pufListClass = 'slds-show';
        this.productFieldClass = 'slds-hidden';
        this.productId = null;
        this.dispatchEvent(evt);
        this.dispatchEvent(new CustomEvent('refreshpayitems'));                  
    }    

}