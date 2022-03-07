public with sharing class LWCqgsProductUsedForController {
    @AuraEnabled(cacheable=true)
    public static list<Product2> retrieveProductsUsedFor(String puf) {
        List<Product2> products;
        try{
            products = [SELECT Id, Name FROM Product2 WHERE Is_a_Main_Product__c = true AND Product_Used_For__c includes (:puf) WITH SECURITY_ENFORCED];
        } catch(System.QueryException qe){
            System.debug(qe.getMessage());
        }
        return products;
    }
}