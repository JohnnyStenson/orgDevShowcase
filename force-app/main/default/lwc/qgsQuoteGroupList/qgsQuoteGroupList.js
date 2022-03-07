import { LightningElement, api, track, wire } from 'lwc';


export default class QgsQuoteGroupList extends LightningElement {
    @api quoteId;
    @api pufValues;
    @api qlgs;
}