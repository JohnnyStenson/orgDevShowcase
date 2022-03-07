global with sharing class AssignedTasks {
    
    @InvocableMethod(Label = 'Get Assigned Tasks')
    public static List<List<Krow__Task__c>> GetTasks (List<methodInputs> request)
       {
            
           	//created to hold return list of lists
    		List<List<Krow__Task__c>> wrapper = new List<List<Krow__Task__c>>();
           	//this operates off the current User
            Id userId = UserInfo.getUserId();       
            List<Krow__Project_Resources__c> projResourceId = [select Id from Krow__Project_Resources__c where Krow__User__c = :userid LIMIT 1];
           
           	Set<Id> setids = new Set<Id>();
            for(Krow__Task_Assignment__c t : [select Krow__Krow_Task__r.Id from Krow__Task_Assignment__c where Krow__Project_Resource__r.Id = :projResourceId]){
                setids.add(t.Krow__Krow_Task__r.Id);
            } 
           
           
			// without an ID, simply specify the object to then derive the sobject type
			DescribeSObjectResult describeResult = Krow__Task__c.getSObjectType().getDescribe();

			List<String> fieldNames = new List<String>( describeResult.fields.getMap().keySet() );
           
           

            String query =
              	' SELECT ' +
                String.join( fieldNames, ',' ) +
              	' FROM ' +
          		describeResult.getName() +
              	' WHERE IsDeleted != TRUE AND Krow__Status__c != \'Completed\' AND Krow__Status__c != \'Archived\''  +
              	' AND Krow__Template_Project__c != TRUE AND ' +
				'Id IN :setids ' +
               	'ORDER BY Krow__Task_Due_Date__c ASC, Krow__Project_Task_Order__c ASC' ;
 

           
			List<Krow__Task__c> assignedTasks = Database.query( query );
			List<Krow__Task__c> responseList=new List<Krow__Task__c>();
           	
           	for (Krow__Task__c assignedTask: assignedTasks ){       
        		responseList.add(assignedTask);     
    		}
			wrapper.add(responseList);
    		return wrapper;
           
       }
    	//input details that comes to apex from flow
    	public class methodInputs{
    
        	@InvocableVariable
        	public Boolean overdue;
        
        	@InvocableVariable
        	public Boolean current;
        
            @InvocableVariable
        	public Boolean comingweek;
            
            @InvocableVariable
        	public Boolean later;
    	}
}