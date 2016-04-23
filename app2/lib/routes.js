
Router.route('/',{
name : 'home',
template : 'homelayout'
});

Router.route('/chat',{
	
	onBeforeAction : function(){
		if(!Meteor.userId()){
			this.redirect('home');
		}
	this.layout('chat');	
	
	}

	});

Router.route('/chatroom/:_id',{
	 data : function(){
	 	if(!Meteor.userId()){
			this.redirect('home');
		}
	 	this.layout('chat');
		this.render('convo');
		var id1 = this.params._id;
		console.log("INSIDE ROUTE");
		console.log(id1);
		console.log(Meteor.userId());
		Meteor.subscribe("display_messages",id1,Meteor.userId());
}
	

});