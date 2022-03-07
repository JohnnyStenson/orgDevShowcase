public with sharing class WorkCompletedController {
    public String inputPassCode{get;set;} 
    public Boolean authenticated{get;set;}

    public PageReference validatePassCode(){
        authenticated = inputPassCode == 'thundernj.concrete';
        return null;
    }
}