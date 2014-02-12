$(document).ready(function(){ 
	Backbone.sync = function(method, model, success, error){
    console.log(success);
  }
	var student = Backbone.Model.extend({
		defaults:{
			id:'',
			name:'',
			dept: ''
		}
	});
	
	var StudentClass = Backbone.Collection.extend({
		model: student
	});
	
	oneStudent = Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
      _.bindAll(this, 'render', 'swap', 'remove', 'unrender'); // every function that uses 'this' as the current object should be in here
		this.model.bind('change', this.render);
		this.model.bind('remove', this.unrender);
    },
	
		events: {
		'click span.swap': 'swap',
		'click span.delete': 'remove'
		},
				
		render: function(){console.log($(this.el));
			$(this.el).html('<span>'+this.model.get('name')+' '+this.model.get('dept')+'</span>'
					+'&nbsp;&nbsp;<span class="swap" style="color:blue">swap</span>&nbsp;&nbsp;<span class="delete" style="color:red">delete</span>');
			//var html = '<li>'+this.model.get('name')+'</li>';
			return(this);
		},
				
		swap: function(){ 
			var s =
			({
				name: this.model.get('dept'),
				dept:  this.model.get('name')
			});
			this.model.set(s);
			this.render();
		},
		
		remove: function(){
			//$(this.el).remove();
			this.model.destroy();
		},
		
		unrender: function(){
			$(this.el).remove();
		}
		
	});
	
	mainView = Backbone.View.extend({ 
		el: $('body'),
		events: {
			'click input#button': 'additem'
			},
		
		initialize: function(){	
			this.counter = 0;
			_.bindAll(this, 'render', 'appenditems', 'additem');
			this.collection = new StudentClass();
			this.render();
			this.collection.bind('add', this.appenditems);
		},		
		render: function(){console.log(this.el);
			$(this.el).append("<span><label>Enter the name</label><input type ='text' id = 'stu_name'></span>");
			$(this.el).append("<span><label>Enter the dept</label><input type ='text' id = 'stu_dept'></span>");
			$(this.el).append("<input type ='button' id = 'button' value='add item'>");
			$(this.el).append("<ul id = 'item-list'></ul>");
	},
		additem: function(){
		var s = new student();
		s.set({id: this.counter,
			name: $('#stu_name').val(),
			dept: $('#stu_dept').val()
		});
		console.log(s);
		this.collection.add(s);
		
		//$('#item-list').append('<li>'+this.counter+'</li>');
		this.counter++;
		},
		
		appenditems: function(s){

		var os = new oneStudent({
			model: s
		});
		$('#item-list').append(os.render().el);
		}
					
});

var m = new mainView;
});