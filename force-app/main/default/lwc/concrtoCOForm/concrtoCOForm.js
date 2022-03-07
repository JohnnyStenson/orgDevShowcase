import { LightningElement, api, wire, track } from 'lwc';
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';

/*import JOB_FIELD from '@salesforce/schema/Concrete_Order__c.Job__c';
import REQDATE_FIELD from '@salesforce/schema/Concrete_Order__c.Requested_Date__c';
import REQTIME_FIELD from '@salesforce/schema/Concrete_Order__c.Requested_Time__c';*/

// https://developer.salesforce.com/docs/atlas.en-us.workbook_siteforce.meta/workbook_siteforce/siteforce_guest_profile.htm

export default class ConcrtoCOForm extends LightningElement {
    //fields = [JOB_FIELD, REQDATE_FIELD, REQTIME_FIELD];    
    @api coId;
    @track objectInfo;

    submitCOForm(e){

    }

    successCOForm(e){
        const selectedEvent = new CustomEvent("coformchanges");
        this.dispatchEvent(selectedEvent);
    }

    cancelCOForm(e){
        const selectedEvent = new CustomEvent("coformchanges");
        this.dispatchEvent(selectedEvent);
    }
}