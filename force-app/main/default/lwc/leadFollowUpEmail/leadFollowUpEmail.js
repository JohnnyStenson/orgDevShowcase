import { LightningElement, api, track } from 'lwc';

export default class LeadFollowUpEmail extends LightningElement {
    @api recordId;
    @api objectApiName;

    @track classBtnSubmit = 'slds-button slds-button_neutral';
    @track iconName = 'utility:record_update';
    @track lblSubmitButton = 'Update Lead'
    @track submitMessage = '';
    @track classSubmitMessage = 'slds-hide';
    @track colorMessage = 'color-green';
    @track iconNameSuccess = 'action:update_status';
    @track classBtnAccordian = '';

    chkbxSendEmail; //default false 
    // TODO: check that it is actually false

    handleAccordSendEmail() {
        const accordion = this.template.querySelector('.example-accordion');
        accordion.activeSectionName = 'sendEmailPoints';
        this.classBtnAccordian = 'slds-hide';
    }

    handleSetChkbxSendEmail(event){
        this.chkbxSendEmail = !event.target.value;
    }

    handleChkbxSendEmail(event){
        this.chkbxSendEmail = !event.target.value; 
        //console.log('Checkbox:' + this.chkbxSendEmail);
        this.iconName = this.chkbxSendEmail ? 'utility:email' : 'utility:record_update';
        this.lblSubmitButton = this.chkbxSendEmail ? 'Update Lead & Schedule Admin to Send Follow Up Email' : 'Update Lead';
        
    }

    handleSubmit(event){
        // If there are multiple forms, this code may need changing
        event.preventDefault(); // stop the form from submitting
        
        const fields = event.detail.fields;
        /*if(fields.Trigger_to_Send_Initial_Followup_Email__c){
            // set field for trigger to send new email
            fields.Initial_Followup_Email_Sent__c = false;
        }*/
        
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event){
        const payload = event.detail;
        console.log('Success:' + JSON.stringify(payload));
        this.classSubmitMessage = 'slds-show';
        this.classBtnSubmit = 'slds-hide';
        if(this.chkbxSendEmail){
            this.submitMessage = 'Lead Updated and Admin Scheduled to Send Follow up Email.';
        }else{
            this.submitMessage = 'Lead Updated. No Automation Email Task.';
            this.colorMessage = 'color-blue';
        }
        
    }
}