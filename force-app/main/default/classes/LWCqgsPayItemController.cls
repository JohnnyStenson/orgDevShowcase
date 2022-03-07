public with sharing class LWCqgsPayItemController {
    @AuraEnabled(cacheable=true)
    public static List<Pay_Item__c> retrievePayItems(String qlgId) {
        List<Pay_Item__c> payItems;
        try{
            payItems = [SELECT Id, Product__r.Name, Instructions_Info__c, Order_in_Group__c, Quote_Line_Group__r.Id FROM Pay_Item__c WHERE Quote_Line_Group__c = :qlgId WITH SECURITY_ENFORCED ORDER BY Order_in_Group__c ASC];
        } catch(System.QueryException qe){
            System.debug(qe.getMessage());
        }
        return payItems;
    }
}