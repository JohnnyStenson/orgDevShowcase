import { LightningElement, api, track, wire } from 'lwc';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// importing Apex Class
import { refreshApex } from '@salesforce/apex';
import retrieveConcreteOrders from '@salesforce/apex/ConcreteOrderController.retrieveConcreteOrders';

export default class ConcrtoUpcomDelivList extends LightningElement {
    @track concreteOrders;
    @track error;
    provisionedConcreteOrders;
    @track displayCOTable;
    @track displayNewCO;
    @track filterJob;

    @wire(retrieveConcreteOrders)
    wiredConcreteOrders(provisionedConcreteOrders) {
        console.log('wire');
        this.provisionedConcreteOrders = provisionedConcreteOrders; // track the provisioned value
        const { data, error } = provisionedConcreteOrders; // destructure it for convenience
        if (data) {
            console.log('ConcreteOrders::');
            console.dir(data);
            this.concreteOrders = data;
            this.error = undefined;
            this.displayCOTable = true;
            this.displayIndivCO = false;
            this.displayNewCO = true;
            //this.aryJobs = this.createJobArray(this.concreteOrders);
        } else if (!data){
            console.log('no data');
        } else if (error) {
            console.log(error);
            this.error = error;
            this.concreteOrders = undefined;
        }
    }

    /* @track aryJobs;
    createJobArray(concreteOrders){
        let jobsarray = [{label: 'None, View All', value: 0}];
        concreteOrders.forEach(function (item, index){
            jobsarray.push({ label: item.Job__r.Name, value: item.Job__r.Id});
        });
        console.dir(jobsarray);
        return jobsarray;
    } */

    handleJobFilter(e){
        let coRows = this.template.querySelectorAll('.rowCO');
        for (let i = 0; i < coRows.length; i++) {
            if(coRows[i].dataset.jobid == e.currentTarget.dataset.jobid){
                coRows[i].classList.add("job-highlight");
            }else{
                coRows[i].classList.remove("job-highlight");
            }
        }

    }

    @track concreteOrderId;
    pourDetails(e){
        e.preventDefault();
        this.concreteOrderId = e.currentTarget.dataset.concreteorderid;
        this.displayCOTable = false;
        this.displayIndivCO = true;
        this.displayNewCO = false;
    }

    handleCOFormChanges(){
        this.displayNewCO = true;
        this.displayCOTable = true;
        this.displayIndivCO = false;
        this.jobId = 'ALL';
        return refreshApex(this.provisionedConcreteOrders); 
    }

    handleNewCORequest(){
        this.concreteOrderId = null;
        this.displayCOTable = false;
        this.displayIndivCO = true;
        this.displayNewCO = false;
    }
}