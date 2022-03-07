import { LightningElement, track, api } from 'lwc';

export default class QgsAddPayItem extends LightningElement {
    @api quoteId;
    @api qlgId;
    @api pufValues;
    @track pufValue;
    

    handlePUFChange(event) {
        this.pufValue = event.detail.value;
        console.log(this.pufValue);

        const newPayItemPopup = this.template.querySelector("c-qgs-new-pay-item-popup");
        newPayItemPopup.pufValue = this.pufValue;
        newPayItemPopup.quoteId = this.quoteId;
        newPayItemPopup.qlgId = this.qlgId;
        newPayItemPopup.show();
    }
}