import { LightningElement, track} from 'lwc';

//import siteAuth from '@salesforce/apex/ConfirmPassCode.comparePassCode';

import JOB_FIELD from '@salesforce/schema/Concrete_Order__c.Job__c';
import REQDATE_FIELD from '@salesforce/schema/Concrete_Order__c.Requested_Date__c';
import REQTIME_FIELD from '@salesforce/schema/Concrete_Order__c.Requested_Time__c';

export default class ConcreteOrder extends LightningElement {
    fields = [JOB_FIELD, REQDATE_FIELD, REQTIME_FIELD];    

    submitConcreteOrder(event){
        /*event.preventDefault();
        //var inputPassCode = this.template.querySelector(".passcode");
        //var valuePassCode = inputPassCode.value;
        siteAuth('valuePassCode')
            .then(result => {

                console.log('Result: ' + result);
                if(result){
                    
                    const fields = event.detail.fields;
                    this.template.querySelector('lightning-record-form').submit(fields);
                }else{
                    return;
                }
            })
            .catch(error => {
                console.log(error);
            });*/
    }
}