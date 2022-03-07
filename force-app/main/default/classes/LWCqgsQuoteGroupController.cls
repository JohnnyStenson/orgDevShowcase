public with sharing class LWCqgsQuoteGroupController {
    @AuraEnabled(cacheable=true)
    public static list<SBQQ__QuoteLineGroup__c> retrieveQLGs(String quoteId) {
        List<SBQQ__QuoteLineGroup__c> qlgs;
        try{
            qlgs = [SELECT Id, Name, SBQQ__Description__c, Sales_Direction__c, SBQQ__Number__c FROM SBQQ__QuoteLineGroup__c WHERE SBQQ__Quote__c = :quoteId WITH SECURITY_ENFORCED ORDER BY SBQQ__Number__c ASC];
        } catch(System.QueryException qe){
            System.debug(qe.getMessage());
        }
        return qlgs;
    }

}