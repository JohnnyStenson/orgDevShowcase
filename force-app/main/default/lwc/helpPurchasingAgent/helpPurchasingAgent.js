import { LightningElement } from 'lwc';

export default class helpPurchasingAgent extends LightningElement {



    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
}