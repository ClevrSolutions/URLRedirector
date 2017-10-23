/**
	Nav
	========================

	@file      : URLDirector.js
	@version   : 0.1 (alpha)
	@author    : Joël vd Graaf
	@date      : 12-3-2010
	@copyright : Mendix
	@license   : Please contact our sales department.

	Documentation
	=============
	This widget can be used to draw lines between widgets.

	Open Issues
	===========

*/
dojo.provide("URLRedirector.Widget.URLRedirector");

mendix.widget.declare("URLRedirector.Widget.URLRedirector",
{
    //DECLARATION
    addons:
        [
            mendix.addon._Contextable
	],
    inputargs   :
        {
            URLAttribute    : "",
            Target          : "Page",
												urlprefix					  : ""
        },

    //IMPLEMENTATION
    
    // updates the widget with a new dataobject
    setDataobject : function(dataobject) 
    {
        logger.debug(this.id + ".setDataobject");
		
        if (dataobject != null)
        {
            try {
                if (this.URLAttribute != '')
                {
                    var url = dataobject.getAttribute(this.URLAttribute);
                    logger.debug(this.id + ".setDataobject: using url: " + this.urlprefix + url);
																				this.redirectTo(this.urlprefix + url);
                }
				
            }
            catch (err) {
                logger.warn(this.id +'.setDataobject: error while loading embedding code' + err);
                loaded = false;
            }
        }
        else
            logger.warn(this.id + '.setDataobject: received null object');
    },
				
				redirectTo : function(url) {
								if(this.Target == "Page")
												window.location = url;
								else
												window.open(url);
				},

    postCreate : function()
    {
        logger.debug(this.id + ".postCreate");
								if (this.URLAttribute != '')
												this.initContext();
								else
												this.redirectTo(this.urlprefix);
        this.actRendered();
    },

    blankTarget : function(url)
    {
        this.domNode.appendChild("<SCRIPT language=\"JavaScript1.2\">function openwindow(){window.open(\""+url+"\");}</SCRIPT>");
    },

    applyContext : function(context, callback)
    {
        logger.debug(this.id + ".applyContext");
        if (context)
            mx.processor.getObject(context.getActiveGUID(), dojo.hitch(this, this.setDataobject));
        else
            logger.warn(this.id + ".applyContext received empty context");
        callback && callback();
    },

    uninitialize : function()
    {
        logger.debug(this.id + ".uninitialize");
    }
});