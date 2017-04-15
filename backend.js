    //This is where we should GET the data from the server
    var DB = new LocalStorageDB('my_first_database');
    // DB.DROP( 'temp4');
    // DB.DROP( 'temp3')
    // DB.DROP( 'temp2')
    // DB.DROP( 'temp1')
    // DB.DROP( 'temp')
    // DB.DROP( 'my_first_table');
    // DB.DROP( 'my_second_table');
    //DB.DROP('newU');

    function getDB(siteName, localTableName, demoNum)
    {
        DB.DROP(localTableName);
        //GET JSON
        // var table=DB.SELECT( 'my_first_table' );

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("demo").innerHTML =
                //this.responseText;
                // console.log(this.responseText);
            var json_input=JSON.parse(this.responseText);
            CreateTableFromJSON(json_input,demoNum)
            //console.log(json_input);
            DB.CREATE( localTableName, {id: 0, name: "DARTH VADER", email: "force@dark.com"},function (a) {
            return {
            email: a.email,
            };});

            DB.INSERT_INTO(localTableName,json_input);
            console.log(localTableName);
            }
        };

        //viewDB();

        xmlhttp.open("GET", "http://34.209.252.152/" + siteName);
        console.log("http://34.209.252.152/" + siteName);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send();
        //viewDB();
    }

    var unsaved = false;

    getDB("star", "newU", "demo1");
    getDB("star2", "newU2", "demo3");

    function insertDB(localTableName, localTableNum)
    {
        var first_name=document.getElementById('first').value;
        var email=document.getElementById('email').value;
        DB.INSERT_INTO( localTableName, [{name:first_name,email:email}] );
        viewDB(localTableName, localTableNum);
        unsaved = true;
    }

    function updateDB(localTableName, localTableNum)
    {
        var first_name=document.getElementById('first-update').value;
        var email=document.getElementById('email-update').value;
        DB.UPDATE( localTableName, {name:first_name},{email:email} );
        viewDB(localTableName, localTableNum);
        unsaved = true;
    }
    function joinDB(table1,table2,key) {
    	var joined_table=DB.JOIN(DB.SELECT( 'newU' ),DB.SELECT( 'newU2' ),key,key,function (a, b) {
	    return {
	        id1: a.id,
	        email:a.email,
	        name:a.name,
	        id2: b.id,
	        email2:b.email,
	        name2:b.name,
	        
	    };});
	    console.log(joined_table);
	    // viewDB(localTableName, localTableNum);
        // unsaved = true;
    }

    function crossDB(table1,table2) {
    	var joined_table=DB.CROSS(DB.SELECT( 'newU' ),DB.SELECT( 'newU2' ),function (a, b) {
	    return {
	        id1: a.id,
	        email:a.email,
	        name:a.name,
	        id2: b.id,
	        email2:b.email,
	        name2:b.name,
	        
	    };});
	    console.log(joined_table);
    }

    function intersectDB(table1,table2) {
    	var joined_table=DB.INTERSECT(DB.SELECT( 'newU' ),DB.SELECT( 'newU2' ));
	    console.log(joined_table);
    }
    function unionDB(table1,table2) {
    	var joined_table=DB.UNION(DB.SELECT( 'newU' ),DB.SELECT( 'newU2' ));
	    console.log(joined_table);
    }




    function viewDB(localTableName, localTableNum) {
        var table=DB.SELECT( localTableName );
        CreateTableFromJSON(table, localTableNum);
    }
    //viewDB();

    function CreateTableFromJSON(table, gid) {
        var myBooks = table;
        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        // CREATE DYNAMIC TABLE.
        var table = document.getElementById(gid);
        table.innerHTML = "";
        //var table = document.createElement("table")
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }
    }

    function postDB(siteName,localTableName,postID)
    {

        // var table=DB.SELECT( 'my_first_table' );

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 

        xmlhttp.onreadystatechange = function() {
    
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("post").innerHTML = "After Post";
                //this.responseText;
                var Jinput = JSON.parse(this.responseText);
                var datastrip = Jinput.result;
                //console.log("enter is fyn")
                CreateTableFromJSON(datastrip, postID);
                //console.log("Exit is also is fyn")

            }
        };


        xmlhttp.open("POST", "http://34.209.252.152/" + siteName);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //console.log(DB.SELECT('newU'));
        xmlhttp.send(JSON.stringify(DB.SELECT(localTableName)));
        //xmlhttp.send(JSON.stringify(DB.SELECT('newU')));
        //DB.DROP('newU');
    }
    // window.alert = function(msg){
    //     postDB();
    // }

   
    // window.onunload = confirmExit;
    // function confirmExit(){
    //     var r = confirm("Close?");
    //     if (r == true) {
    //         postDB();
    //         alert("Bye")
    //     }else{
    //         document.getElementById("msg").innerHTML = "Nice Choice!"
    //     }
    //     //return false;
    // }

    function unloadPage(){ 
        postDB('star', 'newU', 'post1');
        postDB('star2', 'newU2', 'post12');
        if(unsaved){
            return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
        }
    }

    window.onbeforeunload = unloadPage;

    //This is where we should POST the data to the server