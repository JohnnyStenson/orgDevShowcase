@isTest
class LWCqgsProductUsedForControllerTest {
    static testMethod void testPUF (){
        Product2 product = new Product2(
            Name = 'test',
            Product_Used_For__c = 'Block',
            Is_a_Main_Product__c = true
        );
        insert product;

        List<Product2> payitems = LWCqgsProductUsedForController.retrieveProductsUsedFor('Block');
        System.assert( payitems  != null);
    }
}