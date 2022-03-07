//https://developer.salesforce.com/docs/component-library/documentation/en/48.0/lwc/lwc.data_create_record
import { LightningElement } from 'lwc';
import OPPTY_OBJECT from '@salesforce/schema/Opportunity';
import { NavigationMixin } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import ACCOUNT_FIELD from '@salesforce/schema/Opportunity.AccountId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateOpportunity extends NavigationMixin(LightningElement) {
    opptyObject = OPPTY_OBJECT;
    opptyName   = NAME_FIELD;
    opptyStage  = STAGE_FIELD;
    opptyType   = TYPE_FIELD;
    opptyCloseDate  = CLOSEDATE_FIELD;
    opptyAccount  = ACCOUNT_FIELD;

    populateStage(event) {
        this.opptyStageValue = "Setup";
    }

    navigateToNewOpptyRecord(recordId) {
        // Navigate to the new oppty record page.
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Opportunity',
                actionName: 'edit'
            }
        });
    }

    handleOpptyCreated(event){
        const toastEvent = new ShowToastEvent({
            "title": "New Opportunity Started",
            "message": "A Krow Project has been created with steps to complete the Opportunity Setup.<br/><br /><a href='#' onclick={navigateToNewOpptyRecord}>View the New Opportunity Here.</a>",
        });
        console.log(event.detail);
        this.dispatchEvent(toastEvent);
        this.navigateToNewOpptyRecord(event.detail.id);
    }

    handleError(event){
        console.log(event.detail);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating record. Please notify Johnny in Slack #help_salesforce with the following message.',
                message: event.detail.message,
                variant: 'error',
            }),
        );
    }
}