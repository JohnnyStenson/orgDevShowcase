@isTest
public with sharing class WorkCompletedControllerTest {
    static testMethod void testValidatePasscode(){
        WorkCompletedController workcompl = new WorkCompletedController();
        
        Test.startTest();
        workcompl.inputPassCode = 'thundernj.concrete';
        workcompl.validatePassCode();
        Test.stopTest();
        System.assert( workcompl.authenticated == true);

    }
}