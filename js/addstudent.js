$(document).ready(function() {
    $.ajax({
        url: "textfile.txt", success: function(result) {
            $(".text").html(result)
        }
    });

    var div = $("#title");
    setInterval(() => {
        div.fadeOut('slow');
        div.fadeIn('slow');
    }, 3000);

    var logo = $('#logo');
    setTimeout(() => {
        logo.fadeOut('fast');
        logo.fadeIn('slow');
    }, 7000)
    

    var id = 0;
    $("#studentform").submit(function(event) {
        event.preventDefault();
        id++;
        var surname = $("#surname").val();
		var name = $("#name").val();
        var gender = $("#gender:checked").val();
        var phone = $("#phone").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var errorFree = true;
        var reg = /^[A-Za-z\s]+$/;
        var emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(surname ==  "" || !(reg.test(surname))) {
            errorFree = false;
            $("#surname_msg").show();
        } else {
            $("#surname_msg").hide();
        }

        if(name == "" || !(reg.test(name))) {
            errorFree = false;
            $("#name_msg").show();
        } else {
            $("#name_msg").hide();
        }

        if(gender != 'Male' && gender != 'Female') {
            errorFree = false;
            $("#gender_msg").show();
        } else {
            $("#gender_msg").hide();
        }

        if(address == "") {
            errorFree = false;
            $("#address_msg").show();
        } else {
            $("#address_msg").hide()
        }

        if(phone == "") {
            errorFree = false;
            $('#phone_msg').show();
        } else {
            $('#phone_msg').hide();
        }

        if(email == "") {
            errorFree = false;
            $('#email_msg').show();
        } else {
            $('#email_msg').hide();
        }

        console.log(errorFree)

        if(errorFree) {
            $(".table tbody").append("<tr><td>" + id + "</td>" +
			"<td>" + surname + "</td>" +
			"<td>" + name + "</td>" +
			"<td>" + gender + "</td>" +
            "<td>" + address + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + phone + "</td>" +
			"<td><button class='btnEdit'>Edit</button>" +
			"<button class='btnDelete'>Delete</button></td></tr>");

		$(".btnEdit").bind("click", Edit);
        $(".btnDelete").bind("click", Delete);
        }
    })

    function Edit() {
		var par = $(this).parent().parent();
		var tdsurname = par.children("td:nth-child(2)");
		var tdname = par.children("td:nth-child(3)");
        var tdgender = par.children("td:nth-child(4)");
        var tdaddress = par.children("td:nth-child(5)");
        var tdemail = par.children("td:nth-child(6)");
        var tdphone = par.children("td:nth-child(7)");
        var tdbuttons = par.children("td:nth-child(8)");
        

		tdsurname.html("<input type='text' value='" + tdsurname.html() + "' id='editsurname' pattern='[A-Za-z]'>");
		tdname.html("<input type='text' value='" + tdname.html() + "' id='editname' pattern='[A-Za-z]'>");
        tdgender.html("<input type='text' value='" + tdgender.html() + "'id='editgender'>");
		tdaddress.html("<input type='text' value='" + tdaddress.html() + "' id='editaddress'>");
        tdemail.html("<input type='email' value='" + tdemail.html() + "' id='editemail'>");
        tdphone.html("<input type='number' value='" + tdphone.html() + "' id='editphone'>");
        tdbuttons.html("<button class='btnSave'>Save</button>");
        $(".btnSave").bind("click", Save);
    }
    
    function Save() {
		var par = $(this).parent().parent();
		var tdsurname = par.children("td:nth-child(2)");
		var tdname = par.children("td:nth-child(3)");
        var tdgender = par.children("td:nth-child(4)");
        var tdaddress = par.children("td:nth-child(5)");
        var tdemail = par.children("td:nth-child(6)");
        var tdphone = par.children("td:nth-child(7)");
        var tdbuttons = par.children("td:nth-child(8)");
        var editedsurname = $('#editsurname').val();
        var editedname = $('#editname').val();
        var editedemail = $('#editemail').val();
        var editedgender = $('#editgender').val();
        var editedphone = $('#editphone').val();
        var reg = /\d/;
        var emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(reg.test(editedsurname) == true || reg.test(editedname) == true) {
            alert("Please remove any possible numbers in the surname / name text field")
            return;
        } else if (emailreg.test(editedemail) == false) {
            alert("Please enter a valid email!");
            return;
        } else if (editedsurname == "") {
            alert("Surname must not be empty!");
            return;
        } else if (!(editedgender == "Female" || editedgender == 'Male')) {
            alert("Gender must not be empty and can only contain 'Female' or 'Male'.");
            return;
        } else if (editedphone == "") {
            alert("Phone number must not be empty");
            return;
        } else {
            tdsurname.html(tdsurname.children('#editsurname').val());
            tdname.html(tdname.children("#editname").val());
            tdgender.html(tdgender.children("#editgender").val());
            tdaddress.html(tdaddress.children("#editaddress").val());
            tdemail.html(tdemail.children("#editemail").val());
		    tdphone.html(tdphone.children("#editphone").val());
		    tdbuttons.html("<button class='btnEdit'>Edit</button>" +
			    "<button class='btnDelete'>Delete</button>");
		    $(".btnEdit").bind("click", Edit);
		    $(".btnDelete").bind("click", Delete);
        }
	}

	function Delete() {
		var par = $(this).parent().parent();
		par.remove();
    }

    function preventNumberInput(e){
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode > 47 && keyCode < 58 || keyCode > 95 && keyCode < 107 ){
            e.preventDefault();
        }
    }
    
    $('#editsurname').keypress(function(e) {
        preventNumberInput(e);  
    });
})