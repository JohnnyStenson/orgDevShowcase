import { LightningElement } from 'lwc';

export default class helpInventory extends LightningElement {



    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
}