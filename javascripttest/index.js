//declaring the counter with no scope(outside of any funtions) so it can be accessed by everything
var i = 0
/*
the main body of code runs when the website finishes loading.
this is done by defining the code as an event handler and then running that code on the "load" event of the window.
stuff like document selectors might throw an error if you don't do this because the thing they're looking for isn't loaded.*/
window.addEventListener('load', function() {
	//set the html inside the <body/> tags to a <div> with id "main".
	//This operation will overwrite whatever currently resides there.
	//I'm going to use a different method to prevent that.
	document.body.innerHTML = "<div id=\"main\"></div>";
	//look for an element with the id of 'main'. return a reference to the constant main
	const main = document.getElementById("main");
	//this creates an html element of type <form/>. it is not in the DOM, but it can be manipulated as though it were.
	const form = document.createElement("form");
	//do the same thing, but with an <input> tag.
	const textbox = document.createElement("input")
	//set up the input tag. this is equivalent to <input id="thebox" type="text">>
	textbox.type = "text";
	textbox.id = "thebox";
	//now do the same for the form tag. this time it's equivalent to <form id="theform"></form>
	form.id = "theform";
	//the appendChild method puts the supplied element inside the element that the method is from.
	/*the same as
	<form id="theform">
		<input id="thebox" type="text">
	</form>
	but it has been made dynamically with javascript*/
	form.appendChild(textbox);
	//because main is a reference to an actual DOM element, this does the same as above but to the actual html document
	main.appendChild(form);
	//doing the same thing to make the rest of the ui. I'll let you decipher this here, to test your understanding. if you need help, give the MDN docs a read or ask me.
	const list = document.createElement("div");
	list.id = "todo";
	const header = document.createElement("h1");
	/*document.createTextNode() creates a text node. this has the special property that if you pass it html code,
	that code will not be parsed into elements, instead remaining as plaintext.*/
	header.appendChild(document.createTextNode("To-do:"));
	list.appendChild(header);
	const bullets = document.createElement("ol");
	bullets.id = "bullets";
	list.appendChild(bullets);
	main.appendChild(list);
	//this is where we will store the various tasks in the todo list.
	const todo = [];
	//this code needs to be called whenever we update the list, so that the DOM ids match their position in the list
	const update = function() {
		var list = todo.map(function(item) {
//debug			console.log(todo);
//debug			console.log(item);
			//make a bulleted or ordered list item
			var li = document.createElement("li");
			//set the text to the given todo list item. this is equivalent to how the header text was set.
			li.innerText = item;
			//return it to be concatenated
			return(li);
		});
//debug		console.log(list);
		//delete everything inside the list <ol/> tag to be overwritten
		document.getElementById("bullets").innerHTML = "";
		//reset the counter. this is used to figure out what array position needs to be deleted.
		i = 0;
		//like Array.prototype.map(), but it ignores returned values.
		list.forEach(function(each) {
			//set the id to a format we can use later. crucially, this contains the position of the task in the array
			each.id = "todo1-element-" + i.toString();
			//for the stylesheet to affect it
			each.className = "item"
			//append the task element to the list.
			document.getElementById("bullets").appendChild(each);
			//register an event for when the item is clicked.
			document.getElementById("todo1-element-" + i.toString()).addEventListener("click", function(e) {
				//a regular expression that will return the saved position
				const posfinder = /todo1-element-(\d*)/;
				//remove the task from the array
				todo.splice(e.target.id.match(posfinder)[1],1);
				//delete the DOM object for the removed task
				e.target.remove();
				//this redraws everything when you remove a task. this is mainly to update the element's id so that it removes the right Array index when clicked.
				update();
			});
			i += 1;
		})}
	//get the form from earlier. then register an event for when you submit the form.
	//IMPORTANT: this event is registered on the <form/> tag, not on any individual inputs.
	document.getElementById("theform").addEventListener("submit", function(e) {
		//stop the form sumbit from running immediately
		e.stopImmediatePropagation();
		//stop the form from doing its default behavior. in this case, reloading the page.
		e.preventDefault();
		//check if the string is either just whitespace or empty. if it is, stop the function before anything is done.
		const checkws = document.getElementById("thebox").value.match(/\s*/);
		if (checkws[0] === document.getElementById("thebox").value || document.getElementById("thebox").value === "") {
			return;
		}
		//Array.protoype implies that you are working with a defined array as opposed to the Array interface.
		//Array.prototype.push() appends something to an array. in this case, the text entered into the box
		todo.push(document.getElementById("thebox").value);
		//Array.prototype.map() runs the function provided and then concatenates the returned values into one new array.;
		document.getElementById("thebox").value = "";
		//redraw the list
		update();
	});
});
