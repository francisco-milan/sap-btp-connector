sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/BusyIndicator", "sap/ui/core/mvc/View", "sap/m/MessageBox"],                                                                                                                                         
function(Controller, BusyIndicator, XMLView, MessageBox) {                                                                                                                                                                                                     
    "use strict";                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                               
    return Controller.extend("z2ui5.controller.View1", {                                                                                                                                                                                                       
                                                                                                                                                                                                                                                               
        onInit: async function() {   
            sap.z2ui5 = {};    
            BusyIndicator.show();                                                                                                                                                                                                                              
             try {                                                                                                                                                                                                                                             
                if (sap.ushell.ui5service !== undefined) {   
                   try {                                                                                                                                                                                                                                      
                       sap.z2ui5.oLaunchpadService = await this.getOwnerComponent().getService("ShellUIService");                                                                                                                                            
                    } catch (e) {}       
                    try {                                                                                                                                                                                                                                      
                        sap.z2ui5.startupParameters = this.getOwnerComponent().getComponentData().startupParameters;                                                                                                                                           
                    } catch (e) {}                                                                                                                                                                                                                             
                }                                                                                                                                                                                                                                              
            } catch (e) {}                                                                                                                                                                                                                                     
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        onAfterRendering: async function() {                                                                                                                                                                                                                                                                                                                                                                                                                                      
            try {                                                                                                                                                                                                                                              
                sap.z2ui5.oParent = this.oView.getParent();                                                                                                                                                                                                    
                if (sap.z2ui5.oParent.getMetadata().getName() !== 'sap.m.App') {                                                                                                                                                                               
                    sap.z2ui5.oParent = this.getView().byId(this.getView().getId() + "--app");                                                                                                                                                                 
                }                                                                                                                                                                                                                                              
            } catch (error) {                                                                                                                                                                                                                                  
                sap.z2ui5.oParent = this.getView().byId(this.getView().getId() + "--app");                                                                                                                                                                     
            }                                                                                                                                                                                                                                                  
            try {                                                                                                                                                                                                                                              
                sap.z2ui5.ComponentData = this.getOwnerComponent().getComponentData();                                                                                                                                                                         
            } catch (e) {}                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
            sap.z2ui5.pathname = this.getView().getModel().sServiceUrl + "/";                                                                                                                                                                                  
            try {                                                                                                                                                                                                                                              
                const response = await fetch(sap.z2ui5.pathname);                                                                                                                                                                                              
                if (!response.ok) {                                                                                                                                                                                                                            
                    const errorText = await response.text();                                                                                                                                                                                                   
                    MessageBox.error(errorText);                                                                                                                                                                                                               
                    return;                                                                                                                                                                                                                                    
                }                                                                                                                                                                                                                                              
                const responseBody = await response.text();                                                                                                                                                                                                    
                const code = responseBody.split('<abc/>')[1];                                                                                                                                                                                                  
                const xml = `<mvc:View xmlns='http://www.w3.org/1999/xhtml' xmlns:mvc='sap.ui.core.mvc'>${code}</mvc:View>`;                                                                                                                                   
                const oView = await XMLView.create({                                                                                                                                                                                                           
                    type: 'XML',                                                                                                                                                                                                                               
                    definition: xml,                                                                                                                                                                                                                           
                    controller: new Controller()                                                                                                                                                                                                               
                });                                                                                                                                                                                                                                            
                sap.z2ui5.oParent.removeAllPages();                                                                                                                                                                                                            
                sap.z2ui5.oParent.insertPage(oView);                                                                                                                                                                                                           
                sap.z2ui5.oView = oView;                                                                                                                                                                                                                       
            } catch (error) {                                                                                                                                                                                                                                  
                MessageBox.error("Error loading view: " + error.message);                                                                                                                                                                                      
            }                                                                                                                                                                                                                                                  
        }                                                                                                                                                                                                                                                      
    });                                                                                                                                                                                                                                                        
});                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                               
