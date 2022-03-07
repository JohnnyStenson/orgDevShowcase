@isTest
class LWCqgsQuoteGroupControllerTest {
    static testMethod void testQGL (){
        SBQQ__Quote__c quote = new SBQQ__Quote__c();
        insert quote;

        SBQQ__QuoteLineGroup__c qlg = new SBQQ__QuoteLineGroup__c(Name = 'test', SBQQ__Quote__c = quote.id, SBQQ__Number__c = 1, SBQQ__ListTotal__c = 0, SBQQ__NetTotal__c = 0, SBQQ__CustomerTotal__c = 0);
        insert qlg;

        List<SBQQ__QuoteLineGroup__c> qlgs = LWCqgsQuoteGroupController.retrieveQLGs(quote.id);
            

        System.assert( qlgs  != null);
        /* SBQQ__QuoteLineGroup__c testqlg = [SELECT Id, Name, SBQQ__Description__c, Sales_Direction__c, SBQQ__Number__c, SBQQ__Quote__c FROM SBQQ__QuoteLineGroup__c WHERE SBQQ__Quote__c = :quote.id LIMIT 1];
        System.assertEquals ( testqlg.SBQQ__Quote__c , quote.id); */

    }
}

//https://developer.salesforce.com/forums/?id=9060G000000BfgoQAC