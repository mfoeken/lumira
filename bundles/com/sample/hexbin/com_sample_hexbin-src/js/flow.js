define("com_sample_hexbin-src/js/flow", ["com_sample_hexbin-src/js/module"], function(moduleFunc) {
	var flowRegisterFunc = function() {
		var flow = sap.viz.extapi.Flow.createFlow({
			id: "com.sample.hexbin",
			name: "HexBin",
			dataModel: "sap.viz.api.data.CrosstableDataset",
			type: "BorderSVGFlow"
		});

		var titleElement = sap.viz.extapi.Flow.createElement({
			id: "sap.viz.chart.elements.Title",
			name: "Title"
		});
		flow.addElement({
			"element": titleElement,
			"propertyCategory": "title",
			"place": "top"
		});

		var element = sap.viz.extapi.Flow.createElement({
			id: "com.sample.hexbin.PlotModule",
			name: "HexBin Module"
		});
		element.implement("sap.viz.elements.common.BaseGraphic", moduleFunc);

		/*Feeds Definition*/
		var ds1 = {
			"id": "com.sample.hexbin.PlotModule.DS1",
			"name": "Untitled Dimension Set 1",
			"type": "Dimension",
			"min": 0, //minimum number of data container
			"max": 2, //maximum number of data container
			"aaIndex": 1
		};
		element.addFeed(ds1);

		var ms1 = {
			"id": "com.sample.hexbin.PlotModule.MS1",
			"name": "xy",
			"type": "Measure",
			"min": 2, //minimum number of measures
			"max": 2, //maximum number of measures
			"mgIndex": 1
		};
		element.addFeed(ms1);

		element.addProperty({
			name: "colorPalette",
			type: "StringArray",
			supportedValues: "",
			defaultValue: d3.scale.category20()
				.range().concat(d3.scale.category20b()
				.range()).concat(d3.scale.category20c().range())
		});

		/* https://help.hana.ondemand.com/webide_vizpacker/frameset.htm?51870e1bac8d4a68b76b073579bfc835.html
		 * 
		 * You change the property category in the flow.js file. Once you modify the property category, all properties beginning 
		 * with the new property will be visible in render.js. For example, if you set the category to “plotArea”, 
		 * then the following would be accessible in render.js
		 */
		element.addProperty({
		   name : "radius",
		   type : "Integer",
		   defaultValue : 15
		});
		/*
		 * Tutorial attempts:
		 */
		 element.addProperty({
		    name: "gridline",
		    type: "Object",
		    supportedValues: {
		        visible : {
		            name: "visible",
		            type: "Boolean",
		            supportedValues:[true, false]
		        }
		    }
		 });
		element.addProperty({
		    name: "animation",
		    type: "Object",
		    supportedValues: {
		        dataLoading : {
		            name: "dataLoading",
		            type: "Boolean",
		            supportedValues:[true, false]
		        }
		    }
		 });

		flow.addElement({
			"element": element,
			"propertyCategory": "plotArea"
		});
		sap.viz.extapi.Flow.registerFlow(flow);
	};
	flowRegisterFunc.id = "com.sample.hexbin";
	return {
		id: flowRegisterFunc.id,
		init: flowRegisterFunc
	};
});