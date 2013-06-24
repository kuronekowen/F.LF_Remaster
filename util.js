/*\
 * util.js
 * utilities for F.LF
\*/

define(function(){
var util={};

util.select_from=function(from,where,option)
{
	for( var i in from)
	{
		var O=from[i];
		var match=true;
		for( var j in where)
		{
			if( O[j]!==where[j])
				match=false;
		}
		if( match)
			return O;
	}
}

util.lookup=function(A,x)
{
	for( var i in A)
	{
		if( x<=i)
			return A[i];
	}
}

/**
The resourcemap specified by F.core allows putting a js function as a condition checker.
This is considered insecure in F.LF. thus F.LF only allows simple predefined condition checking.
*/
util.setup_resourcemap=function(package,Fsprite)
{
	var has_resmap=false;
	if( package.resourcemap)
	if( typeof package.resourcemap.condition==='string')
	{
		var cond = package.resourcemap.condition.split(' ');
		if( cond[0]==='location' && cond[1]==='contain' &&
			cond[2] && cond[3]==='at' && cond[4])
		{
			cond[4]=parseInt(cond[4]);
			package.resourcemap.condition = function()
			{
				return window.location.href.indexOf(cond[2])===cond[4];
			}
		}
		else if( cond[0]==='location' && cond[1]==='contain' && cond[2])
		{
			package.resourcemap.condition = function()
			{
				return window.location.href.indexOf(cond[2])!==-1;
			}
		}

		if( typeof package.resourcemap.condition==='function')
		{
			var resmap = [
				package.resourcemap, //package-defined resourcemap
				{	//default resourcemap
					get: function(res)
					{
						return package.location+res;
					}
				}
			];
			Fsprite.masterconfig_set('resourcemap',resmap);
			has_resmap=true;
		}
	}
	if( !has_resmap)
		Fsprite.masterconfig_set('baseUrl',package.location);
}

return util;
});
