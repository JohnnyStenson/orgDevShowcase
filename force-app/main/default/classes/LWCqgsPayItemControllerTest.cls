@isTest
class LWCqgsPayItemControllerTest {
    static testMethod void testPI (){
        Product2 product = new Product2(
            Name = 'test',
            Product_Used_For__c = 'Block',
            Is_a_Main_Product__c = true
        );
        insert product;

        SBQQ__Quote__c quote = new SBQQ__Quote__c();
        insert quote;

        SBQQ__QuoteLineGroup__c qlg = new SBQQ__QuoteLineGroup__c(
            Name = 'test', 
            SBQQ__Quote__c = quote.id, 
            SBQQ__Number__c = 1, 
            SBQQ__ListTotal__c = 0, 
            SBQQ__NetTotal__c = 0, 
            SBQQ__CustomerTotal__c = 0
        );
        insert qlg;

        Pay_Item__c payitem = new Pay_Item__c(
            Product__c = product.id,
            Quote__c = quote.id,
            Quote_Line_Group__c = qlg.id
        );
        insert payitem;

        List<Pay_Item__c> payitems = LWCqgsPayItemController.retrievePayItems(qlg.id);
        System.assert( payitems  != null);
    }
}