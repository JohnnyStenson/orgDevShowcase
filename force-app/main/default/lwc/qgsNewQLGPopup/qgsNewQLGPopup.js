import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QgsNewQLGPopup extends LightningElement {
    showModal = false
    @api quoteId
    @api sobjectLabel
    @api sobjectApiName    
    @api qlgId
    @api recordName

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

    isNew(){
        return this.qlgId == null
    }
    get header(){
        return this.isNew() ? `New ${this.sobjectLabel}` : `Edit ${this.recordName}`
    }

    handleSave(){
        this.template.querySelector('lightning-record-edit-form').submit();
       
    }  
    handleSubmit(){
        console.log('Submitted');
    }  
    handleSuccess(event){
        this.hide()
        let name = this.recordName        
        const message = `${this.sobjectLabel} ${name} was ${(this.isNew() ? "created" : "saved")}.`
        const evt = new ShowToastEvent({
            title: message,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.dispatchEvent(new CustomEvent('refreshqlgs'));                
    }    
}