public with sharing class ConcreteOrderController {

    // PassCode Validation for Visual Force concreteorder.page
    // values from visualforce page
    public String inputPassCode{get;set;} 
    public Boolean authenticated{get;set;}

    public PageReference validatePassCode(){
        authenticated = inputPassCode == 'thundernj.concrete';
        return null;
    }

    //Called from LWC concrtoUpcomDelivList
    @AuraEnabled(cacheable=true)
    public static List<Concrete_Order__c> retrieveConcreteOrders(String jobId) {
        List<Concrete_Order__c> concreteOrders;
        try{
            concreteOrders = [SELECT Id, Job__r.Name, Job__r.Id, What_are_we_pouring__c, Actual_Yardage_Ordered__c, Notes__c, Requested_Date__c, Time__c, Ordered__c, Released__c, DOW__c FROM Concrete_Order__c WHERE IsDeleted = false AND Requested_Date__c > YESTERDAY ORDER BY Requested_Date__c ASC, Time__c ASC];
        } catch(System.QueryException qe){
            System.debug(qe.getMessage());
        }
        return concreteOrders;
    }

    
}